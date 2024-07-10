const { Malad } = require("../../Models/Malad");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        const user = await Malad.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found." });
        }
        await user.update(newData);

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { EditeProfile };
