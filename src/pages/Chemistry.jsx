import React from 'react';
import {useState, useEffect} from "react";
import ReactPlayer from 'react-player';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import {appURLS} from "../constants";
import { Grid, Typography } from '@mui/material';
import { getVideoNameByPath } from '../utils/utiityFunctions';


const useStyles = makeStyles({
    player: {
      display: "flex",
      padding: "1rem",
      gap: "1rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2);",
      cursor: "pointer",
      borderRadius: "8px"
    },
  });


const Chemistry = () => {
    const classes = useStyles();
    const history = useHistory();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const importVideos = async () => {
          const videoFiles = await importAll(require.context('../videos/chemistry', false, /\.(mp4|mov|avi)$/)); // Adjust the path and file extensions as per your video files
          setVideos(videoFiles);
          console.log(videoFiles);
        };
    
        importVideos();
      }, []);

      const importAll = (requireContext) => {
        return requireContext.keys().map(requireContext);
      };

      const onVideoClick = (video) => {
        history.push(`${appURLS.PLAY}?video=${video}`);
      }

  return (
    <Grid container direction={"column"} spacing={2} mt={1}>
      
      {videos.map((video, index) => (
        <Grid  item key={video} onClick={() => onVideoClick(video)} className={classes.player}>
                <ReactPlayer
                    style={{marginLeft: "1rem"}}
                    url={video}
                    width='30%'
                    height='30%'
                />
                <Typography style={{wordBreak: "break-word"}} variant='h5'>{getVideoNameByPath(video)}</Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default Chemistry;
