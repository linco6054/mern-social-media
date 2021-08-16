import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {
  Grid,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
function Input({
  half,
  name,
  label,
  autoFocus,
  handleShowPassword,
  type,
  handleChange,
}) {
  return (
    <Grid item sm={half ? 6 : 12} xs={12}>
      <TextField
        required
        fullWidth
        label={label}
        name={name}
        onChange={handleChange}
        variant="outlined"
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}

export default Input;
