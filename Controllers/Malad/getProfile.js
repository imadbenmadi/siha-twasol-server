const { Malad } = require("../../Models/Malad");

const getProfile = async (req, res) => {

    try {
        const user = await Malad.findByPk(req.decoded.userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        return res.status(200).json({ User: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

module.exports = { getProfile };
