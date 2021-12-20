import React from 'react'
import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useContext } from "react";
import GraphContext from '../context/GraphContext'

function Cell({cell}) {

    const {toggleNodeIfMouseIsDown, setMouseIsUp, handleMouseDown} = useContext(GraphContext);
    
    const finishCellStyle = { width: 25,
        height: 25,
        border: "1px solid rgb(175, 216, 248)",
        backgroundColor: "#a31212",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },}
    
    const startCellStyle = {width: 25,
            height: 25,
            border: "1px solid rgb(175, 216, 248)",
            backgroundColor: "#3b9c2f",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },};

    const wallCellStyle = {width: 25,
        height: 25,
        border: "1px solid rgb(175, 216, 248)",
        backgroundColor: "#4f5659",
        "&:hover": {
          backgroundColor: "#4f5659",
          opacity: [0.9, 0.8, 0.7],
            },};

    const emptyCellStyle = {
        width: 25,
        height: 25,
        border: "1px solid rgb(175, 216, 248)",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }

    const renderCell = () => {
        let style = emptyCellStyle;
        let children = <></>
        if (cell.isEnd) {
            style = finishCellStyle
            children = <AdjustIcon></AdjustIcon>
          } else if (cell.isStart) {
              style = startCellStyle
              children = <ArrowForwardIosIcon></ArrowForwardIosIcon>
          } else if (cell.isWall) {
              style = wallCellStyle
          } 
          return (
            <Grid
            item
            xs={0}
            sx={style}
            alignItems="center"
            onMouseDown={() => handleMouseDown(cell)}
            onMouseEnter={()=> toggleNodeIfMouseIsDown(cell)}
            onMouseUp={setMouseIsUp}
          >
            {children}
          </Grid>
        )
    }
    
    return (
        renderCell()
    )
}

export default Cell
