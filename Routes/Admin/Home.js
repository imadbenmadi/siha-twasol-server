const express = require("express");
const router = express.Router();
const Admin_midllware = require("../../Middlewares/Admin");
const { Op } = require("sequelize");

const { Malad } = require("../../Models/Malad");
const { Medecin } = require("../../Models/Medecin");
const { Company } = require("../../Models/Company");
router.get("/", Admin_midllware, async (req, res) => {
    try {
        let Malad_nbr = await Malad.count({
            where: {},
        });
        let Medecin_nbr = await Medecin.count({
            where: {},
        });
        let Company_nbr = await Company.count({
            where: {},
        });
        let Malads = await Malad.findAll({
            where: {},
        });
        let Medecins = await Medecin.findAll({
            where: {},
        });
        let Companies = await Company.findAll({
            where: {},
        });
        if (!Malad_nbr) Malad_nbr = 0;
        if (!Medecin_nbr) Medecin_nbr = 0;
        if (!Company_nbr) Company_nbr = 0;
        res.status(200).json({
            Malad_nbr: Malad_nbr,
            Medecin_nbr: Medecin_nbr,
            Company_nbr: Company_nbr,
            Malads: Malads,
            Medecins: Medecins,
            Companies: Companies,
        });
    } catch (err) {
        console.error("Error fetching Home page:", err);
        res.status(500).json({ message: err });
    }
});

module.exports = router;
