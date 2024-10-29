const { Director } = require("../../Models/Director");
const { Medecin } = require("../../Models/Medecin");
const { Event } = require("../../Models/Event");
const { Blog } = require("../../Models/Blog");
const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");

const get_All = async (req, res) => {
    if (!req.params.companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const events = await Event.findAll({});
        return res.status(200).json({ Events: events });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

const get_compayny_Events = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const events = await Event.findAll({
            where: { companyId: req.params.companyId },
        });
        return res.status(200).json({ Events: events });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

const get_by_id = async (req, res) => {
    if (!req.params.eventId)
        return res.status(400).json({ message: "eventId is required." });
    try {
        const event = await Event.findOne(
            { where: { id: req.params.eventId } },
            {
                include: [{ model: Company }],
            }
        );

        if (!event) {
            return res.status(404).json({ message: "event not found." });
        }
        return res.status(200).json({ event: event });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const edit_event = async (req, res) => {
    const eventId = req.params.eventId;
    if (!eventId)
        return res.status(400).json({ message: "eventId is required." });
    const newData = req.body;
    const Name = newData.Name;

    try {
        // Find the event by their ID
        const event = await Event.findOne({
            where: { id: req.params.eventId },
        });

        if (!event) {
            return res.status(404).json({ message: "event not found." });
        }

        await event.update({ Name });
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const delet_event = async (req, res) => {
    const eventId = req.params.eventId;
    if (!eventId)
        return res.status(400).json({ message: "eventId is required." });
    try {
        const event = await Event.findOne({
            where: { id: req.params.eventId },
        });
        if (!event) {
            return res.status(404).json({ message: "event not found." });
        }
        await event.destroy();
        return res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const add_event = async (req, res) => {
    const { Name, companyId } = req.body;
    if (!Name || !companyId)
        return res.status(400).json({ message: "Messing Data." });
    try {
        const event = await Event.create({
            Name,
            companyId,
        });
        return res.status(200).json({ Event: event });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    get_All,
    get_by_id,
    edit_event,
    delet_event,
    add_event,
    get_compayny_Events,
};
