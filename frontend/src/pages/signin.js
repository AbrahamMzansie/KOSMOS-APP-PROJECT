import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import AppIcon from "../image/icon.png";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "10px auto 10px auto",
    width: "50px",
  },
  textField: {
    display: "flex",
    margin: "10px auto 10px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: "20px",
    position: "relative",
  },
  error: {
    color: "red",
    fontSize: "0.8em",
  },
  progress: {
    position: "absolute",
  },
}
const Signin = ({ classes, location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userData;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
       history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  const signInHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image}></img>
        <Typography variant="h4" className={classes.pageTitle}>
          Sign In
        </Typography>
        {error && (
          <Typography variant="h4" className={classes.error}>
            {error}
          </Typography>
        )}
        <form noValidate onSubmit={signInHandler} autoComplete="off">
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button onClick = {signInHandler}
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign In
            {loading && (
              <div className={classes.progress}>
                <CircularProgress color="primary" size={30} />
              </div>
            )}
          </Button>
          <br></br>
          <p>
            Don't have account ? Sign up <Link to="/signup">Here</Link>
          </p>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);
