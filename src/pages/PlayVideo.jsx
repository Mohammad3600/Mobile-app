import React from 'react';
import {useState, useEffect} from "react";
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import {  Typography } from '@mui/material';
import { getVideoNameByPath } from '../utils/utiityFunctions';




const PlayVideo = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const video = searchParams.get('video');

  return (
    <div>
      
        <ReactPlayer
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            url={video}
            playing={true}
            width="100%"
            height="100%"
            controls
            
        />
        <Typography style={{wordBreak: "break-word"}} variant='h4'>{getVideoNameByPath(video)}</Typography>


    </div>
  )
}

export default PlayVideo;
