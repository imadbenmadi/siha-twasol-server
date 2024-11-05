const { Doctor } = require("../../Models/Doctor");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the doctor by their ID
        const user = await Doctor.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }

        await user.update(newData);
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { EditeProfile };
