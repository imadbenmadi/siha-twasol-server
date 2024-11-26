const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");
const { Doctor } = require("../../Models/Doctor");
const { Doctor_Malads } = require("../../Models/Doctor");
const { Malad_Files } = require("../../Models/Malad_Files");
const fs = require("fs");
const path = require("path");

const get_file = async (req, res) => {
    const { fileId } = req.params;
    if (!fileId) {
        return res.status(400).json({ message: "fileId is required." });
    }

    try {
        const file = await Malad_Files.findOne({
            where: { id: fileId },
        });
        if (!file) {
            return res.status(404).json({ message: "File not found." });
        }

        const filePath = path.join(__dirname, "../../../", file.file_link);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found." });
        }

        return res.download(filePath);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const delete_file = async (req, res) => {
    const { fileId } = req.params;
    if (!fileId) {
        return res.status(400).json({ message: "fileId is required." });
    }

    try {
        const file = await Malad_Files.findOne({
            where: { id: fileId },
        });
        if (!file) {
            return res.status(404).json({ message: "File not found." });
        }

        const filePath = path.join(__dirname, "../../../", file.file_link);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found." });
        }

        fs.unlinkSync(filePath);
        await file.destroy();

        return res.status(200).json({ message: "File deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const upload_file = async (req, res) => {
    const { maladId } = req.params;
    if (!maladId) {
        return res.status(400).json({ message: "maladId is required." });
    }

    try {
        const malad = await Malad.findOne({
            where: { id: maladId },
        });
        if (!malad) {
            return res.status(404).json({ message: "Malad not found." });
        }

        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "file is required." });
        }

        const file = req.files.file;
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(
            __dirname,
            "../../../",
            "public/Malads_Files/",
            fileName
        );
        file.mv(filePath);

        await Malad_Files.create({
            Title: req.body.Title,
            file_link: `uploads/${fileName}`,
            maladId,
            doctorId: req.params.userId,
        });

        return res.status(201).json({ message: "File uploaded successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
module.exports = {
    get_file,
    delete_file,
    upload_file,
};
