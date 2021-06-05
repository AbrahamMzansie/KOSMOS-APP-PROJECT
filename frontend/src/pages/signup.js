import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../actions/userAction";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from "@material-ui/lab/Alert";
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
};
const SignUp = ({ classes, location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameHandler, setNameHandler] = useState("");
  const [message , setMessage] = useState("");
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = registerData;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else {
      history.push("/signup");
    }
  }, [history, redirect, userInfo, dispatch]);
  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match!")
    } else {
      dispatch(userRegister(nameHandler, email, password));
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image}></img>
        <Typography variant="h4" className={classes.pageTitle}>
          Sign Up
        </Typography>
        {message &&(<MuiAlert severity="error">{message}</MuiAlert>)}
        {error && (
          <Typography variant="h4" className={classes.error}>
            {error}
          </Typography>
        )}
        <form noValidate onSubmit={registerHandler} autoComplete="off">
          <TextField
          required
            id="email"
            type="email"
            name="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            id="name"
            type="text"
            name="fullName"
            label="Full Name"
            className={classes.textField}
            value={nameHandler}
            onChange={(e) => setNameHandler(e.target.value)}
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
          <TextField
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="confirm Password"
            className={classes.textField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></TextField>
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
            {loading && (
              <div className={classes.progress}>
                <CircularProgress color="primary" size={30} />
              </div>
            )}
          </Button>
          <br></br>
          <small>
            Existing User ? Sign in <Link to="/signin">Here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
