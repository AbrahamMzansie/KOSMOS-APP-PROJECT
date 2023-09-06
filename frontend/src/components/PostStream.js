import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createStream } from "../actions/streamActions";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Progress from "../components/Progress";
import MuiAlert from "@material-ui/lab/Alert";
import { STREAM_CREATE_RESET } from "../constants/streamConstants";

const styles = {};
const PostStream = (classes) => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const streamList = useSelector((state) => state.streamList);
  const {
    loadingCreateStream,
    errorCreateStream,
    streams,
    page,
    pages,
  } = streamList;
  useEffect(() => {}, [dispatch, errorCreateStream]);
  const openHandler = () => {
    setOpen(true);
    dispatch({ type: STREAM_CREATE_RESET });
    
  };
  const closeHandler = () => {
    setOpen(false);
    dispatch({ type: STREAM_CREATE_RESET });
  };
  const post = {
    body: body,
  };

  const createNewStreamHandler = (e) => {
    e.preventDefault();
    dispatch(createStream(post));
    setOpen(false);
    setBody("");
  };
  return (
    <>
      <Tooltip title="Post a New Scream" placement="top">
        <IconButton
          color="inherit"
          onClick={openHandler}
          className={`${classes.button} navBar__icon`}
        >
          <AddIcon></AddIcon>
          <span>Add Post</span>
        
        </IconButton>
      </Tooltip>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={errorCreateStream ? close : open}
        onClose={closeHandler}
      >
        {loadingCreateStream ? (
          <>
            <Progress size={100}></Progress>
          </>
        ) : errorCreateStream ? (
          <MuiAlert severity="error">{errorCreateStream}</MuiAlert>
        ) : (
          <>
            <DialogTitle>
              <strong>Create A New Scream</strong>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={createNewStreamHandler}>
                <TextField
                  name="body"
                  label="SCREAM!!"
                  type="text"
                  multiline
                  fullWidth
                  
                  rows="3"
                  placeholder="Scream at your fellow friends"
                  className={classes.TextField}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></TextField>
              </form>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={createNewStreamHandler} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(PostStream);
