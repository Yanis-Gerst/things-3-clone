import React from "react";
import appleIcon from "../../public/assets/appleicon.svg?url";
import facebookIcon from "../../public/assets/facebookIcon.svg?url";
import googleIcon from "../../public/assets/googleIcon.svg?url";
import Image from "next/image";

export type ICompagnyName = "Apple" | "Google" | "Facebook";
interface Props {
  compagny: ICompagnyName;
}

const getIcons = (compagny: ICompagnyName) => {
  switch (compagny) {
    case "Apple":
      return appleIcon;
    case "Google":
      return googleIcon;
    case "Facebook":
      return facebookIcon;
  }
};

const SocialMediaButton = ({ compagny }: Props) => {
  return (
    <button className="flex gap-4 py-3 px-4 border border-stroke rounded items-center justify-center transition-all hover:bg-stroke">
      <Image src={getIcons(compagny)} alt="apple icon" />
      <p>Continue with {compagny}</p>
    </button>
  );
};

export default SocialMediaButton;
