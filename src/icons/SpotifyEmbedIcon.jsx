import React from "react";
import { ReactComponent as SpotifySVG } from "../icons/Spotify.svg";
const SpotifyEmbedIcon = ({ theme, toggledOff, onClick }) => {
  return (
    <SpotifySVG
      onClick={onClick}
      className={`h-[2.5rem] w-[2.5rem] transition-all p-1 md:top-[3.5rem] top-[2.5rem] md:left-[5rem] left-[2rem] duration-200 rounded-[40%]
          ${theme === "light" ? "hover:bg-slate-400 " : "hover:bg-slate-300 "}
          ${toggledOff ? "" : " opacity-25"}
          `}
    />
  );
};

export default SpotifyEmbedIcon;
