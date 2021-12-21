import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useContext } from "react";
import GraphContext from '../context/GraphContext'

const useStyles = makeStyles({
    appbar: {
        alignItems: 'center',
    }
  });

function NavBar() {
    
    const classes = useStyles();
    const {handleVisualize} = useContext(GraphContext);
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Button color="inherit" variant="outlined"
          style={{
            borderRadius: 35,
            backgroundColor: "#21b6ae",
            padding: "18px 36px",
            fontSize: "18px"
        }}
        variant="outline"
        onClick={handleVisualize}
          >Visualize</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar
