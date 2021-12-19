import { createContext, useState } from "react";

const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [graph, setGraph] = useState(initGraph());

  return (
    <GraphContext.Provider value={{ graph }}>{children}</GraphContext.Provider>
  );
};

const initGraph = () => {
  const graph = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 30; col++) {
      currentRow.push(initNode(row, col));
    }
    graph.push(currentRow);
  }
  return graph;
};

const initNode = (row, col) => {
  return {
    row: row,
    col: col,
    isStart: row === 0 && col === 0,
    isFinish: row === 10 && col === 15,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default GraphContext;
