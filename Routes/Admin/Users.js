const express = require("express");
const router = express.Router();
const adminMiddleware = require("../../Middlewares/Admin");

const { Malad } = require("../../Models/Malad");
const { Medecin } = require("../../Models/Medecin");
const { Worker } = require("../../Models/Worker");
const { Malad_Rates, Medicin_Rates } = require("../../Models/Rates");
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const malads = await Malad.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const medicins = await Medecin.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });
        const workers = await Worker.findAll({
            attributes: { exclude: ["password"] },
            order: [["createdAt", "DESC"]],
        });

        // Add userType to each user object
        const maladUsers = malads.map((malad) => ({
            ...malad.toJSON(),
            userType: "malad",
        }));
        const medicinUsers = medicins.map((medicin) => ({
            ...medicin.toJSON(),
            userType: "medecin",
        }));
        const workerUsers = workers.map((worker) => ({
            ...worker.toJSON(),
            userType: "worker",
        }));
        const users = [...maladUsers, ...medicinUsers, ...workerUsers];

        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Send the combined array in the response
        res.status(200).json({ users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/Medecins/:id", adminMiddleware, async (req, res) => {
    const MedecinId = req.params.id;
    if (!MedecinId)
        return res.status(409).json({ message: "Medecin ID is required" });
    try {
        const Medecin = await Medecin.findOne({
            where: { id: MedecinId },
            attributes: { exclude: ["password"] },
        });
        if (!Medecin)
            return res.status(404).json({ message: "Medecin not found" });
        res.status(200).json({ user: Medecin });
    } catch (err) {
        console.error("Error fetching Medecin:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Malads/:id", adminMiddleware, async (req, res) => {
    const maladId = req.params.id;
    if (!maladId)
        return res.status(409).json({ message: "Freelancer ID is required" });
    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
            attributes: { exclude: ["password"] },
        });
        if (!malad) return res.status(404).json({ message: "malad not found" });
        res.status(200).json({ user: malad });
    } catch (err) {
        console.error("Error fetching malad:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/Malads/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(409).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Medicin_Rates.findAll({
            where: {
                maladId: userId,
            },
            include: [
                { model: Malad, as: "Malad" },
                { model: Medecin, as: "Medecin" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.get("/Medecins/:id/Feedbacks", adminMiddleware, async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(409).json({ error: "Unauthorized , missing userId" });
    try {
        const Feedbacks = await Malad_Rates.findAll({
            where: {
                medicinId: userId,
            },
            include: [
                { model: Malad, as: "Malad" },
                { model: Medecin, as: "Medecin" },
            ],
            order: [["createdAt", "DESC"]],
        });
        if (!Feedbacks)
            return res.status(404).json({ error: "No Feedbacks found." });
        return res.status(200).json({ Feedbacks: Feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
});
router.delete("/Malads/:id", adminMiddleware, async (req, res) => {
    const maladId = req.params.id;
    if (!maladId)
        return res.status(409).json({ message: "Freelancer ID is required" });
    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
        });
        if (!malad) return res.status(404).json({ message: "malad not found" });
        await Malad.destroy({ where: { id: maladId } });
        res.status(200).json({ message: "malad deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting malad:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/Medecins/:id", adminMiddleware, async (req, res) => {
    const MedecinId = req.params.id;
    if (!MedecinId)
        return res.status(409).json({ message: "Medecin ID is required" });
    try {
        const Medecin = await Medecin.findOne({
            where: { id: MedecinId },
        });
        if (!Medecin)
            return res.status(404).json({ message: "Medecin not found" });
        await Medecin.destroy({ where: { id: MedecinId } });
        res.status(200).json({ message: "Medecin deleted successfully" });
    } catch (err) {
        console.error("Error fetching deleting Medecin:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
