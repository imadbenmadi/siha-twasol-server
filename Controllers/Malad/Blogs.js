const { Company_Followers } = require("../../Models/Compnay_Followers");
const { Op } = require("sequelize");
const { Company } = require("../../Models/Company");
const { Event } = require("../../Models/Event");
const { Worker } = require("../../Models/Worker");
const { Doctor } = require("../../Models/Doctor");
const { Director } = require("../../Models/Director");

const get_events = async (req, res) => {
    const { userId } = req.params;

    try {
        // Step 1: Find companies that the user follows
        const followedCompanies = await Company_Followers.findAll({
            where: { maladId: userId },
            attributes: ["companyId"],
        });

        // Extract company IDs from the followed companies
        const followedCompanyIds = followedCompanies.map(
            (follow) => follow.companyId
        );

        // Step 2: Retrieve events from followed companies, ordered by date
        const priorityEvents = await Event.findAll({
            where: { companyId: followedCompanyIds },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Manually attach owner details to each event based on ownerType
        const eventsWithOwners = await Promise.all(
            priorityEvents.map(async (event) => {
                let owner = null;
                if (event.ownerType === "doctor") {
                    owner = await Doctor.findByPk(event.ownerId, {
                        attributes: ["id", "name", "specialty"],
                    });
                } else if (event.ownerType === "worker") {
                    owner = await Worker.findByPk(event.ownerId, {
                        attributes: ["id", "name", "position"],
                    });
                } else if (event.ownerType === "director") {
                    owner = await Director.findByPk(event.ownerId, {
                        attributes: ["id", "name", "department"],
                    });
                }
                return {
                    ...event.toJSON(),
                    Owner: owner ? owner.toJSON() : null,
                };
            })
        );

        // Step 3: Send response with prioritized events
        res.status(200).json({ events: eventsWithOwners });
    } catch (error) {
        console.error("Failed to retrieve events:", error);
        res.status(500).json({ message: "Failed to retrieve events.", error });
    }
};

const get_event = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findByPk(eventId, {
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
            ],
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        // Manually fetch the owner details based on ownerType
        let owner = null;
        if (event.ownerType === "doctor") {
            owner = await Doctor.findByPk(event.ownerId, {
                attributes: ["id", "name", "specialty"],
            });
        } else if (event.ownerType === "worker") {
            owner = await Worker.findByPk(event.ownerId, {
                attributes: ["id", "name", "position"],
            });
        } else if (event.ownerType === "director") {
            owner = await Director.findByPk(event.ownerId, {
                attributes: ["id", "name", "department"],
            });
        }

        const eventWithOwner = {
            ...event.toJSON(),
            Owner: owner ? owner.toJSON() : null,
        };

        res.status(200).json(eventWithOwner);
    } catch (error) {
        console.error("Failed to retrieve event:", error);
        res.status(500).json({
            message: "Failed to retrieve the event.",
            error,
        });
    }
};

module.exports = { get_events, get_event };
