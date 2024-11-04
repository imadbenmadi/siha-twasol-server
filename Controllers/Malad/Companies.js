const { Company, Service } = require("../../Models/Company");

const get_All = async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [{ model: Service, as: "Services" }],
        });
        console.log("Fetched Companies:", companies); // Log fetched data to inspect the structure
        res.status(200).json(companies);
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { get_All };
