import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const RecipesAppBar = () => {
  const links = [
    { href: "/home/recipes/create", label: "Create Recipe" },
    { href: "/home/recipe-books/", label: "Recipe Books" },
    { href: "/home/posts/", label: "Posts" },
    { href: "/home/recipes/", label: "Recipes" },
  ];

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
    <div className="sticky inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-stone-400 p-4 shadow-md">
      <Link href={"/home/recipes"}>
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
