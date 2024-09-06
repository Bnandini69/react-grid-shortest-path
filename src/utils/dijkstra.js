const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
  
    // Check adjacent nodes
    if (row > 0) neighbors.push(grid[row - 1][col]); // Top
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Bottom
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    return neighbors;
  };
  
  const dijkstra = (grid, startNode, endNode) => {
    const unvisitedNodes = [];
    const distances = {};
    const previousNodes = {};
    const path = [];
  
    // Initialize distances and previous nodes
    grid.forEach((row) =>
      row.forEach((node) => {
        distances[`${node.row}-${node.col}`] = Infinity;
        previousNodes[`${node.row}-${node.col}`] = null;
        unvisitedNodes.push(node);
      })
    );
  
    distances[`${startNode.row}-${startNode.col}`] = 0;
  
    while (unvisitedNodes.length > 0) {
      // Sort unvisited nodes by distance
      unvisitedNodes.sort(
        (a, b) => distances[`${a.row}-${a.col}`] - distances[`${b.row}-${b.col}`]
      );
      const currentNode = unvisitedNodes.shift();
  
      // If the end node is reached, reconstruct the path
      if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
        let node = endNode;
        while (node) {
          path.unshift(node);
          node = previousNodes[`${node.row}-${node.col}`];
        }
        return { path, success: true };
      }
  
      // If the node's distance is infinity, it means it's unreachable
      if (distances[`${currentNode.row}-${currentNode.col}`] === Infinity) {
        console.log("No Path Found");
        return { path: [], success: false };
      }
  
      // Update neighbor nodes
      getNeighbors(currentNode, grid).forEach((neighbor) => {
        if (!neighbor.isWall) {
          const tentativeDistance =
            distances[`${currentNode.row}-${currentNode.col}`] + 1;
          if (tentativeDistance < distances[`${neighbor.row}-${neighbor.col}`]) {
            distances[`${neighbor.row}-${neighbor.col}`] = tentativeDistance;
            previousNodes[`${neighbor.row}-${neighbor.col}`] = currentNode;
          }
        }
      });
    }
  
    return { path: [], success: false };
  };
  
  export default dijkstra;
  