const express = require("express");
const router = express.Router();
const { Company } = require("../../Models/Company");
const { Service } = require("../../Models/Company");
const { Director } = require("../../Models/Director");

const { Worker } = require("../../Models/Worker");
const { Medecin } = require("../../Models/Medecin");
const { malad_follow } = require("../../Models/Malad");

const Admin_midllware = require("../../Middlewares/Admin");

router.get("/", Admin_midllware, async (req, res) => {
    try {
        const companies = await Company.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ companies });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.get("/:id", Admin_midllware, async (req, res) => {
    try {
        const company = await Company.findOne({
            where: { id: req.params.id },
            include: [
                { model: Service, as: "Services" },
                { model: Director, as: "Directors" },
                { model: Worker, as: "Workers" },
                { model: Medecin, as: "Medecins" },
                { model: malad_follow, as: "malad_follows" },
            ],
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ company });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.post("/", Admin_midllware, async (req, res) => {
    const { Name, Location, Wilaya, Type, director_email, director_password } =
        req.body;
    if (
        !Name ||
        !Location ||
        !Wilaya ||
        !Type ||
        !director_email ||
        !director_password
    ) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const company = await Company.create({
            Name,
            Location,
            Wilaya,
            Type,
        });
        await Director.create({
            email: director_email,
            password: director_password,
            companyId: company.id,
        });
        res.status(200).json({ message: "Company created", company });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

router.delete("/:id", Admin_midllware, async (req, res) => {
    try {
        const company = await Company.findOne({
            where: { id: req.params.id },
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        await company.destroy();
        res.status(200).json({ message: "Company deleted" });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});
router.put("/:id", Admin_midllware, async (req, res) => {
    try {
        const company = await Company.findOne({
            where: { id: req.params.id },
        });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        await company.update(req.body);
        res.status(200).json({ company });
    } catch (err) {
        console.error("Error fetching Project Applications:", err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;
