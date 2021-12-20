import { Box} from '@mui/system';
import { Grid } from "@mui/material";
import React from 'react'
import { useContext } from "react";
import GraphContext from '../context/GraphContext'
import Cell from './Cell';
import classnames from 'classnames';
import { withStyles } from '@mui/material/styles';

const classes = {
    root: {
      flexGrow: 1
    }
  };
  

function Graph() {
    
    const {graph} = useContext(GraphContext);
    return (
        <div className={classes.root}>
            <Grid container >
            {graph.map((row, rowIdx) => {
                return (
                    <Grid container item spacing={0} columns={30} key={rowIdx} xs = {30} sm = {60} wrap={"nowrap"}>
                    {row.map( (node, nodeIdx) => {
                        return (<Cell key= {`${rowIdx}_${nodeIdx}`} cell= {node}/>)
                    })}
                    </Grid>
                )
            })}
            </Grid>
            
        </div>
    )
}

export default Graph
