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

        // Step 2: Retrieve blogs from followed companies
        const priorityBlogs = await Blog.findAll({
            where: { companyId: followedCompanyIds },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Manually attach owner details to each blog
        const blogsWithOwners = await Promise.all(
            priorityBlogs.map(async (blog) => {
                let owner = null;
                if (blog.ownerType === "doctor") {
                    owner = await Doctor.findByPk(blog.ownerId, {
                        attributes: ["id", "name", "specialty"],
                    });
                } else if (blog.ownerType === "worker") {
                    owner = await Worker.findByPk(blog.ownerId, {
                        attributes: ["id", "name", "position"],
                    });
                } else if (blog.ownerType === "director") {
                    owner = await Director.findByPk(blog.ownerId, {
                        attributes: ["id", "name", "department"],
                    });
                }
                return {
                    ...blog.toJSON(),
                    Owner: owner ? owner.toJSON() : null,
                };
            })
        );

        // Step 3: Retrieve blogs from non-followed companies
        const otherBlogs = await Blog.findAll({
            where: { companyId: { [Op.notIn]: followedCompanyIds } },
            include: [
                {
                    model: Company,
                    attributes: ["id", "Name", "Location"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Attach owner details to each blog from non-followed companies
        const otherBlogsWithOwners = await Promise.all(
            otherBlogs.map(async (blog) => {
                let owner = null;
                if (blog.ownerType === "doctor") {
                    owner = await Doctor.findByPk(blog.ownerId, {
                        attributes: ["id", "name", "specialty"],
                    });
                } else if (blog.ownerType === "worker") {
                    owner = await Worker.findByPk(blog.ownerId, {
                        attributes: ["id", "name", "position"],
                    });
                } else if (blog.ownerType === "director") {
                    owner = await Director.findByPk(blog.ownerId, {
                        attributes: ["id", "name", "department"],
                    });
                }
                return {
                    ...blog.toJSON(),
                    Owner: owner ? owner.toJSON() : null,
                };
            })
        );

        // Combine priority and other blogs
        const allBlogs = [...blogsWithOwners, ...otherBlogsWithOwners];

        // Step 4: Send the response
        res.status(200).json({ blogs: allBlogs });
    } catch (error) {
        console.error("Failed to retrieve blogs:", error);
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
            ],
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        // Manually fetch the owner details based on ownerType
        let owner = null;
        if (blog.ownerType === "doctor") {
            owner = await Doctor.findByPk(blog.ownerId, {
                attributes: ["id", "name", "specialty"],
            });
        } else if (blog.ownerType === "worker") {
            owner = await Worker.findByPk(blog.ownerId, {
                attributes: ["id", "name", "position"],
            });
        } else if (blog.ownerType === "director") {
            owner = await Director.findByPk(blog.ownerId, {
                attributes: ["id", "name", "department"],
            });
        }

        const blogWithOwner = {
            ...blog.toJSON(),
            Owner: owner ? owner.toJSON() : null,
        };

        res.status(200).json(blogWithOwner);
    } catch (error) {
        console.error("Failed to retrieve blog:", error);
        res.status(500).json({
            message: "Failed to retrieve the blog.",
            error,
        });
    }
};

module.exports = { get_blogs, get_blog };
