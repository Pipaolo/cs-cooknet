import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const RecipesAppBar = () => {
  const links = [{ href: "/home/recipes/create", label: "Create Recipe" }];

  const renderLinks = () => {
    return links.map((link) => {
      return (
        <Link
          className=" text-black underline-offset-2 transition-all hover:text-stone-600 hover:underline"
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      );
    });
  };

  return (
    <div className="flex w-full items-center justify-between bg-stone-400 p-4 shadow-md">
      <Link href={"/"}>
        <span className="text-3xl font-extrabold text-stone-800">CookNet</span>
      </Link>
      <div className="flex items-center space-x-4">
        {renderLinks()}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonBox: "bg-white rounded-full p-1 shadow-md ",
              userButtonContent: "text-stone-800 font-bold",
            },
          }}
        />
      </div>
    </div>
  );
};

export default RecipesAppBar;
