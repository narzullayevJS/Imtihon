import type { Request, Response } from "express"
import pool from "../config/db"

export const createPost = async (req: Request, res: Response) => {
  try {
    const { blogId, title, content } = req.body
    const userId = req.userId

    const blog = await pool.query("SELECT * FROM blogs WHERE id = $1", [blogId])

    if (blog.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" })
    }

    if (blog.rows[0].owner_id !== userId) {
      return res.status(403).json({ message: "Only blog owner can create posts" })
    }

    const newPost = await pool.query(
      "INSERT INTO posts (blog_id, title, content, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [blogId, title, content, userId],
    )

    res.status(201).json({
      message: "Post created successfully",
      post: newPost.rows[0],
    })
  } catch (error) {
    console.error("Create post error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params

    const posts = await pool.query("SELECT * FROM posts WHERE blog_id = $1", [blogId])

    res.status(200).json({
      posts: posts.rows,
    })
  } catch (error) {
    console.error("Get all posts error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const post = await pool.query("UPDATE posts SET views = views + 1 WHERE id = $1 RETURNING *", [id])

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.status(200).json({
      post: post.rows[0],
    })
  } catch (error) {
    console.error("Get post by id error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const userId = req.userId

    const post = await pool.query(
      "SELECT p.*, b.owner_id FROM posts p JOIN blogs b ON p.blog_id = b.id WHERE p.id = $1",
      [id],
    )

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (post.rows[0].owner_id !== userId) {
      return res.status(403).json({ message: "Only blog owner can update posts" })
    }

    const updatedPost = await pool.query("UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *", [
      title,
      content,
      id,
    ])

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost.rows[0],
    })
  } catch (error) {
    console.error("Update post error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const post = await pool.query(
      "SELECT p.*, b.owner_id FROM posts p JOIN blogs b ON p.blog_id = b.id WHERE p.id = $1",
      [id],
    )

    if (post.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (post.rows[0].owner_id !== userId) {
      return res.status(403).json({ message: "Only blog owner can delete posts" })
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [id])

    res.status(200).json({
      message: "Post deleted successfully",
    })
  } catch (error) {
    console.error("Delete post error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const sortPostsByDate = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params

    const posts = await pool.query("SELECT * FROM posts WHERE blog_id = $1 ORDER BY created_at DESC", [blogId])

    res.status(200).json({
      posts: posts.rows,
    })
  } catch (error) {
    console.error("Sort posts error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getPostComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params

    const comments = await pool.query(
      "SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at DESC",
      [postId],
    )

    res.status(200).json({
      comments: comments.rows,
    })
  } catch (error) {
    console.error("Get post comments error:", error)
    res.status(500).json({ message: "Server error" })
  }
}
