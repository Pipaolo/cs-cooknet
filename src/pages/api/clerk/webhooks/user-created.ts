import { type NextApiRequest, type NextApiResponse } from "next";
import { User, type WebhookEvent } from "@clerk/clerk-sdk-node";
import { prisma } from "~/server/db";
import { clerkClient } from "@clerk/nextjs";

const upsertUser = async (data: User) => {
  const emailAddress = data.emailAddresses[0]?.emailAddress ?? "";

  await prisma.user.upsert({
    where: {
      clerkId: data.id,
    },
    create: {
      clerkId: data.id,
      email: emailAddress,
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      profileUrl: data.profileImageUrl,
      username: data.username ?? "",
    },
    update: {
      clerkId: data.id,
      email: emailAddress,
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      profileUrl: data.profileImageUrl,
      username: data.username ?? "",
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const event = req.body as WebhookEvent;
  console.log("Clerk Webhook Event", event);
  switch (event.type) {
    case "session.created":
      const user = await prisma.user.findUnique({
        where: {
          clerkId: event.data.user_id,
        },
      });

      if (!user) {
        // Fetch the user from Clerk and upsert it into our database
        const clerkUser = await clerkClient.users.getUser(event.data.user_id);
        await upsertUser(clerkUser);
      }
      break;
    case "user.created":
    case "user.updated":
      const { data } = event;
      await upsertUser(User.fromJSON(data));
      break;
  }

  return res.status(200).json("OK");
}
