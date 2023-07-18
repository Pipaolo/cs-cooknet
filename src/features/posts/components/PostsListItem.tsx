import {
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { FaClipboard, FaEllipsisH, FaLink } from "react-icons/fa";
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
