import express from "express"
import {
  createBlog,
  getMyBlogs,
  getMyJoinedBlogs,
  getBlogInfo,
  updateBlog,
  deleteBlog,
  searchBlogs,
  joinBlog,
  leaveBlog,
  getBlogUsers,
} from "../controllers/blog.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/create", authenticate, createBlog)
router.get("/get-my-blogs", authenticate, getMyBlogs)
router.get("/get-my-joined-blogs", authenticate, getMyJoinedBlogs)
router.get("/get-blog-info/:id", authenticate, getBlogInfo)
router.put("/update/:id", authenticate, updateBlog)
router.delete("/delete/:id", authenticate, deleteBlog)
router.get("/search", authenticate, searchBlogs)
router.post("/join-blog", authenticate, joinBlog)
router.post("/leave-blog", authenticate, leaveBlog)
router.get("/get-users/:id", authenticate, getBlogUsers)

export default router
