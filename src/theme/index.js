import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F15858', // Custom primary color
    },
    secondary: {
      main: '#F2ACAC', // Custom secondary color
    },
    error: {
      main: '#ff0000', // Custom error color
    },
    warning: {
      main: '#ff9800', // Custom warning color
    },
    info: {
      main: '#2196f3', // Custom info color
    },
    success: {
      main: '#4caf50', // Custom success color
    },
    text: {
      primary: '#333333', // Custom primary text color
      secondary: '#777777', // Custom secondary text color
    },
    background: {
      default: '#ffffff', // Custom default background color
    },
  },

  typography: {
 

    h2: {
      fontSize: "2rem",
      color: "#000",
      textShadow: "0px 2px rgba(0, 0, 0, 0.25)",
      fontWeight: 700
    },
    subtitle1: {
      color: "#000",
      fontSize: "0.75rem"
    },
    button:{
      color: "#F15858",
      fontSize: "1rem",
      textTransform: "capitalize",
      cursor: "pointer"
    },
    // body1:{
    //   color: "#F15858",
    //   fontSize: "1.5rem"
    // }
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          fontWeight: 600,
          fontSize: 12,
          textTransform: "capitalize"
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // Remove border and outline styles
          border: 'none',
          outline: 'none',
          // Remove highlight color on focus
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          // Add your custom styles here
          borderColor: 'none', // Example: changing the border color to blue
          // '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          //   borderColor: 'green', // Example: changing the border color on hover
          // },
          outline: 'none',
          borderRadius: "100px",
          background: "rgba(241, 88, 88, 0.40);",
          notchedOutline: {
            // Remove the additional outline border added by outlined variant
            borderColor: 'transparent',
          },
          '&::after': {
            display: "none"
          },
          '&::before': {
            display: "none"
          },
          '&:focus': {
            background: '#F15858'
          }
        
        },
    }
  },
    
    // ... other component overrides
  },
});

export default theme;