import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyle from "./style";
import { Grid, CircularProgress } from "@material-ui/core";
function AllPosts({ setCurrentId, currentId }) {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.container} spacing={3} alignItems="stretch">
      {posts &&
        posts.map((post) => (
          <Grid sm={6} xs={12} item key={post._id}>
            <Post setCurrentId={setCurrentId} post={post} />
          </Grid>
        ))}
    </Grid>
  );
}

export default AllPosts;
