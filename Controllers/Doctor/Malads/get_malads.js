const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");
const { Doctor } = require("../../Models/Doctor");
const { Doctor_Malads } = require("../../Models/Doctor");
// Get all malads
const get_All = async (req, res) => {
    if (!req.params.companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }
    try {
        const ownedMaladIds = await Doctor_Malads.findAll({
            where: { doctorId: req.params.userId },
            // attributes: ["maladId"],
            raw: true,
        }).then((results) => results.map((item) => item.maladId));

        const malads = await Malad.findAll({
            where: {
                id: { [Sequelize.Op.notIn]: ownedMaladIds },
            },
        });

        return res.status(200).json({ malads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get an malad by ID
const get_by_id = async (req, res) => {
    const { maladId } = req.params;
    if (!maladId) {
        return res.status(400).json({ message: "maladId is required." });
    }

    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
        });
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        return res.status(200).json({ malad });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const get_own_malad = async (req, res) => {
    try {
        const malads = await Doctor_Malads.findOne({
            where: { doctorId: req.params.userId },
            include: [{ model: Company }],
        });

        return res.status(200).json({ malads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    get_All,
    get_by_id,
    get_own_malad,
};
