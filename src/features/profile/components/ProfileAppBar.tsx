import { AppBar } from "~/components/layout";
import { type ProfileUser } from "../types";
import {
  IconButton,
  Image,
  Spacer,
  Tag,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import { twMerge } from "tailwind-merge";
import { api } from "~/utils/api";

interface Props {
  user?: ProfileUser;
}
export const ProfileAppBar = ({ user }: Props) => {
  const { user: currentUser } = useUser();
  const toast = useToast();
  const trpcUtils = api.useContext();
  const followOne = api.user.followOne.useMutation();
  if (!user) return null;

  const isCurrentUser = currentUser?.id === user.clerkId;

  const onFollowPressed = async () => {
    try {
      await followOne.mutateAsync({
        userId: user.id,
      });
   
      toast({
        title: `You ${user.isFollowing ? "unfollowed" : "followed"} ${
          user.email
        }`,
        status: "success",
        duration: 3000,
      });
      await trpcUtils.user.getOne.invalidate({
        userId: user.id,
      });
    } catch (error) {
      toast({
        title: `Failed to ${user.isFollowing ? "unfollow" : "follow"} ${
          user.email
        }`,
        status: "error",
        duration: 3000,
      });
    }
  };


  return (
    <AppBar showLogo={false} className="items-center justify-start space-x-4">
      <Image
        alt="profile"
        className="aspect-square h-14 w-14 items-start rounded-full"
        src={user.profileUrl}
      />
      <div className="flex flex-col">
        <h4 className="text-lg font-bold">{user.email}</h4>
        {user.isFollowedBy && !isCurrentUser && (
          <Tag size={"sm"}>Follows you</Tag>
        )}
      </div>

      <Tag className="rounded-full bg-stone-500 text-white">
        {user.followersCount} Followers
      </Tag>
      <Spacer />
      <Tooltip label={user.isFollowing ? "Unfollow" : "Follow"}>
        <IconButton
          className={twMerge([
            "rounded-full fill-none",
            isCurrentUser && "hidden",
          ])}
          colorScheme="stone"
          aria-label="Like"
          variant={"ghost"}
          isLoading={followOne.isLoading}
          onClick={() => void onFollowPressed()}
          icon={
            <div className="flex items-center space-x-2 px-2">
              {user.isFollowing ? (
                <AiOutlineHeart className="h-10 w-10" />
              ) : (
                <AiFillHeart className="h-10 w-10" />
              )}
            </div>
          }
        />
      </Tooltip>
    </AppBar>
  );
};
