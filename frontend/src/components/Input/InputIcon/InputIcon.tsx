"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Props {
  src: string;
  activeSrc: string;
  alt: string;
  stateConfig: { setter: React.Dispatch<boolean>; state: boolean };
}
const InputIcon = ({ src, activeSrc, alt, stateConfig }: Props) => {
  return (
    <Image
      src={stateConfig.state && activeSrc ? activeSrc : src}
      alt={alt}
      onClick={() => stateConfig.setter(!stateConfig.state)}
      className="cursor-pointer"
    />
  );
};

export default InputIcon;
