import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  FilledInput,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { appURLS } from "../constants";
import logo from "../assets/logo.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    
    <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"} spacing={2} xs={12} mt={4}>
      
      <Grid item>
        <div className="d-flex flex-column align-items-center">
          <img src={logo} alt="logo" />
          <Typography variant="h2">IQUAIS</Typography>
          <Typography variant="subtitle1">LEARNING STAYS LIFETIME....</Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={6} lg={4} >
        <FormControl variant="outlined" sx={{minWidth: "18rem"}}>
          <InputLabel>Email</InputLabel>
          <FilledInput
            type={"text"}
            label="Email"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={4} >
        <FormControl variant="outlined" sx={{minWidth: "18rem"}}>
          <InputLabel>Password</InputLabel>
          <FilledInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
      <Grid item>
            <Button variant="contained" color="primary" onClick={()=>  history.push(`${appURLS.SUBJECTS}`)}>LOGIN</Button>
      </Grid>
      <Grid item>
        <Typography variant="button">Forgot Password?</Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
