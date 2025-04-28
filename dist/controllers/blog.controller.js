"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogUsers = exports.leaveBlog = exports.joinBlog = exports.searchBlogs = exports.deleteBlog = exports.updateBlog = exports.getBlogInfo = exports.getMyJoinedBlogs = exports.getMyBlogs = exports.createBlog = void 0;
const db_1 = __importDefault(require("../config/db"));
const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        const newBlog = await db_1.default.query("INSERT INTO blogs (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *", [title, description, userId]);
        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog.rows[0],
        });
    }
    catch (error) {
        console.error("Create blog error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createBlog = createBlog;
const getMyBlogs = async (req, res) => {
    try {
        const userId = req.userId;
        const blogs = await db_1.default.query("SELECT * FROM blogs WHERE owner_id = $1", [userId]);
        res.status(200).json({
            blogs: blogs.rows,
        });
    }
    catch (error) {
        console.error("Get my blogs error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getMyBlogs = getMyBlogs;
const getMyJoinedBlogs = async (req, res) => {
    try {
        const userId = req.userId;
        const blogs = await db_1.default.query("SELECT b.* FROM blogs b JOIN blog_members bm ON b.id = bm.blog_id WHERE bm.user_id = $1", [userId]);
        res.status(200).json({
            blogs: blogs.rows,
        });
    }
    catch (error) {
        console.error("Get joined blogs error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getMyJoinedBlogs = getMyJoinedBlogs;
const getBlogInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await db_1.default.query("SELECT * FROM blogs WHERE id = $1", [id]);
        if (blog.rows.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({
            blog: blog.rows[0],
        });
    }
    catch (error) {
        console.error("Get blog info error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getBlogInfo = getBlogInfo;
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.userId;
        // Check if user is the owner
        const blog = await db_1.default.query("SELECT * FROM blogs WHERE id = $1", [id]);
        if (blog.rows.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.rows[0].owner_id !== userId) {
            return res.status(403).json({ message: "Not authorized to update this blog" });
        }
        const updatedBlog = await db_1.default.query("UPDATE blogs SET title = $1, description = $2 WHERE id = $3 RETURNING *", [
            title,
            description,
            id,
        ]);
        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog.rows[0],
        });
    }
    catch (error) {
        console.error("Update blog error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        // Check if user is the owner
        const blog = await db_1.default.query("SELECT * FROM blogs WHERE id = $1", [id]);
        if (blog.rows.length === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.rows[0].owner_id !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this blog" });
        }
        await db_1.default.query("DELETE FROM blogs WHERE id = $1", [id]);
        res.status(200).json({
            message: "Blog deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete blog error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteBlog = deleteBlog;
const searchBlogs = async (req, res) => {
    try {
        const { query } = req.query;
        const blogs = await db_1.default.query("SELECT * FROM blogs WHERE title ILIKE $1", [`%${query}%`]);
        res.status(200).json({
            blogs: blogs.rows,
        });
    }
    catch (error) {
        console.error("Search blogs error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.searchBlogs = searchBlogs;
const joinBlog = async (req, res) => {
    try {
        const { blogId } = req.body;
        const userId = req.userId;
        // Check if already a member
        const memberExists = await db_1.default.query("SELECT * FROM blog_members WHERE blog_id = $1 AND user_id = $2", [
            blogId,
            userId,
        ]);
        if (memberExists.rows.length > 0) {
            return res.status(400).json({ message: "Already a member of this blog" });
        }
        await db_1.default.query("INSERT INTO blog_members (blog_id, user_id) VALUES ($1, $2)", [blogId, userId]);
        res.status(200).json({
            message: "Joined blog successfully",
        });
    }
    catch (error) {
        console.error("Join blog error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.joinBlog = joinBlog;
const leaveBlog = async (req, res) => {
    try {
        const { blogId } = req.body;
        const userId = req.userId;
        await db_1.default.query("DELETE FROM blog_members WHERE blog_id = $1 AND user_id = $2", [blogId, userId]);
        res.status(200).json({
            message: "Left blog successfully",
        });
    }
    catch (error) {
        console.error("Leave blog error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.leaveBlog = leaveBlog;
const getBlogUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await db_1.default.query("SELECT u.id, u.username, u.email FROM users u JOIN blog_members bm ON u.id = bm.user_id WHERE bm.blog_id = $1", [id]);
        res.status(200).json({
            users: users.rows,
        });
    }
    catch (error) {
        console.error("Get blog users error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getBlogUsers = getBlogUsers;
//# sourceMappingURL=blog.controller.js.map