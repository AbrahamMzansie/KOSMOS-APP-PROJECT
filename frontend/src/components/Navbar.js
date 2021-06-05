import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../actions/userAction";

import NotificationComponent from "./Notification";

import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Notifications from "@material-ui/icons/Notifications";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PostStream from "./PostStream";

const styles = {
  
  paper: {
    padding: 20,
  },
  profile: {
    /*
    "& .image-wrapper": {
      textAlign: "left",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "10%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      margin : 0,
      padding : 0
    },
    image: {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "green",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
    */
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

const Navbar = ({ classes }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLogin);
  const { userInfo } = userData;
  const userLogoutHandler = () => {
    dispatch(userLogout());
  };
  return (
    <AppBar>
      <ToolBar user={userInfo} className="nav-container">
        <div
          style={{
            backgroundColor: "white",
            textAlign: "left",
            left: "10%",
            padding: 0,
            margin: "-10",
            height: 50,
          }}
        >
          <img
            className={classes.profile}
            style={{
              width: 200,
              height: 50,
              objectFit: "cover",
              maxWidth: "100%",
              margin: "0",
              padding: 0,
              backgroundColor: "blue",
              backgroundColor: "white",
              marginBottom: 0,
            }}
            component="img"
            src="/images/kosmos-image-3.png"
            alt="profile picture"
          ></img>
        </div>
        <IconButton color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        {userInfo ? (
          <>
            <PostStream />
            <NotificationComponent />
            <Tooltip title="click the  icon to log off" placement="top">
              <IconButton
                component={Link}
                to="/"
                color="inherit"
                onClick={userLogoutHandler}
                className={classes.button}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signin">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              SignUp
            </Button>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
};

export default withStyles(styles)(Navbar);
