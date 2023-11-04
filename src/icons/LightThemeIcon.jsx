import React from "react";

const LightThemeIcon = ({ onClick, theme }) => {
  return (
    <svg
      version="1.0"
      onClick={onClick}
      className={`h-[2.5rem] w-[2.5rem] top-[1rem] left-[1rem] transition-colors p-1 lg:top-[2.5rem] lg:right-[3rem] md:top-[3.5rem] md:left-[12rem] duration-200 rounded-[40%]
      ${
        theme === "light"
          ? "hover:bg-slate-400 bg-slate-300"
          : "hover:bg-slate-300 bg-slate-400"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet">
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none">
        <path d="M460 935 l0 -65 40 0 40 0 0 65 0 65 -40 0 -40 0 0 -65z" />
        <path d="M147 852 l-27 -28 43 -42 43 -42 27 28 27 28 -43 42 -43 42 -27 -28z" />
        <path d="M782 837 l-42 -43 28 -27 28 -27 42 43 42 43 -28 27 -28 27 -42 -43z" />
        <path
          d="M407 776 c-94 -35 -164 -110 -188 -201 -34 -125 27 -266 143 -331 47
          -26 62 -29 138 -29 96 0 143 18 205 80 62 62 80 109 80 205 0 76 -3 91 -29
          138 -31 55 -74 95 -136 127 -46 24 -163 30 -213 11z m157 -78 c87 -26 157
          -136 143 -224 -20 -123 -140 -206 -254 -176 -160 43 -214 232 -98 347 59 60
          127 77 209 53z"
        />
        <path d="M0 500 l0 -40 65 0 65 0 0 40 0 40 -65 0 -65 0 0 -40z" />
        <path d="M870 500 l0 -40 65 0 65 0 0 40 0 40 -65 0 -65 0 0 -40z" />
        <path d="M162 217 l-42 -43 28 -27 28 -27 42 43 42 43 -28 27 -28 27 -42 -43z" />
        <path d="M767 232 l-27 -28 43 -42 43 -42 27 28 27 28 -43 42 -43 42 -27 -28z" />
        <path d="M460 60 l0 -60 40 0 40 0 0 60 0 60 -40 0 -40 0 0 -60z" />
      </g>
    </svg>
  );
};

export default LightThemeIcon;
