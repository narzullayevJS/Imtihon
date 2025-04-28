"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.authenticate, blog_controller_1.createBlog);
router.get("/get-my-blogs", auth_middleware_1.authenticate, blog_controller_1.getMyBlogs);
router.get("/get-my-joined-blogs", auth_middleware_1.authenticate, blog_controller_1.getMyJoinedBlogs);
router.get("/get-blog-info/:id", auth_middleware_1.authenticate, blog_controller_1.getBlogInfo);
router.put("/update/:id", auth_middleware_1.authenticate, blog_controller_1.updateBlog);
router.delete("/delete/:id", auth_middleware_1.authenticate, blog_controller_1.deleteBlog);
router.get("/search", auth_middleware_1.authenticate, blog_controller_1.searchBlogs);
router.post("/join-blog", auth_middleware_1.authenticate, blog_controller_1.joinBlog);
router.post("/leave-blog", auth_middleware_1.authenticate, blog_controller_1.leaveBlog);
router.get("/get-users/:id", auth_middleware_1.authenticate, blog_controller_1.getBlogUsers);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map