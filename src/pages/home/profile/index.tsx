import { CircularProgress, Heading, Image, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppBar } from "~/components/layout";
import { PrivateLayout } from "~/components/layout/PrivateLayout";
import { HomeAppBar, HomePostList } from "~/features/home/components";
import { ProfileAppBar } from "~/features/profile";
import { api } from "~/utils/api";

export const HomeProfilePage = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = router.query;

  const getUser = api.user.getOne.useQuery(
    {
      userId: user as string,
    },
    {
      enabled: router.isReady,
      retry: 0,
      onError: (error) => {
        void router.replace("/home/trending");
        toast({
          title: "User not found!",
          status: "error",
        });
      },
    }
  );

  const getUserPosts = api.post.getAllByAuthor.useQuery(
    {
      authorId: getUser?.data?.id,
    },
    {
      enabled: !getUser.isLoading && getUser.isSuccess,
    }
  );

  const renderContent = () => {
    if (getUser.isLoading) {
      return (
        <div className="flex w-full flex-grow items-center justify-center">
          <CircularProgress isIndeterminate />
        </div>
      );
    }
    return (
      <div className="flex w-full flex-grow flex-col">
        <HomePostList
          isLoading={getUserPosts.isLoading}
          posts={getUserPosts.data ?? []}
        />
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>User / CookNet</title>
      </Head>
      <PrivateLayout
        appbar={<ProfileAppBar user={getUser.data} />}
        containerProps={{
          className: "items-start rounded-md p-4",
        }}
      >
        {renderContent()}
      </PrivateLayout>
    </>
  );
};

export default HomeProfilePage;
