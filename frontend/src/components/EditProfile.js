import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  getUserDetails,
  userUpdateProfileReset,
} from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  
  textField : {
      display : "flex"
  }
};

const EditProfile = ({ classes, user }) => {
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [open, setOpen] = useState(false);
  const [nameHandler, setNameHandler] = useState("");
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading: loading, error: error } = userUpdateProfile;
  const mapUserDetailsToState = (userDetails) => {
    if (userDetails) {
      setBio(userDetails.bio ? userDetails.bio : "");
      setLocation(userDetails.location ? userDetails.location : "");
      setWebsite(userDetails.website ? userDetails.website : "");
    }
  };
  useEffect(() => {
    if (!user || !user.nameHandler) {
      dispatch(userUpdateProfileReset());
      dispatch(getUserDetails("profile"));
    } else {
      setNameHandler(user.nameHandler);
    }
  }, [dispatch, success, user]);

  const openHandler = () => {
    setOpen(true);
    mapUserDetailsToState(user);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  const editProfileHandler = () => {
    dispatch(updateUserProfile({ bio, location, website }));
    dispatch(getUserDetails("profile"));
    setOpen(false);
  };

  return (
    <>
    <div style = {{textAlign : "center"}}>
    <Tooltip title="Edit details" placement="top">
        <IconButton onClick={openHandler} className={classes.button}>
          <EditIcon color="primary"></EditIcon>
        </IconButton>
      </Tooltip>
    </div>
      
      <Dialog fullWidth maxWidth="sm" open={open} onClose={closeHandler}>
        <DialogTitle>Edit Your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              label="Bio"
              type="text"
              multiline
              fullWidth
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.TextField}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></TextField>
            <TextField
              name="website"
              label="Website"
              type="text"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            ></TextField>
            <TextField
              name="location"
              label="Location"
              type="text"
              placeholder="Where you live?"
              className={classes.textField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button onClick={editProfileHandler} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditProfile);
