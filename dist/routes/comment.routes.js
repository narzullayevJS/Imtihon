"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coment_controller_1 = require("../controllers/coment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/create", auth_middleware_1.authenticate, coment_controller_1.createComment);
router.put("/update/:id", auth_middleware_1.authenticate, coment_controller_1.updateComment);
router.delete("/delete/:id", auth_middleware_1.authenticate, coment_controller_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map