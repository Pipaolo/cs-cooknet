import { IconButton, Spacer } from "@chakra-ui/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBook,
  FaChartLine,
  FaHome,
  FaUserCog,
} from "react-icons/fa";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";

type SideNavigationItem = {
  name: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
};

type SideNavigationBarState = {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
};

const useSideNavigationBar = create(
  persist<SideNavigationBarState>(
    (set, get) => {
      return {
        isExpanded: true,
        setIsExpanded: (isExpanded: boolean) => {
          set({ isExpanded });
        },
      };
    },
    {
      name: "side-navigation-bar",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: false,
    }
  )
);

const SideNavigationBar = () => {
  const router = useRouter();
  const { isExpanded, setIsExpanded } = useSideNavigationBar();
  const { user } = useUser();

  const initialItems: SideNavigationItem[] = useMemo(
    () => [
      {
        name: "Home",
        icon: <FaHome className="h-6 w-6" />,
        isActive: false,
        href: "/home",
      },
      {
        name: "Trending",
        icon: <FaChartLine className="h-6 w-6" />,
        isActive: false,
        href: "/home/trending",
      },
      {
        name: "Library",
        icon: <FaBook className="h-6 w-6" />,
        href: "/home/recipe-books",
        isActive: false,
      },
      {
        name: "Settings",
        href: "/account/settings",
        icon: <FaUserCog className="h-6 w-6" />,
        isActive: false,
      },
    ],
    []
  );

  const items = useMemo(() => {
    return initialItems.map((item) => {
      return {
        ...item,
        isActive: router.pathname.startsWith(item.href),
      };
    });
  }, [router.pathname, initialItems]);

  const onSideNavigationToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={twMerge([
        "col-span-1 flex h-full flex-col space-y-4 p-4 shadow transition-all",
        isExpanded ? "w-64" : "w-min",
      ])}
    >
      <div className="flex items-center space-x-2">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-12 h-12",
            },
          }}
        />
        {isExpanded && (
          <span className="text-lg font-bold">{user?.fullName}</span>
        )}
      </div>
      <div className="flex flex-col justify-center space-y-2">
        {items.map((item) => {
          return (
            <div
              key={item.href}
              onClick={(_) => void router.push(item.href)}
              className={twMerge([
                "flex cursor-pointer items-center space-x-2 rounded-md hover:bg-stone-200",
                item.isActive ? "bg-stone-200" : "",
                isExpanded ? "" : "items-center justify-center",
              ])}
            >
              <div
                className={twMerge([
                  "flex h-10 w-10 items-center justify-center",
                ])}
              >
                {item.icon}
              </div>
              {isExpanded && (
                <span
                  className={twMerge([
                    "flex h-10 w-10 items-center justify-center",
                  ])}
                >
                  {item.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <Spacer />
      <IconButton
        aria-label="Toggle Side Navigation Bar"
        className="w-min self-end rounded-full"
        variant={"ghost"}
        onClick={onSideNavigationToggle}
        icon={isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(SideNavigationBar), {
  ssr: false,
});
