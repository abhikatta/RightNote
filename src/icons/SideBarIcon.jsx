import React from "react";

const SideBarIcon = ({ onClick, sideBar, theme }) => {
  return (
    <svg
      onClick={onClick}
      version="1.0"
      className={`h-[2.5rem] w-[2.5rem] transition-all p-1 md:top-[3.5rem] top-[2.5rem] md:left-[5rem] left-[2rem] duration-200 rounded-[40%]
          ${sideBar ? "md:rotate-0 rotate-90" : "md:rotate-180 -rotate-90"}  
          ${theme === "light" ? "hover:bg-slate-400 " : "hover:bg-slate-300 "}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet">
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none">
        <path
          d="M347 692 c-97 -97 -177 -184 -177 -192 0 -8 80 -95 178 -193 179
-178 200 -193 217 -149 4 11 -40 62 -157 179 l-163 163 163 163 c89 89 162
165 162 169 0 9 -29 38 -38 38 -4 0 -87 -80 -185 -178z"
        />
        <path
          d="M578 693 c-98 -98 -178 -184 -178 -193 0 -17 350 -370 366 -370 15 0
34 22 34 39 0 8 -71 86 -157 173 l-157 158 157 158 c86 87 157 165 157 173 0
17 -19 39 -34 39 -5 0 -90 -80 -188 -177z"
        />
      </g>
    </svg>
  );
};

export default SideBarIcon;
