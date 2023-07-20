import Head from "next/head";
import { PrivateLayout } from "~/components/layout/PrivateLayout";
import { HomeAppBar, HomePostList } from "~/features/home/components";
import { api } from "~/utils/api";

const TrendingPage = () => {
  const posts = api.post.getAll.useQuery({
    filterBy: "ALL",
  });

  return (
    <>
      <Head>
        <title>Trending / CookNet</title>
      </Head>
      <PrivateLayout
        appbar={<HomeAppBar />}
        containerProps={{
          className: "items-start  rounded-md p-4",
        }}
      >
        <HomePostList isLoading={posts.isLoading} posts={posts.data ?? []} />
      </PrivateLayout>
    </>
  );
};

export default TrendingPage;
