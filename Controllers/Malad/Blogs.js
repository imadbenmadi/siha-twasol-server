const { Op } = require("sequelize");
const { Company } = require("../../Models/Company");
const { Blog } = require("../../Models/Blog");
const { Worker } = require("../../Models/Worker");
const { Doctor } = require("../../Models/Doctor");
const { Director } = require("../../Models/Director");
const { Doctor_Followers } = require("../../Models/Doctor_Followers");

const get_blogs = async (req, res) => {
    const { userId } = req.params;

    try {
        // Step 1: Find companies the user follows
        const followedCompanies = await Doctor_Followers.findAll({
            where: { maladId: userId },
            attributes: ["companyId"],
        });

        // Extract company IDs from the followed companies
        const followedCompanyIds = followedCompanies.map(
            (follow) => follow.companyId
        );

        // Step 2: Retrieve blogs from followed companies with author info
        const priorityBlogs = await Blog.findAll({
            where: { companyId: followedCompanyIds },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
                // Include user details based on ownerType
                {
                    model: Worker,
                    required: false,
                    where: { ownerType: "worker" },
                    attributes: ["id", "name", "position"],
                },
                {
                    model: Doctor,
                    required: false,
                    where: { ownerType: "doctor" },
                    attributes: ["id", "name", "specialty"],
                },
                {
                    model: Director,
                    required: false,
                    where: { ownerType: "director" },
                    attributes: ["id", "name", "department"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Step 3: (Optional) Retrieve blogs from non-followed companies
        const otherBlogs = await Blog.findAll({
            where: { companyId: { [Op.notIn]: followedCompanyIds } },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
                {
                    model: Worker,
                    required: false,
                    where: { ownerType: "worker" },
                    attributes: ["id", "name", "position"],
                },
                {
                    model: Doctor,
                    required: false,
                    where: { ownerType: "doctor" },
                    attributes: ["id", "name", "specialty"],
                },
                {
                    model: Director,
                    required: false,
                    where: { ownerType: "director" },
                    attributes: ["id", "name", "department"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Combine priority and other blogs
        const allBlogs = [...priorityBlogs, ...otherBlogs];

        // Step 4: Send the response
        res.status(200).json({ blogs: allBlogs });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve blogs.", error });
    }
};

const get_blog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const blog = await Blog.findByPk(blogId, {
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
                {
                    model: Worker,
                    required: false,
                    where: { ownerType: "worker" },
                    attributes: ["id", "name", "position"],
                },
                {
                    model: Doctor,
                    required: false,
                    where: { ownerType: "doctor" },
                    attributes: ["id", "name", "specialty"],
                },
                {
                    model: Director,
                    required: false,
                    where: { ownerType: "director" },
                    attributes: ["id", "name", "department"],
                },
            ],
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve the blog.",
            error,
        });
    }
};

module.exports = { get_blogs, get_blog };
