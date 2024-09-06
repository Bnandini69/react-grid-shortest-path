import React from 'react';
import './Grid.css'; 

const Grid = ({ grid, onClick }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((node, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`node ${node.isStart ? 'start' : ''} ${node.isEnd ? 'end' : ''} ${node.isWall ? 'wall' : ''} ${node.isPath&&!node.isStart &&!node.isEnd ? 'path' : ''}`}
            onClick={() => onClick(rowIndex, colIndex)}
            role="button"
            tabIndex={0} 
            aria-label={`Node ${rowIndex}-${colIndex} ${node.isStart ? 'Start' : ''} ${node.isEnd ? 'End' : ''} ${node.isWall ? 'Wall' : ''} ${node.isPath ? 'Path' : ''}`}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
