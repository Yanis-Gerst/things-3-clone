import React from "react";
import SocialMediaButton, { ICompagnyName } from "../SocialMediaButton";

const SocialMediaLogger = () => {
  const compagnyNames: ICompagnyName[] = ["Facebook", "Google", "Apple"];
  return (
    <div className="flex flex-col gap-2">
      {compagnyNames.map((compagnyName) => (
        <SocialMediaButton key={compagnyName} compagny={compagnyName} />
      ))}
    </div>
  );
};

export default SocialMediaLogger;
