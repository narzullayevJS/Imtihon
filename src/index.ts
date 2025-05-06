import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes"
import blogRoutes from "./routes/blog.routes"
import postRoutes from "./routes/post.routes"
import commentRoutes from "./routes/comment.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
