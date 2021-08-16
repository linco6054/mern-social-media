import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
// all handlers for our routes

export const getPosts = async (req, res) => {
  try {
    //get all posts
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toDateString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (mongoose.Types.ObjectId.isValid(_id)) {
    const updatePost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id, editedAt: new Date() },
      {
        new: true,
      }
    );

    res.json(updatePost);
  } else {
    res.status(404).send("No Post with that id");
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Item not Found");

  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "User not logged in" });
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Item not Found");
  const post = await PostMessage.findById(id);

  //check if user has already like this post
  const index = post.likes.findIndex((id) => id === String(req.userId));

  //if the id is there this is a dislike request

  if (index === -1) {
    // wants to like this post
    post.likes.push(req.userId);
  } else {
    // doesnt want to like this post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
