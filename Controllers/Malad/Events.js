const { Doctor_Followers } = require("../../Models/Doctor_Followers");
const { Op } = require("sequelize");
const { Company } = require("../../Models/Company");
const { ddEvent } = require("../../Models/Event");
const { Worker } = require("../../Models/Worker");
const { Doctor } = require("../../Models/Doctor");
const { Director } = require("../../Models/Director");

const get_events = async (req, res) => {
    const { userId } = req.params;

    try {
        // Step 1: Find companies that the user (Malad) follows
        const followedCompanies = await Doctor_Followers.findAll({
            where: { maladId: userId },
            attributes: ["companyId"],
        });

        // Extract company IDs from the followed companies
        const followedCompanyIds = followedCompanies.map(
            (follow) => follow.companyId
        );

        // Step 2: Retrieve events from followed companies with author info
        const priorityEvents = await ddEvent.findAll({
            where: { companyId: followedCompanyIds },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
                // Include user details based on ownerType
                {
                    model: Worker,
                    required: false,
                    where: { ownerType: "worker" },
                    attributes: ["id", "name", "position"],
                },
                {
                    model: Doctor,
                    required: false,
                    where: { ownerType: "doctor" },
                    attributes: ["id", "name", "specialty"],
                },
                {
                    model: Director,
                    required: false,
                    where: { ownerType: "director" },
                    attributes: ["id", "name", "department"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Step 3: Retrieve events from non-followed companies (optional)
        const otherEvents = await ddEvent.findAll({
            where: { companyId: { [Op.notIn]: followedCompanyIds } },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
                {
                    model: Worker,
                    required: false,
                    where: { ownerType: "worker" },
                    attributes: ["id", "name", "position"],
                },
                {
                    model: Doctor,
                    required: false,
                    where: { ownerType: "doctor" },
                    attributes: ["id", "name", "specialty"],
                },
                {
                    model: Director,
                    required: false,
                    where: { ownerType: "director" },
                    attributes: ["id", "name", "department"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Combine priority events and other events
        const allEvents = [...priorityEvents, ...otherEvents];

        // Step 4: Send response with combined events list
        res.status(200).json({ events: allEvents });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve events.", error });
    }
};

const get_event = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await ddEvent.findByPk(eventId, {
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
                {
                    model: Worker,
                    required: false,
                    where: { ownerType: "worker" },
                    attributes: ["id", "name", "position"],
                },
                {
                    model: Doctor,
                    required: false,
                    where: { ownerType: "doctor" },
                    attributes: ["id", "name", "specialty"],
                },
                {
                    model: Director,
                    required: false,
                    where: { ownerType: "director" },
                    attributes: ["id", "name", "department"],
                },
            ],
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve the event.",
            error,
        });
    }
};

module.exports = { get_events, get_event };
