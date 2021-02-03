import React, { useState, useEffect, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import DeleteComment from "./DeleteComment";
import Progress from "../components/Progress";
import MuiAlert from "@material-ui/lab/Alert";
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  commentImage: {
    //  maxWidth: "100%",
    height: 50,
    width: 50,
    objectFit: "cover",
    // borderRadius: "50%",
    marginLeft: "30px",
  },
  commentData: {
    marginLeft: "50px",
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

  textField: {
    display: "flex",
  },
};
dayjs.extend(relativeTime);
const Comments = ({ stream, index, comments, classes, userHandle }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  return (
    <>
      <Grid  container>
        {comments &&
          comments.map((comment, commentIndex) => (
            <Fragment key={comment._id}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <Avatar
                      className={classes.commentImage}
                      alt="profile picture"
                      src={comment.user.image}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/user/${comment.user.nameHandler}`}
                      >
                        @{comment.user.nameHandler}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {dayjs(comment.createdAt).fromNow(
                          "h:mm a ,MMMM DD YYYY"
                        )}
                      </Typography>
                      <Typography variant="body1">{comment.body}</Typography>
                      {comment.commentLoading ? (
                        <Progress
                          className={classes.progress}
                          smallerSpinner
                          size={30}
                        ></Progress>
                      ) : user &&
                        comment.user &&
                        user.nameHandler === comment.user.nameHandler ? (
                        <DeleteComment
                          streamId={stream._id}
                          commentId={comment._id}
                          commentIndex={commentIndex}
                          index={index}
                        />
                      ) : null}
                      {comment.commentError && (
                        <MuiAlert severity="error">
                          {comment.commentError}
                        </MuiAlert>
                      )}
                      <hr className={classes.invisibleSeparator} />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator}></hr>
              )}
            </Fragment>
          ))}
      </Grid>
    </>
  );
};

export default withStyles(styles)(Comments);
