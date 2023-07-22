import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from 'prop-types';
import { IonContent } from '@ionic/react';
import { useLocation } from "react-router";
import { appURLS } from "../constants";
import Sidebar from "./Sidebar";


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
    height: "12rem",
    width: "12rem",
    left: "-3rem",
    top: "-2rem",
    background: theme.palette.secondary.main,
    borderRadius: "50%",
  },
  circle2: {
    position: "absolute",
    height: "14rem",
    width: "18rem",
    left: "0",
    top: "-7rem",
    background: theme.palette.secondary.main,
    borderRadius: "50%",
    mixBlendMode: "multiply"
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
      currentPath !== appURLS.LOGIN ? <Sidebar /> : null
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


  
