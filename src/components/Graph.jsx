import { Box} from '@mui/system';
import { Grid } from "@mui/material";
import React from 'react'
import { useContext } from "react";
import GraphContext from '../context/GraphContext'
import Cell from './Cell';

function Graph() {
    
    const {graph} = useContext(GraphContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            {graph.map((row, rowIdx) => {
                return (
                    <Grid container spacing={0} columns={30} key={rowIdx}>
                    {row.map( (node, nodeIdx) => {
                        return (<Cell key= {`${row}_${nodeIdx}`} cell= {node}/>)
                    })}
                    </Grid>
                )
            })}
        </Box>
    )
}

export default Graph
