const { Event } = require("../../Models/Event");
const { Company } = require("../../Models/Company");

// Get all events
const get_All = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [{ model: Company }],
        });
        return res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get events by companyId
const get_company_Events = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }

    try {
        const events = await Event.findAll({
            where: { companyId },
            include: [{ model: Company }],
        });
        return res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get an event by ID
const get_by_id = async (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ message: "eventId is required." });
    }

    try {
        const event = await Event.findOne({
            where: { id: eventId },
            include: [{ model: Company }],
        });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        return res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Edit event details
const edit_event = async (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ message: "eventId is required." });
    }

    const { Title, Description, ownerId, ownerType } = req.body;

    try {
        const event = await Event.findOne({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        await event.update({ Title, Description, ownerId, ownerType });
        return res.status(200).json({ message: "Event updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Delete an event
const delete_event = async (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ message: "eventId is required." });
    }

    try {
        const event = await Event.findOne({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        await event.destroy();
        return res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Add a new event
const add_event = async (req, res) => {
    const { Title, Description, ownerId, ownerType, companyId } = req.body;
    if (!Title || !ownerId || !ownerType || !companyId) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const event = await Event.create({
            Title,
            Description,
            ownerId,
            ownerType,
            companyId,
        });
        return res.status(201).json({ event });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    get_All,
    get_company_Events,
    get_by_id,
    edit_event,
    delete_event,
    add_event,
};
