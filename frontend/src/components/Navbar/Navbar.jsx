import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import memories from "./../../images/memories.png";
import { Link } from "react-router-dom";
import useStyle from "./styles";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../redux/actions/authActions";
function Navbar(props) {
  const classes = useStyle();
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutAction());
  };
  // check if user token is expired
  const token = user?.token;
  if (token) {
    //decode token
    const decodedToken = decode(token);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(logOutAction());
    }
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              src={user.result.imageUrl}
              className={classes.purple}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" className={classes.userName}>
              {user.result.name}
            </Typography>
            <Button
              color="secondary"
              className={classes.logout}
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            color="primary"
            variant="contained"
            to="/auth"
            component={Link}
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
