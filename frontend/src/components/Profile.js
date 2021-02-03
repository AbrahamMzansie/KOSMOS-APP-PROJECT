import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, userUpdateProfileReset } from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MuiAlert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import axios from "axios";
import Progress from "../components/Progress";

import EditProfile from "../components/EditProfile";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
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
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

dayjs.extend(relativeTime);
const Profile = ({ classes, history }) => {
  const [nameHandler, setNameHandler] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success,
    loading: loadingUserUpdateProfile,
    error: errorUserUpdateProfile,
  } = userUpdateProfile;

  useEffect(() => {
    /* if (!userInfo) {
      history.push("/login");
    } else {*/
      //////////////////////////////////////////////////////
  //  if (!user || !userInfo || user._id !== userInfo._id || !user.nameHandler) {
   //   dispatch(userUpdateProfileReset());
   //   dispatch(getUserDetails("profile"));
  //  } else {
  //    setNameHandler(user.nameHandler);
 //   }
    // }
    ////////////////////////////////////////////////////////
  }, [/*history, dispatch, userInfo, success, user*/]);

  const pictureEditHandler = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handlerImageChanger = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `/api/upload/${user._id}`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
      dispatch(getUserDetails("profile"));
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Progress size={100}></Progress>
      ) : (
        <>
          {!userInfo ? (
            <Paper className={classes.paper}>
              <Typography variant="body2" align="center">
                No Profile found, please login again
              </Typography>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/signin"
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/signup"
                >
                  Sign Up
                </Button>
              </div>
            </Paper>
          ) : (
            <>
              {error ? (
                <MuiAlert severity="error">{error}</MuiAlert>
              ) : (
                <>
                  {userInfo && user ? (
                    <Paper className={classes.paper}>
                      <div className={classes.profile}>
                        <div className="image-wrapper">
                          {!user.image ? (
                            <PersonOutlineIcon
                              color="primary"
                              className="profile-image"
                            />
                          ) : (
                            <img
                              className="profile-image"
                              component="img"
                              src={user.image}
                              alt="profile picture"
                            ></img>
                          )}

                          <input
                            hidden="hidden"
                            type="file"
                            id="imageInput"
                            onChange={handlerImageChanger}
                          ></input>
                          <Tooltip placement="top" title="edit profile picture">
                            <IconButton
                              className="button"
                              onClick={pictureEditHandler}
                            >
                              <EditIcon color="primary"></EditIcon>
                            </IconButton>
                          </Tooltip>
                        </div>
                        <hr />
                        <div className="profile-details">
                          <MuiLink
                            component={Link}
                            to={`/users/${user.nameHandler}`}
                            color="primary"
                            variant="h5"
                          >
                            @{user.nameHandler}
                          </MuiLink>
                          <hr />
                          {user.bio && (
                            <Typography variant="body2">{user.bio}</Typography>
                          )}
                          <hr />
                          {user.location && (
                            <>
                              <LocationOn color="primary"></LocationOn>
                              <span color="primary">{user.location}</span>
                              <hr></hr>
                            </>
                          )}
                          {user.website && (
                            <>
                              <LinkIcon color="primary" />
                              <a
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {" "}
                                {user.website}
                              </a>
                              <hr />
                            </>
                          )}
                          <CalendarToday color="primary" />{" "}
                          <span>
                            Joined {dayjs(user.createdAt).format("MMM YYYY")}
                          </span>
                        </div>
                        <EditProfile user={user} />
                      </div>
                    </Paper>
                  ) : (
                    <Paper className={classes.paper}>
                      <Typography variant="body2" align="center">
                        No Profile found, please login again
                      </Typography>
                      <div className={classes.buttons}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/signin"
                        >
                          Sign In
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          component={Link}
                          to="/signup"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </Paper>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
Profile.prototype = {};

export default withStyles(styles)(Profile);
