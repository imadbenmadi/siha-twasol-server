const { Director } = require("../../Models/Director");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the user by their ID
        const user = await Director.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "user not found." });
        }

        await user.update(newData);
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
const getProfile = async (req, res) => {
    const userId = req.decoded.userId;
    try {
        const user = await Director.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ error: "user not found." });
        }
        return res.status(200).json({ User: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
module.exports = { EditeProfile, getProfile };
