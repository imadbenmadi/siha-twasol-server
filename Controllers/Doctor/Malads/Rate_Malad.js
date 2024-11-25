const { Malad } = require("../../../Models/Malad");
const { Company } = require("../../../Models/Company");
const { Doctor } = require("../../../Models/Doctor");
const { Doctor_Malads } = require("../../../Models/Doctor");
const { Malad_Rates, Doctor_Rates } = require("../../../Models/Rates");
const rate_malad = async (req, res) => {
    const { maladId } = req.params;
    const { rating, review } = req.body;

    if (!maladId || !rating) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const malad = await Malad.findByPk(maladId);
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }
        const user = await Doctor.findByPk(req.decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const alreadyRated = await Malad_Rates.findOne({
            where: { maladId, doctorId: req.decoded.userId },
        });

        if (alreadyRated) {
            return res.status(400).json({ message: "Malad already rated." });
        }
        await Malad_Rates.create({
            maladId,
            doctorId: req.decoded.userId,
            rate: rating,
            review,
        });
        return res.status(200).json({ message: "Rating added successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    rate_malad,
};
