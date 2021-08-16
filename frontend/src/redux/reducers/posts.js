import CONSTANTS from "../constants";

export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case CONSTANTS.post.FETCH_POSTS:
      return action.payload;
    case CONSTANTS.post.CREATE_POSTS:
      return [...posts, action.payload];
    case CONSTANTS.post.UPDATE_POST_SPECIFIC:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CONSTANTS.post.DELETE_POSTS:
      return posts.filter((post) => post._id !== action.payload);

    case CONSTANTS.post.LIKE_POSTS:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};

//
