const { Malad } = require("../../Models/Malad");

const getProfile = async (req, res) => {
    const userId = req.decoded.userId;

    try {
        const user = await Malad.findByPk(req.decoded.userId, {
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

module.exports = { getProfile };
