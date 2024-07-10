const { Malad } = require("../../Models/Malad");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the malad by their ID
        const malad = await Malad.findByPk(userId);
        if (!malad) {
            return res.status(404).json({ error: "malad not found." });
        }
        await malad.update(newData);

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: malad,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { EditeProfile };
