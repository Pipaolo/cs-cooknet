import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import { PrivateLayout } from "~/components/layout/PrivateLayout";

const AccountSettingsPage = () => {
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
        <div className="flex w-full flex-grow items-center justify-center">
          <Heading size={"md"} className="uppercase text-stone-500">
            This feature is currently under development
          </Heading>
        </div>
      </PrivateLayout>
    </>
  );
};

export default AccountSettingsPage;
