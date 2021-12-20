import React from 'react'
import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdjustIcon from "@mui/icons-material/Adjust";

function Cell({cell}) {
    
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
        if (cell.isFinish) {
            return (
              <Grid
                item
                xs={0}
                sx={finishCellStyle}
                alignItems="center"
              >
                <AdjustIcon></AdjustIcon>
              </Grid>
            );
          } else if (cell.isStart) {
            return (
              <Grid
                item
                xs={0}
                sx={startCellStyle}
                alignItems="center"
              >
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
              </Grid>
            );
          } else if (cell.isWall) {
            return (
              <Grid
                item
                xs={0}
                sx={wallCellStyle}
                alignItems="center"
              ></Grid>
            );
          } else {
            return (
              <Grid
                item
                xs={0}
                sx={emptyCellStyle}
                alignItems="center"
              ></Grid>
            );
          }
    }
    
    return (
        renderCell()
    )
}

export default Cell
