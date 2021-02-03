import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { createComment } from "../actions/streamActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Progress from "../components/Progress";

const styles = {
  textField: {
    display: "flex",
    margin: "10px auto 10px auto",
  },
  invisibleSeparator: {
    border: "none",
    margin: "4px",
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1 px solid rgba(0,0,0,0.1",
    marginBottom: "20px",
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};
const CommentForm = ({ stream, classes }) => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const streamData = useSelector((state) => state.streamList);
  const { loadingCreateComment, errorCreateComment, page, pages } = streamData;

  const post = {
    body: body,
  };
  const createCommentHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(stream._id, post));
    setBody("");
  };
  return (
    <>
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={createCommentHandler}>
          <TextField
          multiline
          fullWidth
          rows="3"
            name="body"
            type="text"
            label="Comment on screem"
            placeholder="Enter Your Comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={classes.textField}
          ></TextField>
          {}
          {loadingCreateComment ? (
            <Progress size={40}></Progress>
          ) : (
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          )}
        </form>
        <hr className={classes.visibleSeparator}></hr>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CommentForm);
