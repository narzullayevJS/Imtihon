"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = void 0;
const db_1 = __importDefault(require("../config/db"));
const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.userId;
        const newComment = await db_1.default.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *", [postId, userId, content]);
        res.status(201).json({
            message: "Comment created successfully",
            comment: newComment.rows[0],
        });
    }
    catch (error) {
        console.error("Create comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createComment = createComment;
const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.userId;
        // Check if user is the comment owner
        const comment = await db_1.default.query("SELECT * FROM comments WHERE id = $1", [id]);
        if (comment.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.rows[0].user_id !== userId) {
            return res.status(403).json({ message: "Not authorized to update this comment" });
        }
        const updatedComment = await db_1.default.query("UPDATE comments SET content = $1 WHERE id = $2 RETURNING *", [content, id]);
        res.status(200).json({
            message: "Comment updated successfully",
            comment: updatedComment.rows[0],
        });
    }
    catch (error) {
        console.error("Update comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        // Check if user is the comment owner
        const comment = await db_1.default.query("SELECT * FROM comments WHERE id = $1", [id]);
        if (comment.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.rows[0].user_id !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this comment" });
        }
        await db_1.default.query("DELETE FROM comments WHERE id = $1", [id]);
        res.status(200).json({
            message: "Comment deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete comment error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=coment.controller.js.map