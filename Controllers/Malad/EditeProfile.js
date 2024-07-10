const { Malads, Skills, PortfolioItems } = require("../../Models/Freelnacer");

const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;

    try {
        // Find the Malad by their ID
        const Malad = await Malads.findByPk(userId);

        if (!Malad) {
            return res.status(404).json({ error: "Malad not found." });
        }

        await Malad.update(newData);

        if (newData.Skills) {
            await updateSkills(Malad.id, newData.Skills);
        }

        if (newData.PortfolioItems) {
            await updatePortfolioItems(Malad.id, newData.PortfolioItems);
        }

        // Fetch updated skills and portfolio items
        const updatedSkills = await Skills.findAll({
            where: { MaladId: Malad.id },
        });
        const updatedPortfolioItems = await PortfolioItems.findAll({
            where: { MaladId: Malad.id },
        });

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: Malad,
            Skills: updatedSkills,
            PortfolioItems: updatedPortfolioItems,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

const updateSkills = async (MaladId, skills) => {
    // Ensure skills is an array of objects with the skill name and MaladId
    const skillEntries = skills.map((skill) => ({
        skill,
        MaladId: MaladId,
    }));

    // Destroy existing skills
    await Skills.destroy({ where: { MaladId: MaladId } });

    // Create new skills
    if (skills.length > 0) {
        await Skills.bulkCreate(skillEntries);
    }
};

const updatePortfolioItems = async (MaladId, portfolioItems) => {
    // Add MaladId to each portfolio item
    const portfolioEntries = portfolioItems.map((item) => ({
        ...item,
        MaladId: MaladId,
    }));

    // Destroy existing portfolio items
    await PortfolioItems.destroy({ where: { MaladId: MaladId } });

    // Create new portfolio items
    if (portfolioItems.length > 0) {
        await PortfolioItems.bulkCreate(portfolioEntries);
    }
};

module.exports = { EditeProfile };
