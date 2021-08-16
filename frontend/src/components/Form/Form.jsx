import React, { useState, useEffect } from "react";
import useStyle from "./style";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost } from "../../redux/actions/posts";
function Form({ setCurrentId, currentId }) {
  const [postData, setPostData] = useState({});
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const user = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();
  const classes = useStyle();
  const clear = () => {
    setCurrentId(null);
    setPostData(null);
  };
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    //clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? "Eddit" : "Create"} a memory
        </Typography>

        <TextField
          required
          fullWidth
          label="title"
          name="title"
          variant="outlined"
          value={postData && postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required
          fullWidth
          label="Message"
          name="message"
          variant="outlined"
          value={postData && postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          required
          fullWidth
          label="Tags"
          name="tags"
          variant="outlined"
          value={postData && postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          type="submit"
          className={classes.buttonSubmit}
        >
          Submit
        </Button>
        <Button
          fullWidth
          size="small"
          color="secondary"
          variant="contained"
          onClick={clear}
          className={classes.buttonSubmit}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
