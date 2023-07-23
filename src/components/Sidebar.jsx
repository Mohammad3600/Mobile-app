import { makeStyles } from "@mui/styles";
import { menuItems } from '../constants';
import React,{useState} from "react";
import { Grid, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import profile from '../assets/profile.png';
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Customize the background color and transparency
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        visibility: "hidden",
        '& .profile': {
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #000",
            padding: "1rem 0.25rem"
        },
        '& .student-details': {
            display: "flex",
            flexDirection: "column",
        }
    },
    sideBar: {
        position: "fixed",
        width: "22rem",
        left: "-22rem",
        top: 0,
        height: "100vh",
        background: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        zIndex: 10000,
        transition: "left 0.3s ease-in-out",
    },
    openSideBar: {
        left: 0
    },
    visible: {
        visibility: "initial"
    },
    textStyle: {
        textTransform: "uppercase",
        padding: "0.25rem 0.75rem",
        textShadow: "0px 2px rgba(0, 0, 0, 0.25)",
    },
    menu: {
        display: "flex",
        gap: "0.5rem",
        position: "fixed",
        left: "1rem",
        zIndex: 100000,
        "& .icon": {
            cursor: "pointer"
        },
        
      },
      studentName: {
        fontSize: "1.05rem !important"
      },
      profileImgStyles: {
        width: "40%"
      },
      menuItems: {
        "& p": {
            padding: "0.75rem",
        }
      },
}));

const studentsDetails = {
    name: "FAIZAN AHMED KHAN",
    school: "JAME-UL-ULOOM",
    standard: "CLASS X"
}

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const openPopup = () => setOpen(true);
    const closePopup = () => setOpen(false);
    const history = useHistory();

    const handleRouteChange = (e, path) => {
        e.preventDefault();
        history.push(path);
    }

    return <> <div className={`${classes.background} ${open ? classes.visible : ""}`} onClick={closePopup}>
            <div className={`${classes.sideBar} ${open ? classes.openSideBar : ""}`}>   
                <div className="profile">
                    <img src={profile} alt="profile" className={classes.profileImgStyles} />
                    <div className="student-details">
                        <Typography variant="body1" className={`${classes.textStyle} ${classes.studentName} fw-700`}>{studentsDetails.name}</Typography>
                        <Typography variant="body1" className={`${classes.textStyle} fw-600`}>{studentsDetails.school}</Typography>
                        <Typography variant="body1" className={`${classes.textStyle} fw-600`}>{studentsDetails.standard}</Typography>
                    </div>
                </div>
                <div className={classes.menuItems}>
                    {
                        menuItems.map((item) => <Typography key={item.name} variant="h6" className={`${classes.textStyle} cursor-pointer`} onClick={(e) => handleRouteChange(e, item.url)}>{item.name}</Typography>)
                    }
                </div>
            </div>
        </div> : 
        {!open && <div className={classes.menu}>
            <MenuIcon style={{fontSize: "2.5rem"}} className={"icon"} onClick={openPopup} />
            <Typography variant="h6" className={classes.textStyle}>{location.pathname.split("/").pop()}</Typography>
        </div>}
        </>
        
}

export default Sidebar
