import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";

import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { deleteComment } from "../actions/streamActions";
const styles = {
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};
const DeleteComment = ({ streamId , commentId, commentIndex, index, classes }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  const deleteCommentHandler = () => {
    const data = {
      commentId,
      streamId,
      commentIndex,
      index,
    };
    dispatch(deleteComment(data));
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Delete scream" placement="top">
        <IconButton onClick={openHandler} className={classes.buttons}>
          <DeleteOutline color="secondary"></DeleteOutline>
        </IconButton>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={closeHandler}>
        <DialogTitle>
          <strong>Delete Comment ?</strong>
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCommentHandler} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(DeleteComment);
