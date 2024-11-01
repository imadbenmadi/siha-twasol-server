const { Blog } = require("../../Models/Blog");
const { Company } = require("../../Models/Company");

// Get all blogs
const get_All = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [{ model: Company }],
        });
        return res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get blogs by companyId
const get_company_Services = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }

    try {
        const blogs = await Blog.findAll({
            where: { companyId },
            include: [{ model: Company }],
        });
        return res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get a blog by ID
const get_by_id = async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        return res.status(400).json({ message: "blogId is required." });
    }

    try {
        const blog = await Blog.findOne({
            where: { id: blogId },
            include: [{ model: Company }],
        });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        return res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Edit blog details
const edit_blog = async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        return res.status(400).json({ message: "blogId is required." });
    }

    const { Title, Description } = req.body;

    try {
        const blog = await Blog.findOne({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        await blog.update({ Title, Description });
        return res.status(200).json({ message: "Blog updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Delete a blog
const delete_blog = async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        return res.status(400).json({ message: "blogId is required." });
    }

    try {
        const blog = await Blog.findOne({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        await blog.destroy();
        return res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Add a new blog
const add_blog = async (req, res) => {
    const { Title, Description, ownerId, ownerType, companyId } = req.body;
    if (!Title || !ownerId || !ownerType || !companyId) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const blog = await Blog.create({
            Title,
            Description,
            ownerId,
            ownerType,
            companyId,
        });
        return res.status(201).json({ blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    get_All,
    get_company_Services,
    get_by_id,
    edit_blog,
    delete_blog,
    add_blog,
};
