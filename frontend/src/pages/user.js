import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUserStreams } from "../actions/streamActions";
import Stream from "../components/Stream";
import Grid from "@material-ui/core/Grid";

import Progress from "../components/Progress";
import StaticProfile from "../components/StaticProfile";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from "@material-ui/lab/Alert";

const styles = {
  progress: {
    margin: "200px auto",
    textAlign: "center",
  },
};
const User = (props, classes) => {
    const user = props.match.params.userHandler;
  const dispatch = useDispatch();
  const streamList = useSelector((state) => state.streamList);
  const { loading, error, streams,selectedUser, loadingLike, loadingUnLike } = streamList;
  useEffect(() => {
    dispatch(listUserStreams(user));
  }, [dispatch ,user]);
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
                <MuiAlert severity="info">No post available!!</MuiAlert>
              )}
            </Grid>
            <Grid item sm={4} xs={12}>
              <>
                <StaticProfile loading = {loading} error = {error} user = {selectedUser} />
              </>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(User);
