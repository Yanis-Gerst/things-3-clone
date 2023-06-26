import React, { useState } from "react";
import { useCompleteTodo } from "@/hooks/CRUD/useCompleteTodo";

type Coord = {
  x: number;
  y: number;
};

const CompletedButton = () => {
  const [completeTask, setCompleteTask] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState<Coord>({
    x: 0,
    y: 0,
  });
  useCompleteTodo(completeTask);

  const squareIconSize = 20;
  const bgLengthX = squareIconSize * 6;
  const bgLengthY = squareIconSize * 5;

  const handleClick = () => {
    setCompleteTask(!completeTask);
  };

  const completeAnimation = () => {
    if (!completeTask) {
      setBackgroundPosition({ x: 0, y: 0 });
      return;
    }
    if (
      backgroundPosition.x === bgLengthX - squareIconSize &&
      backgroundPosition.y === bgLengthY - squareIconSize
    )
      return;
    if (
      backgroundPosition.x === bgLengthX - squareIconSize &&
      backgroundPosition.y < bgLengthY - squareIconSize
    ) {
      setBackgroundPosition({
        x: 0,
        y: backgroundPosition.y + squareIconSize,
      });
      return;
    }

    setBackgroundPosition({
      x: backgroundPosition.x + squareIconSize,
      y: backgroundPosition.y,
    });
  };

  setTimeout(completeAnimation, 15);
  return (
    <button onClick={handleClick}>
      <div
        className={` bg-checkBoxAtlas`}
        style={{
          backgroundPositionX: -backgroundPosition.x,
          backgroundPositionY: -backgroundPosition.y,
          width: squareIconSize,
          height: squareIconSize,
          backgroundSize: `${bgLengthX}px, ${bgLengthY}px`,
        }}
      />
    </button>
  );
};

export default CompletedButton;
