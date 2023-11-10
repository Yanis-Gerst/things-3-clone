import React from "react";
import moveIcon from "../../public/assets/ToolBarMoveIcon.svg";
import Image from "next/image";
const MoveSetter = () => {
  return (
    <div>
      <Image src={moveIcon} alt="Order your task" />
    </div>
  );
};

export default MoveSetter;
