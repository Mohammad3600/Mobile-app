import React from 'react';
import {useState} from "react";
import { useHistory,  useParams } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import {appURLS} from "../constants";
import { Grid, Typography, FormControl, FilledInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import foldersData from '../folderList/folders.json';
import VideocamIcon from '@mui/icons-material/Videocam';


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        maxWidth: "40rem",
        margin: "auto",
        marginTop: "5rem",
        padding: "1.5rem",
        "& .icon": {
            fontSize: "1.5rem"
        },
        "& .list":{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
        },
        "& .title": {
            textTransform: "uppercase",
            textShadow: "0px 1px rgba(0, 0, 0, 0.25)"        
        },
        "& .red": {
            color: "#F82020",
        },
        "& .violet": {
            color: "#6B68FA"
        }
    }
});


const ConceptsList = () => {
    const classes = useStyles();
    const history = useHistory();
    const {subject} = useParams();
    const [videos, setVideos] = useState([]);

    const onVideoClick = (video) => {
        history.push(`${appURLS.PLAY}?video=${video}`);
    }

  return (
    <div className={classes.container}>

        <FormControl variant="outlined" sx={{marginBottom: "1rem"}}>
          <FilledInput
            type={"text"}
            label="Search"
            placeholder='Search'
            startAdornment={<SearchIcon />}
          />
        </FormControl>
      
      {foldersData?.[subject]?.map((folder, index) => (
        <>
            <Typography key={folder.name}  variant='h6' className='title red' mt={1}>{folder.name}</Typography>
            {
                folder?.files?.map(file => <div className='list cursor-pointer' key={file}>
                        <VideocamIcon style={{fontSize: "1.75rem"}} />
                        <Typography  variant='h6' className='title'>{file}</Typography>
                    </div>)
            }
            <Typography key={folder.name}  variant='h6' className='title violet cursor-pointer' mt={1}>{folder.name} - Mock Test</Typography>


        </>
    ))}
    </div>
  )
}

export default ConceptsList;
