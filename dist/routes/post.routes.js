"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.authenticate, post_controller_1.createPost);
router.get("/get-all/:blogId", auth_middleware_1.authenticate, post_controller_1.getAllPosts);
router.get("/get-by-id/:id", auth_middleware_1.authenticate, post_controller_1.getPostById);
router.put("/update/:id", auth_middleware_1.authenticate, post_controller_1.updatePost);
router.delete("/delete/:id", auth_middleware_1.authenticate, post_controller_1.deletePost);
router.get("/sort-by-date/:blogId", auth_middleware_1.authenticate, post_controller_1.sortPostsByDate);
router.get("/:postId/get-comments", auth_middleware_1.authenticate, post_controller_1.getPostComments);
exports.default = router;
//# sourceMappingURL=post.routes.js.map