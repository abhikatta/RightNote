import React from "react";

const DarkThemeIcon = ({ onClick, theme }) => {
  return (
    <svg
      version="1.0"
      className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 top-[2.5rem] right-[3rem] md:top-[3.5rem] md:left-[12rem] duration-200 rounded-[40%]

            ${
              theme === "light"
                ? "hover:bg-slate-400 bg-slate-300"
                : "hover:bg-slate-300 bg-slate-400"
            }`}
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      onClick={onClick}
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet">
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none">
        <path
          d="M373 850 c-66 -33 -140 -105 -171 -166 -89 -176 -19 -388 160 -485
          60 -32 68 -34 163 -34 93 0 105 2 167 33 70 34 124 87 159 154 34 67 20 98
          -33 72 -130 -66 -293 -18 -362 106 -27 48 -31 65 -31 131 0 66 4 84 32 136 23
          45 29 63 20 72 -17 17 -39 13 -104 -19z"
        />
      </g>
    </svg>
  );
};

export default DarkThemeIcon;
