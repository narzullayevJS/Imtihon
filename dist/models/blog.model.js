"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlogMember = exports.isBlogOwner = exports.getBlogUsers = exports.leaveBlog = exports.joinBlog = exports.searchBlogs = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getJoinedBlogs = exports.getBlogsByUserId = exports.createBlog = void 0;
const db_1 = __importDefault(require("../config/db"));
const createBlog = async (blog) => {
    const { title, description, owner_id } = blog;
    const query = "INSERT INTO blogs (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, description, owner_id];
    const result = await db_1.default.query(query, values);
    return result.rows[0];
};
exports.createBlog = createBlog;
const getBlogsByUserId = async (userId) => {
    const query = "SELECT * FROM blogs WHERE owner_id = $1 ORDER BY created_at DESC";
    const result = await db_1.default.query(query, [userId]);
    return result.rows;
};
exports.getBlogsByUserId = getBlogsByUserId;
const getJoinedBlogs = async (userId) => {
    const query = `
    SELECT b.* FROM blogs b
    JOIN blog_members bm ON b.id = bm.blog_id
    WHERE bm.user_id = $1
    ORDER BY bm.joined_at DESC
  `;
    const result = await db_1.default.query(query, [userId]);
    return result.rows;
};
exports.getJoinedBlogs = getJoinedBlogs;
const getBlogById = async (id) => {
    const query = "SELECT * FROM blogs WHERE id = $1";
    const result = await db_1.default.query(query, [id]);
    return result.rows[0];
};
exports.getBlogById = getBlogById;
const updateBlog = async (id, title, description) => {
    const query = "UPDATE blogs SET title = $1, description = $2 WHERE id = $3 RETURNING *";
    const values = [title, description, id];
    const result = await db_1.default.query(query, values);
    return result.rows[0];
};
exports.updateBlog = updateBlog;
const deleteBlog = async (id) => {
    const query = "DELETE FROM blogs WHERE id = $1";
    await db_1.default.query(query, [id]);
    return true;
};
exports.deleteBlog = deleteBlog;
const searchBlogs = async (searchTerm) => {
    const query = "SELECT * FROM blogs WHERE title ILIKE $1";
    const result = await db_1.default.query(query, [`%${searchTerm}%`]);
    return result.rows;
};
exports.searchBlogs = searchBlogs;
const joinBlog = async (blogId, userId) => {
    const query = "INSERT INTO blog_members (blog_id, user_id) VALUES ($1, $2) RETURNING *";
    const values = [blogId, userId];
    const result = await db_1.default.query(query, values);
    return result.rows[0];
};
exports.joinBlog = joinBlog;
const leaveBlog = async (blogId, userId) => {
    const query = "DELETE FROM blog_members WHERE blog_id = $1 AND user_id = $2";
    await db_1.default.query(query, [blogId, userId]);
    return true;
};
exports.leaveBlog = leaveBlog;
const getBlogUsers = async (blogId) => {
    const query = `
    SELECT u.id, u.username, u.email, bm.joined_at 
    FROM users u
    JOIN blog_members bm ON u.id = bm.user_id
    WHERE bm.blog_id = $1
  `;
    const result = await db_1.default.query(query, [blogId]);
    return result.rows;
};
exports.getBlogUsers = getBlogUsers;
const isBlogOwner = async (blogId, userId) => {
    const query = "SELECT * FROM blogs WHERE id = $1 AND owner_id = $2";
    const result = await db_1.default.query(query, [blogId, userId]);
    return result.rows.length > 0;
};
exports.isBlogOwner = isBlogOwner;
const isBlogMember = async (blogId, userId) => {
    const query = "SELECT * FROM blog_members WHERE blog_id = $1 AND user_id = $2";
    const result = await db_1.default.query(query, [blogId, userId]);
    return result.rows.length > 0;
};
exports.isBlogMember = isBlogMember;
//# sourceMappingURL=blog.model.js.map