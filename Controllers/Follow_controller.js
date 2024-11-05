const { Doctor_Followers } = require("../models/Doctor_Followers");

// Follow a Doctor
exports.followDoctor = async (req, res) => {
    const { doctorId, maladId, companyId } = req.body;

    try {
        // Check if the follow relationship already exists
        const existingFollow = await Doctor_Followers.findOne({
            where: { doctorId, maladId, companyId },
        });

        if (existingFollow) {
            return res
                .status(400)
                .json({ message: "You are already following this doctor." });
        }

        // Create the follow relationship
        await Doctor_Followers.create({ doctorId, maladId, companyId });
        res.status(201).json({ message: "Successfully followed the doctor." });
    } catch (error) {
        res.status(500).json({
            message: "Failed to follow the doctor.",
            error,
        });
    }
};

// Unfollow a Doctor
exports.unfollowDoctor = async (req, res) => {
    const { doctorId, maladId, companyId } = req.body;

    try {
        // Find and remove the follow relationship
        const unfollow = await Doctor_Followers.destroy({
            where: { doctorId, maladId, companyId },
        });

        if (unfollow) {
            res.status(200).json({
                message: "Successfully unfollowed the doctor.",
            });
        } else {
            res.status(404).json({ message: "Follow relationship not found." });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to unfollow the doctor.",
            error,
        });
    }
};

// Get Followers of a Doctor
exports.getFollowers = async (req, res) => {
    const { doctorId } = req.params;

    try {
        // Retrieve all followers for the specified doctor
        const followers = await Doctor_Followers.findAll({
            where: { doctorId },
            attributes: ["maladId", "companyId", "createdAt"],
        });

        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve followers.",
            error,
        });
    }
};
