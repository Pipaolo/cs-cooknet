import { type NextApiRequest, type NextApiResponse } from "next";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const event = req.body as WebhookEvent;
  switch (event.type) {
    case "user.created":
      const { data } = event;
      await prisma.user.upsert({
        where: {
          clerkId: data.id,
        },
        create: {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address ?? "",
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          profileUrl: data.profile_image_url,
          username: data.username ?? "",
        },
        update: {
          email: data.email_addresses[0]?.email_address ?? "",
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          profileUrl: data.profile_image_url,
          username: data.username ?? "",
        },
      });
      break;
  }

  return res.status(200).json("OK");
}
