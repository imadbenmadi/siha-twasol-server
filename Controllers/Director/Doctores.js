const { Director } = require("../../Models/Director");
const { Worker } = require("../../Models/Worker");
const { Medecin } = require("../../Models/Medecin");
const { Malad } = require("../../Models/Malad");
const { Service } = require("../../Models/Company");
const { Company } = require("../../Models/Company");
const get_All = async (req, res) => {
    if (!req.params.companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const users = await Medecin.findAll({
            include: [{ model: Company }, { model: Service }],
            where: { companyId: req.params.companyId },
        });
        return res.status(200).json({ Users: users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const get_by_id = async (req, res) => {
    if (!req.params.doctorId)
        return res.status(400).json({ message: "userId is required." });
    try {
        const user = await Medecin.findByPk(req.params.doctorId, {
            include: [{ model: Company }, { model: Service }],
            // attributes: { exclude: ["password"] },
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
const edit_doctore = async (req, res) => {
    const userId = req.params.doctorId;
    const newData = req.body;
    const email = newData.email;
    const password = newData.password;
    if (!userId)
        return res.status(400).json({ message: "userId is required." });

    try {
        // Find the user by their ID
        const user = await Medecin.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        const exist_medicin = await Medecin.findOne({
            where: { email: email },
        });
        const exist_worker = await Worker.findOne({
            where: { email: email },
        });
        const exist_malad = await Malad.findOne({
            where: { email: email },
        });
        const exist_director = await Director.findOne({
            where: { email: email },
        });
        if (exist_malad || exist_medicin || exist_director || exist_worker) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }

        await user.update({ email, password });
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};
const delet_doctore = async (req, res) => {
    const userId = req.params.doctorId;
    if (!userId)
        return res.status(400).json({ message: "userId is required." });
    try {
        const user = await Medecin.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const add_doctore = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        telephone,
        speciality,
        serviceId,
        companyId,
        profile_pic_link, // Optional
    } = req.body;

    // Validate the required fields
    if (
        !email ||
        !password ||
        !companyId ||
        !serviceId ||
        !firstName ||
        !lastName ||
        !speciality
    ) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate email format (basic email regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({
            message: "Password should be at least 8 characters long.",
        });
    }

    // Validate that serviceId and companyId are integers
    if (isNaN(serviceId) || isNaN(companyId)) {
        return res.status(400).json({
            message: "serviceId and companyId should be valid numbers.",
        });
    }

    try {
        // Check if the email already exists in Medecin, Malad, or Director
        const exist_medicin = await Medecin.findOne({ where: { email } });
        const exist_malad = await Malad.findOne({ where: { email } });
        const exist_director = await Director.findOne({ where: { email } });

        if (exist_medicin || exist_malad || exist_director) {
            return res.status(400).json({
                message: "Email already exists, please use another email.",
            });
        }

        // Create new Medecin (Doctor)
        const user = await Medecin.create({
            email,
            password,
            firstName,
            lastName,
            telephone, // Optional
            speciality,
            serviceId,
            companyId,
            profile_pic_link, // Optional
        });

        // Return success response with created user
        return res.status(200).json({ User: user });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Server error: " + error.message });
    }
};

const get_Services = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const services = await Service.findAll({ where: { companyId } });
        return res.status(200).json({ Services: services });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
module.exports = {
    get_All,
    get_by_id,
    edit_doctore,
    delet_doctore,
    add_doctore,
    get_Services,
};
