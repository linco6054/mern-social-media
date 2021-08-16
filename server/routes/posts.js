import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import isLoggedInMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);

router.post("/", isLoggedInMiddleware, createPost);
router.patch("/:id", isLoggedInMiddleware, updatePost);
router.delete("/:id", isLoggedInMiddleware, deletePost);
router.patch("/:id/likepost", isLoggedInMiddleware, likePost);

export default router;
