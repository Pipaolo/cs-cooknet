import Head from "next/head";
import { PrivateLayout } from "~/components/layout/PrivateLayout";
import { HomeAppBar, HomePostList } from "~/features/home/components";
import { api } from "~/utils/api";
const HomePage = () => {
  const posts = api.post.getAll.useQuery({
    filterBy: "FOLLOWING",
  });

  return (
    <>
      <Head>
        <title>Home / CookNet</title>
      </Head>
      <PrivateLayout
        appbar={<HomeAppBar />}
        containerProps={{
          className: "items-start  rounded-md p-4",
        }}
      >
        <HomePostList
          emptyMessage="No posts found, kindly follow some users to see their posts here. Start by going to the trending page."
          isLoading={posts.isLoading}
          posts={posts.data ?? []}
        />
      </PrivateLayout>
    </>
  );
};

export default HomePage;
