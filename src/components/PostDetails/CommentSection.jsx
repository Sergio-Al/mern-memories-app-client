import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core";

import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          lg={4}
          style={{ height: "200px", overflowY: "auto" }}
        >
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]} </strong>
              {comment.split(": ")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label={!user?.result?.name ? "Login to write" : "Comment"}
            disabled={comment || !user?.result?.name}
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment || !user?.result?.name}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            {!user?.result?.name ? "login to comment" : "Comment"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CommentSection;
