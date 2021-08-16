import React from "react";
import useStyle from "./style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePostAction } from "../../../redux/actions/posts";
function Post({
  setCurrentId,
  post: {
    tags,
    creator,
    likes,
    title,
    _id,
    selectedFile,
    message,
    createdAt,
    name,
  },
}) {
  const user = useSelector((state) => state.auth.authData);
  const classes = useStyle();
  const dispatch = useDispatch();
  const LikesCount = () => {
    if (likes.length > 0) {
      return likes.find((like) =>
        like === (user?.result?.googleId || user?.result?._id) ? (
          <>
            <ThumbUpAltIcon fontSize="small" /> ;
            {likes.length > 2
              ? `You and ${likes.length - 1} others `
              : `${likes.length} like ${likes.length > 1 ? "s" : ""}`}
          </>
        ) : (
          <>
            <ThumbUpAltIcon fontSize="small" />{" "}
            {likes.length === 1 ? "like" : "likes"}
          </>
        )
      );
    }
    return (
      <>
        <ThumbUpAltIcon fontSize="small" /> like
      </>
    );
  };
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === creator ||
        user?.result?._id === creator) && (
        <div className={classes.overlay2}>
          <Button
            onClick={() => setCurrentId(_id)}
            size="small"
            style={{ color: "white" }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography color="textSecondary" variant="body2">
          {tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography gutterBottom className={classes.title} variant="h5">
        {title}
      </Typography>
      <CardContent>
        <Typography component="p" color="textSecondary" variant="body2">
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          color="primary"
          size="small"
          disabled={!user?.result}
          onClick={() => dispatch(likePostAction(_id))}
        >
          <ThumbUpAltIcon fontSize="small" /> like {likes.length}
        </Button>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            color="primary"
            size="small"
            onClick={() => dispatch(deletePost(_id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
