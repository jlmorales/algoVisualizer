import { Box} from '@mui/system';
import { Grid } from "@mui/material";
import React from 'react'
import { useContext } from "react";
import GraphContext from '../context/GraphContext'
import Cell from './Cell';
import classnames from 'classnames';
import { withStyles } from '@mui/material/styles';

const styles = (theme) => ({
    // a rows should have its content centered
    row: { textAlign: 'center' },
    // these styles make up the border of the game cross pattern
  });
  

function Graph() {
    
    const {graph} = useContext(GraphContext);
    return (
        <Box sx={{ flexGrow: 1 }}>
            {graph.map((row, rowIdx) => {
                return (
                    <Grid container spacing={0} columns={30} key={rowIdx}>
                    {row.map( (node, nodeIdx) => {
                        return (<Cell key= {`${rowIdx}_${nodeIdx}`} cell= {node}/>)
                    })}
                    </Grid>
                )
            })}
        </Box>
    )
}

export default Graph
