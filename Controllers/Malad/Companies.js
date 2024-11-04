const { Company, Service } = require("../../Models/Company");
const { Blog } = require("../../Models/Blog");
const { Event } = require("../../Models/Event");
const { Medecin } = require("../../Models/Medecin");

const get_All = async (req, res) => {
    try {
        const companies = await Company.findAll({
            include: [
                { model: Service, as: "Services" },
                { model: Medecin, as: "Medecins" },
            ],
        });
        res.status(200).json(companies);
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const get_One = async (req, res) => {
    if (!req.params.companyId) {
        return res.status(400).json({ message: "Company ID is required." });
    }
    try {
        const company = await Company.findByPk(req.params.companyId, {
            include: [
                { model: Service, as: "Services" },
                {
                    model: Blog,
                    as: "Blogs",
                },
                {
                    model: Event,
                    as: "Events",
                },
                {
                    model: Medecin,
                    as: "Medecins",
                },
            ],
        });

        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error("Failed to fetch company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { get_All, get_One };
