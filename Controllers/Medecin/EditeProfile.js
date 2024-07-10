const { Medecin } = require("../../Models/Medecin");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the medecin by their ID
        const medecin = await Medecin.findByPk(userId);

        if (!medecin) {
            return res.status(404).json({ error: "medecin not found." });
        }

        await medecin.update(newData);
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { EditeProfile };
