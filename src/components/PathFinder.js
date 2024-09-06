import React, { useState } from "react";
import dijkstra from "../utils/dijkstra";
import Grid from "./Grid";
import {message } from 'antd';

const NUM_ROWS = 20;
const NUM_COLS = 20;

const PathFinder = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [messageApi,contextHolder] = message.useMessage();

  const handleClick = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    if (!startNode && !endNode) {
      // Set start node
      setStartNode({ ...node, isStart: true });
      newGrid[row][col] = { ...node, isStart: true };
    } else if (startNode && !endNode) {
      // Set end node
      setEndNode({ ...node, isEnd: true });
      newGrid[row][col] = { ...node, isEnd: true };
    } else {
      // Toggle wall
      node.isWall = !node.isWall;
    }

    setGrid(newGrid);
  };

  const findPath = () => {
    if (!startNode || !endNode) {
        messageApi.open({
            type: 'error',
            content: 'Please set both start and end nodes.',
          });
      return;
    }

    const { path: foundPath, success } = dijkstra(grid, startNode, endNode);

    if (success) {
      const newGrid = grid.slice();
      foundPath.forEach((node) => {
        newGrid[node.row][node.col] = { ...node, isPath: true };
      });
      setGrid(newGrid);
    } else {
    messageApi.open({
        type: 'error',
        content: 'No path found',
      });
    }
  };

  const resetGrid = () => {
    setGrid(createInitialGrid());
    setStartNode(null);
    setEndNode(null);
  };

  return (
    <div style={{display:"flex",padding:"20px",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        {contextHolder}
     <div style={{padding:"10px"}}>
      <button onClick={findPath} style={{margin:"10px"}}>Find Path</button>
      <button onClick={resetGrid}>Reset Grid</button>
      </div>
      <Grid grid={grid} onClick={handleClick} />
    </div>
  );
};

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const newRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      newRow.push({
        row,
        col,
        isStart: false,
        isEnd: false,
        isWall: false,
        isPath: false,
      });
    }
    grid.push(newRow);
  }
  return grid;
};

export default PathFinder;
