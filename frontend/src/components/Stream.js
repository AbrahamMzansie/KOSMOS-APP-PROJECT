import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import StreamFooter from "./StreamFooter";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DeleteScream from "./DeleteScream";
import CommentForm from "./CommentForm";
import ScreamAccordion from "./ScreamAccordion";
import MuiAlert from "@material-ui/lab/Alert";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Progress from "./Progress";

const styles = {
  card: {
    display: "flex-wrap",
    marginBottom: "20px",
    position: "relative",
    width: "100%",
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
  body: {
    height: "100px",
    maxHeight: "400px",
    resize: "vertical",
    overflow: "auto",
  },
};
dayjs.extend(relativeTime);
const Stream = ({ stream, index, classes }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {stream.loadingDelete ? (
          <Progress
            className={classes.progress}
            smallerSpinner
            size={50}
          ></Progress>
        ) : user && user.nameHandler === stream.userHandle ? (
          <DeleteScream index={index} streamId={stream._id} />
        ) : null}
        {stream.errorDelete && (
          <MuiAlert severity="error">{stream.errorDelete}</MuiAlert>
        )}
        <br />
        <CardMedia
          className={classes.image}
          component="img"
          alt="profile image"
          height="140"
          image={stream.image}
          title="profile image"
        />
        <Typography
          noWrap={true}
          color="primary"
          variant="h5"
          component={Link}
          to={`/user/${stream.userHandle}`}
        >
          {stream.userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(stream.createdAt).fromNow()}
        </Typography>
        <Typography className={classes.body} variant="body1">
          {stream.body}
        </Typography>
        <StreamFooter
          index={index}
          showScreamDetailIcon
          stream={stream}
          key={stream._id}
        />
        <CommentForm stream={stream}></CommentForm>
        <ScreamAccordion index={index} stream={stream} />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Stream);
