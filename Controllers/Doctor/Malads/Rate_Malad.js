const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");
const { Doctor } = require("../../Models/Doctor");
const { Doctor_Malads } = require("../../Models/Doctor");
const rate_malad = async (req, res) => {
    const { maladId } = req.params;
    const { userId, rating } = req.body;
    if (!maladId || !userId || !rating) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    try {
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        await malad.addRating(user, { through: { rating } });
        return res.status(201).json({ message: "Rating added successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    rate_malad,
};
