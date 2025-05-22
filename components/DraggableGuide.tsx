import React from 'react';
import Draggable from 'react-draggable';

type Props = {
  x: number;
  y: number;
  idx: number;
  onDrag: (idx: number, x: number, y: number) => void;
};

const DraggableGuide: React.FC<Props> = ({ x, y, idx, onDrag }) => {
  return (
    <Draggable
      position={{ x, y }}
      onStop={(_, data) => onDrag(idx, data.x, data.y)}
    >
      <div
        className="w-4 h-4 bg-gold rounded-full border-2 border-white absolute cursor-move"
        style={{ left: x - 8, top: y - 8 }}
        title={`Guide ${idx + 1}`}
      />
    </Draggable>
  );
};
export default DraggableGuide;