import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import { IonContent } from '@ionic/react';
import { useLocation } from "react-router";
import { appURLS } from "../constants";
import MenuIcon from '@mui/icons-material/Menu';


const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: "4.5rem",
    background: "#007bff",
    color: "#fff",
    padding: "0 1rem",
    gap: "5px",
  },
  circle1: {
    position: "absolute",
    height: "10rem",
    width: "10rem",
    left: "-3rem",
    top: "-2rem",
    background: theme.palette.secondary.main,
    borderRadius: "50%",
  },
  circle2: {
    position: "absolute",
    height: "12rem",
    width: "12rem",
    left: "0",
    top: "-7rem",
    background: theme.palette.secondary.main,
    borderRadius: "50%",
    mixBlendMode: "multiply"
  },
  menuIcon: {
    position: "absolute",
    zIndex: 1000,
    left: "1rem",
    top: "1rem",
    cursor: "pointer"
  },
  children: {
    position: "relative",
    top: "6%"
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const currentPath = location.pathname;

  return <IonContent style={{display: "contents"}} className={classes.layout} id="layout">
    <div className={classes.circle1}  />
    <div className={classes.circle2}   />
    {
      currentPath !== appURLS.LOGIN ? <MenuIcon style={{fontSize: "2.5rem"}} className={classes.menuIcon} /> : null
    }
    <div className={classes.children}>
      {props.children}
    </div>
  </IonContent>;
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;


  
