import express from "express"
import { createComment, updateComment, deleteComment } from "../controllers/coment.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/create", authenticate, createComment)
router.put("/update/:id", authenticate, updateComment)
router.delete("/delete/:id", authenticate, deleteComment)

export default router
