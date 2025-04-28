import express from "express"
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  sortPostsByDate,
  getPostComments,
} from "../controllers/post.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/create", authenticate, createPost)
router.get("/get-all/:blogId", authenticate, getAllPosts)
router.get("/get-by-id/:id", authenticate, getPostById)
router.put("/update/:id", authenticate, updatePost)
router.delete("/delete/:id", authenticate, deletePost)
router.get("/sort-by-date/:blogId", authenticate, sortPostsByDate)
router.get("/:postId/get-comments", authenticate, getPostComments)

export default router
