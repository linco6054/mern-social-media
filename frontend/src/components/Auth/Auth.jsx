import React, { useState } from "react";
import useStyle from "./styles";
import {
  Avatar,
  Paper,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import Input from "./Input";
import { useDispatch } from "react-redux";
import CONSTANTS from "../../redux/constants";
import {
  authAction,
  signUpAction,
  signInAction,
} from "../../redux/actions/authActions";
import { useHistory } from "react-router-dom";

export default function Auth() {
  const dispatch = useDispatch();
  const [showPassword, setShoePassword] = useState(false);
  const classes = useStyle();
  const history = useHistory();
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({});
  const handleShowPassword = () => {
    setShoePassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUpAction(formData, history));
    } else {
       dispatch(signInAction(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const tokenDetails = res?.tokenObj;
    console.log(res);
    try {
      dispatch(authAction({ result, token, tokenDetails }));
      history.push("/");
    } catch (error) {}
  };
  const googleFailure = (res) => {
    console.log(res);
  };

  return (
    <Container className="conrolWidth" component="main" maxwidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  handleChange={handleChange}
                  label="First Name"
                  name="firstName"
                  autoFocus
                  half
                  type="text"
                />

                <Input
                  handleChange={handleChange}
                  label="Last Name"
                  name="lastName"
                  half
                  type="text"
                />
              </>
            )}
            <Input
              type="email"
              handleChange={handleChange}
              name="email"
              label="Email"
            />
            <Input
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              name="password"
              label="password"
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
                name="confirmPassword"
                label="Confirm Password "
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          <Button
            type="submit"
            color="primary"
            className={classes.submit}
            fullWidth
            variant="contained"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="59747732126-g40mssl1d6vasd6builov21a9tpubmbd.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                color="primary"
                fullWidth
                disabled={renderProps.disabled}
                className={classes.googleButton}
                // startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={() => setIsSignup(!isSignup)}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Dont have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
