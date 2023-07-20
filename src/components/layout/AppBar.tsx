import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  showLogo?: boolean;
}

export const AppBar = ({
  children,
  showLogo = true,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={twMerge([
        "sticky inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-white p-4 shadow",
        className,
      ])}
      {...props}
    >
      {showLogo && (
        <span className="text-2xl font-extrabold text-stone-800">CookNet</span>
      )}
      {children}
    </div>
  );
};
