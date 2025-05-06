import type { Request, Response } from "express"
import pool from "../config/db"

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId, content } = req.body
    const userId = req.userId

    const newComment = await pool.query(
      "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [postId, userId, content],
    )

    res.status(201).json({
      message: "Comment created successfully",
      comment: newComment.rows[0],
    })
  } catch (error) {
    console.error("Create comment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const userId = req.userId

    const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [id])

    if (comment.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found" })
    }

    if (comment.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Not authorized to update this comment" })
    }

    const updatedComment = await pool.query("UPDATE comments SET content = $1 WHERE id = $2 RETURNING *", [content, id])

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment.rows[0],
    })
  } catch (error) {
    console.error("Update comment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const comment = await pool.query("SELECT * FROM comments WHERE id = $1", [id])

    if (comment.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found" })
    }

    if (comment.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" })
    }

    await pool.query("DELETE FROM comments WHERE id = $1", [id])

    res.status(200).json({
      message: "Comment deleted successfully",
    })
  } catch (error) {
    console.error("Delete comment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}
