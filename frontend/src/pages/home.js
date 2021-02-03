import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { listStreams } from "../actions/streamActions";
import Stream from "../components/Stream";
import Progress from "../components/Progress";
import Profile from "../components/Profile";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from "@material-ui/lab/Alert";

const styles = {
  progress: {
    margin: "200px auto",
    textAlign: "center",
  },
};
const Home = ({ classes }) => {
  const dispatch = useDispatch();
  const streamList = useSelector((state) => state.streamList);
  const {
    loading,
    error,
    streams,
    loadingLike,
    loadingUnLike,
  } = streamList;
  useEffect(() => {
    dispatch(listStreams());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Progress className={classes.progress} size={100}></Progress>
      ) : (
        <>
          <Grid style={{ marginTop: "50px" }} container spacing={10}>
            <Grid item sm={8} xs={12}>
              {!streams && streams.length === 0 ? (
                <MuiAlert severity="info">Post main page is empty</MuiAlert>
              ) : null}
              {loading ? (
                <Progress size={100}></Progress>
              ) : error ? (
                <MuiAlert severity="error">{error}</MuiAlert>
              ) : (
                streams &&
                streams.map((stream, index) => (
                  <Stream
                    index={index}
                    stream={stream}
                    key={stream._id}
                    loadingLike={loadingLike}
                    loadingUnLike={loadingUnLike}
                  ></Stream>
                ))
              )}

              {streams.length === 0 && (
                <MuiAlert severity="info">Post main page is empty</MuiAlert>
              )}
            </Grid>
            <Grid item sm={4} xs={12}>
              <>
                <Profile />
              </>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(Home);
