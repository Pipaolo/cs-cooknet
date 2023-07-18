import { twMerge } from "tailwind-merge";
import { AppBar } from "./AppBar";
import SideNavigationBar from "./SideNavigationBar";

interface Props {
  children: React.ReactNode;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const PrivateLayout = ({ children, ...props }: Props) => {
  return (
    <main className=" flex h-full min-h-screen w-full justify-center">
      <div className="container flex flex-grow space-x-2">
        {/* Side Bar */}
        <SideNavigationBar />
        <div className="flex flex-grow flex-col">
          <AppBar />
          {/* Content */}
          <div
            {...props.containerProps}
            className={twMerge([
              "flex flex-grow flex-col items-center",
              props.containerProps?.className,
            ])}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
