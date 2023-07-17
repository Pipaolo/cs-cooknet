import { SignUp } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main className="flex h-full min-h-screen w-full items-center justify-center">
        <SignUp />
      </main>
    </>
  );
}
