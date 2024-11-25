const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");
const { Doctor } = require("../../Models/Doctor");
const { Doctor_Malads } = require("../../Models/Doctor");
const add_malads_to_list = async (req, res) => {
    const { maladId, userId } = req.params;
    if (!maladId || !userId) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    try {
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }

        const doctor = await Doctor.findByPk(userId);
        if (!doctor) {
            return res.status(404).json({ message: "User not found." });
        }
        const alreadyAdded = await Doctor_Malads.findOne({
            where: { maladId, doctorId: userId },
        });
        if (alreadyAdded) {
            return res.status(400).json({ message: "Malad already added." });
        }

        await Doctor_Malads.create({ maladId, doctorId: userId });
        return res.status(200).json({ message: "Malad added successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const remove_malad_from_list = async (req, res) => {
    const { maladId } = req.params;
    const { userId, companyId } = req.body;
    if (!maladId || !userId || !companyId) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    try {
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        await malad.removeUser(user);
        return res.status(200).json({ message: "Malad removed successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    add_malads_to_list,
    remove_malad_from_list,
};
