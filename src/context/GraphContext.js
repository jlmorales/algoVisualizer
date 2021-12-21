import { createContext, useState } from "react";
import bfs from "../algorithms/bfs";

const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [currentStart, setCurrentStart] = useState({ row: 0, col: 0 });
  const [currentEnd, setCurrentEnd] = useState({ row: 10, col: 15 });
  const [graph, setGraph] = useState(initGraph());
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [toggleMode, setToggleMode] = useState("toggleWalls");

  const handleVisualize = () => {
    const bfsResults = bfs(
      graph,
      graph[currentStart.row][currentStart.col],
      graph[currentEnd.row][currentEnd.col]
    );
    visualizeBfs(bfsResults);
  };

  const visualizeBfs = (bfsResults) => {
    const searchGraph = bfsResults.graph;
    const pathVisited = bfsResults.visitedNodes;
    const foundEnd = bfsResults.foundEnd;

    for (let i = 0; i < pathVisited.length; i++) {
      const [pathRow, pathCol] = pathVisited[i];
      setTimeout(() => {
        setGraph((oldGraph) => {
          const newGraph = oldGraph.map((row) => {
            let newRow = row.slice();
            return newRow.map((cell) => {
              if (cell.row === pathRow && cell.col === pathCol) {
                return { ...cell, showPath: true };
              } else if (cell.showPath) {
                return { ...cell, showVisited: true, showPath: false };
              } else {
                return { ...cell };
              }
            });
          });
          return newGraph;
        });
      }, 3);
    }
    setTimeout(() => {
      setGraph((oldGraph) => {
        const newGraph = oldGraph.map((row) => {
          let newRow = row.slice();
          return newRow.map((cell) => {
            if (cell.showPath) {
              return { ...cell, showVisited: true, showPath: false };
            } else {
              return { ...cell };
            }
          });
        });
        return newGraph;
      });
    }, 6);
    if (foundEnd) {
      let [previousRow, previousCol] = [currentEnd.row, currentEnd.col];
      let previousNode = searchGraph[previousRow][previousCol];
      // console.log(previousNode);
      const pathBack = [];
      while (!previousNode.isStart) {
        [previousRow, previousCol] =
          searchGraph[previousNode.row][previousNode.col].previousNode;
        previousNode = searchGraph[previousRow][previousCol];
        pathBack.push(previousNode);
      }
      // we pop off the start node
      pathBack.pop();
      pathBack.forEach((thisCell) => {
        setTimeout(() => {
          setGraph((oldGraph) => {
            const newGraph = oldGraph.map((row) => {
              let newRow = row.slice();
              return newRow.map((cell) => {
                if (cell.row === thisCell.row && cell.col === thisCell.col) {
                  return { ...cell, showVisited: false, showPath: true };
                } else {
                  return { ...cell };
                }
              });
            });
            return newGraph;
          });
        }, 6);
      });
    }
  };

  const handleMouseDown = (cell) => {
    setMouseIsDown(true);
    toggleNode(cell);
  };

  const toggleNode = (cellToToggle) => {
    switch (toggleMode) {
      case "toggleWalls":
        setToWall(cellToToggle);
        break;
      case "toggleStart":
        setToStart(cellToToggle);
        break;
      case "toggleEnd":
        setToFinish(cellToToggle);
        break;
      default:
        console.log("something unexpected has happened");
    }
  };

  const setToWall = (cellToToggle) => {
    if (cellToToggle.isFinish || cellToToggle.isStart) return;
    const row = cellToToggle.row;
    const col = cellToToggle.col;
    cellToToggle.isWall = !cellToToggle.isWall;
    // console.log(cellToToggle);
    setGraph(
      graph.map((cell) => {
        return cell.row === row && cell.col === col
          ? { ...cell, cellToToggle }
          : cell;
      })
    );
  };

  const setToStart = (cellToToggle) => {
    if (
      (cellToToggle.row === currentStart.row &&
        cellToToggle.col === currentStart.col) ||
      (cellToToggle.row === currentEnd.row &&
        cellToToggle.col === currentEnd.col)
    )
      return;
    const newCurrentStart = {
      row: cellToToggle.row,
      col: cellToToggle.col,
    };
    setCurrentStart(newCurrentStart);
    setGraph(
      graph.map((row) => {
        return row.map((cell) => {
          if (cell.row === cellToToggle.row && cell.col === cellToToggle.col) {
            return { ...cell, isStart: true, isWall: false };
          } else {
            const newCell = {
              ...cell,
              isStart: false,
            };
            return { ...newCell };
          }
        });
      })
    );
  };

  const setToFinish = (cellToToggle) => {
    if (
      (cellToToggle.row === currentStart.row &&
        cellToToggle.col === currentStart.col) ||
      (cellToToggle.row === currentEnd.row &&
        cellToToggle.col === currentEnd.col)
    )
      return;
    const newCurrentEnd = {
      row: cellToToggle.row,
      col: cellToToggle.col,
    };
    setCurrentEnd(newCurrentEnd);
    setGraph(
      graph.map((row) => {
        return row.map((cell) => {
          if (cell.row === cellToToggle.row && cell.col === cellToToggle.col) {
            return { ...cell, isEnd: true, isWall: false };
          } else {
            const newCell = {
              ...cell,
              isEnd: false,
            };
            return { ...newCell };
          }
        });
      })
    );
  };

  const handleMouseEnterCell = (cell) => {
    if (!mouseIsDown && cell.isStart) {
      setToggleMode("toggleStart");
    } else if (!mouseIsDown && cell.isEnd) {
      setToggleMode("toggleEnd");
    } else if (!mouseIsDown) {
      setToggleMode("toggleWalls");
    }
    if (!mouseIsDown) return;
    toggleNode(cell);
  };

  const handleMouseUpCell = () => {
    setMouseIsDown(false);
  };

  return (
    <GraphContext.Provider
      value={{
        graph,
        toggleNode,
        handleMouseEnterCell,
        handleMouseUpCell,
        handleMouseDown,
        handleVisualize,
      }}
    >
      {children}
    </GraphContext.Provider>
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
    isEnd: row === 10 && col === 15,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    showVisited: false,
    showVisiting: false,
    showPath: false,
  };
};

export default GraphContext;
