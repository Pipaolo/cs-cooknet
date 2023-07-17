import { Button, Heading, Input, Text } from "@chakra-ui/react";
import Image from "next/image";

export const RecipesContainer = () => {
  return (
    <div className="flex h-full w-full flex-grow flex-col justify-center p-4">
      <Input
        placeholder="Search for recipes"
        className="shadow-none focus-within:border-stone-500 focus-within:ring-1 focus-within:ring-stone-500"
      />
      <div className=" flex h-full w-full flex-grow flex-col space-y-4 rounded-md p-4">
        <Heading size="lg">Recipes</Heading>
        <div className="grid h-full w-full grid-cols-3 gap-4">
          <div className="relative flex flex-col space-y-2 rounded border border-black p-4">
            <div>
              <Heading size={"sm"}>Dish Name</Heading>
              <Text>by PaoPao</Text>
            </div>
            <div className="relative  aspect-square  h-40 overflow-hidden object-cover">
              <Image
                fill
                className=" rounded-md object-cover"
                src="https://plus.unsplash.com/premium_photo-1664360228046-a0a7ccf4fb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="food"
              />
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 text-xs font-semibold">
              <span className="rounded-md border px-4 py-1">Tag 1</span>
              <span className="rounded-md border px-4 py-1">Tag 2</span>
              <span className="rounded-md border px-4 py-1">Tag 3</span>
              <span className="rounded-md border px-4 py-1">Tag 4</span>
              <span className="rounded-md border px-4 py-1">Tag 5</span>
              <span className="rounded-md border px-4 py-1">Tag 6</span>
              <span className="rounded-md border px-4 py-1">Tag 7</span>
              <span className="rounded-md border px-4 py-1">Tag 8</span>
            </div>
            {/* Description */}
            <p className="rounded-md border p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
            {/* Actions Bookmarks */}
            <div className="absolute -right-1/3 top-0 flex flex-col ">
              <Button>Description</Button>
              <Button>Ingredients</Button>
              <Button>Procedure</Button>
              <Button>External Links</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
