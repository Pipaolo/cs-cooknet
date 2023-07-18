import {
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaClipboard, FaEllipsisH, FaEllipsisV, FaLink } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { type RouterOutputs } from "~/utils/api";

export type Post = RouterOutputs["post"]["getAll"][0];

interface Props {
  post: Post;
}

export const PostsListItem = ({ post }: Props) => {
  return (
    <div className="flex w-full flex-col space-y-2 rounded-md border p-4">
      <div className="flex flex-row content-center items-center space-x-2">
        <Image
          className="relative h-12 w-12 rounded-full"
          src={post.author.profileUrl}
          alt="author profile"
        />
        <div className="flex flex-col">
          <span>{post.author.email}</span>
          <Heading size="sm">{post.title}</Heading>
        </div>
        <Spacer />
        <Menu>
          <MenuButton>
            <IconButton
              aria-label="Open Actions"
              icon={<FaEllipsisH />}
              variant={"ghost"}
              className="rounded-full"
            />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaClipboard />}>Copy Link</MenuItem>
            <MenuItem icon={<FaLink />}>Share</MenuItem>
            <MenuItem icon={<GiFruitBowl />}>Save</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <p className="black w-full border border-t-0 p-4 font-normal dark:text-gray-400">
        {post.content}
      </p>

      <div className="flex flex-row flex-wrap gap-1">
        {post.tags.map((tag, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center rounded-md bg-stone-500 px-2 py-1 text-xs font-bold leading-none text-white"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

{
  /* <div class="flex flex-col bg-white border border-black rounded-lg shadow hover:bg-gray-100">
        <div class="row-span-2 p-3">
        <h5 class="mb-2 text-2xl text-black"dark:text-white">Post #1</h5>
    <h5 class="ps-3 mb-2 text-sm text-black"dark:text-white">By : this Person</h5>
  </div>
  
  <div class="flex flex-row border border-black"> 
      <img class="object-cover w-full rounded-t-lg h-96 p-0 border border-black" src="https://flowbite.com/docs/images/blog/image-4.jpg" alt=""/>

        <!-- FULL COMMENT CONTAINER -->
    <div class="flex flex-col ms-0.5 me-0 leading-normal border-black border">
      <!-- Comment Container -->
      <div class="flex flex-col border p-1 border-red-900">

        <!-- Profile Picture & username -->
        <div class="flex flex-row">
          <img class="rounded-full h-16 w-16 " src="https://flowbite.com/docs/images/blog/image-4.jpg" alt=""/>
          <a href="">User 1</a>
        </div>
        <!-- Comment -->
        <p class=" font-normal dark:text-gray-400 border border-t-0 black p-1">
         Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

      </div>
      <!-- Comment Container -->
      <div class="flex flex-col border p-1 border-red-900">

        <!-- Profile Picture & username -->
        <div class="flex flex-row">
          <img class="rounded-full h-16 w-16 " src="https://flowbite.com/docs/images/blog/image-4.jpg" alt=""/>
          <a href="">User 2</a>
        </div>
        <!-- Comment -->
        <p class=" font-normal dark:text-gray-400 border border-t-0 black p-1">
         Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

      </div>
    </div>

  </div>
</div>
 */
}
