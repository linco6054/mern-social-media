import * as api from "../../api";
import CONSTANTS from "./../constants";
//action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: CONSTANTS.post.FETCH_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (postData) => async (dispatch) => {
  console.log(postData);

  try {
    const { data } = await api.createPost(postData);
    dispatch({
      type: CONSTANTS.post.CREATE_POSTS,
      payload: data,
    });
    console.log("postData");
  } catch (error) {
    console.log("error");
    console.log(error.message);
  }
};

//
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log(data);
    dispatch({
      type: CONSTANTS.post.UPDATE_POST_SPECIFIC,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: CONSTANTS.post.DELETE_POSTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePostAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: CONSTANTS.post.LIKE_POSTS, payload: data });
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};
