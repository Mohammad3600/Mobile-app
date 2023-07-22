import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {Typography} from "@mui/material";
import { useHistory } from 'react-router-dom';
import { appURLS, availableSubjects} from "../constants";

const useStyles = makeStyles({
  card: {
    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2);",
    // padding: "2rem",
    cursor: "pointer",
    borderRadius: "20px",
    "&:hover": {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
    }
  },
  imgStyles: {
    width: "12rem"
  },
  container: {
    maxWidth: "40rem",
    margin: "auto",
    marginTop: "3rem",
    "& *": {
      margin: "1rem"
    }
  },
  subjectName: {
    textTransform: "uppercase",
    fontWeight: "600 !important",
    letterSpacing: "0.12rem !important"
  }
});



const Subjects = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSubjectClick = (path) => {
    history.push(`${appURLS.COURSE}${path}`);
  };

  return (
    <Grid container alignItems="center" className={classes.container}>
      { availableSubjects.map((subject) => <Grid direction={"column"} key={subject} container item xs={6} md={6} className={classes.card} alignItems="center" justifyContent={"center"} onClick={() => onSubjectClick(subject.redirection)}>
        <img src={subject.icon} alt={subject.SubjectName} className={classes.imgStyles}  />
        <Typography variant="body1" className={classes.subjectName}>{subject.SubjectName}</Typography>
      </Grid>
      )}
    </Grid>
  );
};

export default Subjects;
