import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import { PrivateLayout } from "~/components/layout/PrivateLayout";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>CookNet</title>
      </Head>
      <PrivateLayout
        containerProps={{
          className: "items-start  rounded-md p-4",
        }}
      >
        <Heading>Trending</Heading>
      </PrivateLayout>
    </>
  );
};

export default HomePage;
