import React from "react";

export default function CardStats({ stat }) {
  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words rounded-lg text-white mb-6 xl:mb-0 shadow-lg"
        style={{ backgroundColor: stat.bg }}
      >
        <div className="flex justify-between items-center px-6 py-5">
          <div className="flex flex-col">
            <p className="text-4xl pl-5 mt-4">{ stat.num }</p>
            <p className="text-xl">{ stat.title }</p>
          </div>

          <i className={`ml-5 ${ stat.icon } text-5xl`}></i>
        </div>
      </div>
    </>
  );
}