const { Medecins } = require("../../Models/Medecin");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the Medecin by their ID
        const Medecin = await Medecins.findByPk(userId);

        if (!Medecin) {
            return res.status(404).json({ error: "Medecin not found." });
        }

        await Medecin.update(newData);
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { EditeProfile };
