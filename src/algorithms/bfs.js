export default function bfs(oldGraph, start, end) {
  // let graph = oldGraph.map((inner) => inner.slice());
  let graph = oldGraph.map((row) => {
    let newRow = row.slice();
    return newRow.map((cell) => {
      return { ...cell };
    });
  });
  let visitedNodes = [];
  let queue = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  // console.log(`we started here : ${start.row} ${start.col}`);
  queue.push([start.row, start.col]);
  graph[start.row][start.col].isVisited = true;

  while (queue.length !== 0) {
    let [row, col] = queue.shift();
    // console.log(`Currently at this node : ${start.row} ${start.col}`);
    for (let i = 0; i < 4; i++) {
      const adjRow = directions[i][0] + row;
      const adjCol = directions[i][1] + col;
      if (isEnd(graph, adjRow, adjCol)) {
        graph[adjRow][adjCol].previousNode = [row, col];
        return { graph: graph, visitedNodes: visitedNodes, foundEnd: true };
      }
      if (isValidNextStep(graph, adjRow, adjCol)) {
        queue.push([adjRow, adjCol]);
        graph[adjRow][adjCol].previousNode = [row, col];
        graph[adjRow][adjCol].isVisited = true;
        visitedNodes.push([adjRow, adjCol]);
        // console.log(`searching: ${adjRow} ${adjCol}`);
      }
    }
  }
  return { graph: graph, visitedNodes: visitedNodes, foundEnd: false };
}

const isEnd = (graph, row, col) => {
  if (row < 0 || col < 0 || row >= graph.length || col >= graph[0].length)
    return false;
  if (graph[row][col].isEnd) return true;
  return false;
};

const isValidNextStep = (graph, row, col) => {
  if (row < 0 || col < 0 || row >= graph.length || col >= graph[0].length)
    return false;
  if (graph[row][col].isVisited || graph[row][col].isWall) return false;
  return true;
};
