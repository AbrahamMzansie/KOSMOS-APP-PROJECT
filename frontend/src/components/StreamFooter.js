import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Badge from "@material-ui/core/Badge";
import StreamDialog from "../components/StreamDialog";
import Progress from "../components/Progress";
import { likeStream, unlikeStream } from "../actions/streamActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: "20px",
    position: "relative",
  },
  image: {
    minWidth: "200px",
    margin: "10px",
    width: "200px",
  },
  content: {
    padding: "25px",
    objectFit: "cover",
  },
};
const StreamFooter = ({ showScreamDetailIcon, stream, index, classes }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const streamList = useSelector((state) => state.streamList);
  const { errorLikeStream } = streamList;
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  const likeStreamHandler = (streamID) => {
    dispatch(likeStream(streamID, index));
  };
  const unLikeStreamHandler = (streamID) => {
    dispatch(unlikeStream(streamID, index));
  };
  const likedStream = () => {
    if (user) {
      if (
        user.likes &&
        user.likes.find((like) => like.streamId === stream._id)
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <>
      {user ? (
        <>
        {stream.errorLike &&(
          <MuiAlert severity="error">{stream.errorLike}</MuiAlert>
        )}
          {likedStream() ? (
            <>
              {stream.loadingLike ? (
                <div className={classes.progress}>
                  <CircularProgress color="primary" size={30} />
                </div>
              ) : (
                <Tooltip title="unlike a post" placement="top">
                  <IconButton
                    onClick={() => unLikeStreamHandler(stream._id , index)}
                    className={classes.button}
                  >
                    <Badge
                      className={classes.badge}
                      badgeContent={stream.likesCount}
                      color="secondary"
                    >
                      <ThumbDownIcon color="primary"></ThumbDownIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </>
          ) : (
            <>
            
              {stream.loadingLike ? (
                <div className={classes.progress}>
                  <CircularProgress color="primary" size={30} />
                </div>
              ) : (
                <Tooltip title="like post" placement="top">
                  <IconButton
                    onClick={() => likeStreamHandler(stream._id, index)}
                    className={classes.button}
                  >
                    <Badge
                      className={classes.badge}
                      badgeContent={stream.likesCount}
                      color="secondary"
                    >
                      <ThumbUpAltIcon color="primary"></ThumbUpAltIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
          {!stream.loadingLike && (
            <Tooltip title="add comment" placement="top">
              <IconButton className={classes.button}>
                <Badge badgeContent={stream.commentCount} color="secondary">
                  <ChatIcon color="primary"></ChatIcon>
                </Badge>
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : null}
      {showScreamDetailIcon === true && (
        <StreamDialog
          style={{ display: showScreamDetailIcon ? "inline-block" : "none" }}
          streamData={stream}
          userHandler={stream.userHandle}
        />
      )}
    </>
  );
};

export default withStyles(styles)(StreamFooter);
