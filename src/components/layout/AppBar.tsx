import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const AppBar = (props: Props) => {
  return (
    <div className="sticky inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-white p-4 shadow">
      <span className="text-2xl font-extrabold text-stone-800">CookNet</span>
      {props.children}
    </div>
  );
};
