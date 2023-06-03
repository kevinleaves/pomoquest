import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { User } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { prisma } from "../../server/db";

type UnwantedKeys =
  | "emailAddresses"
  | "firstName"
  | "lastName"
  | "primaryEmailAddressId"
  | "primaryPhoneNumberId"
  | "phoneNumbers";

interface UserInterface extends Omit<User, UnwantedKeys> {
  email_addresses: {
    email_address: string;
    id: string;
  }[];
  primary_email_address_id: string;
  first_name: string;
  last_name: string;
  primary_phone_number_id: string;
  phone_numbers: {
    phone_number: string;
    id: string;
  }[];
}

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }
  const { id: userId } = evt.data;
  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    await prisma.user.create({
      data: {
        id: userId,
        coins: 50,
      },
    });

    await prisma.userSetting.createMany({
      data: [
        {
          userId,
          key: "bg-color",
          value: "#E3DFF2",
        },
        {
          userId,
          key: "alarm-sound",
          value: "/basicalarm.wav",
        },
        {
          userId,
          key: "pomo-duration",
          value: "25",
        },
        {
          userId,
          key: "short-break-duration",
          value: "5",
        },
        {
          userId,
          key: "long-break-duration",
          value: "15",
        },
      ],
    });
    await prisma.unlockable.createMany({
      data: [
        {
          userId,
          type: "bg-color",
          value: "#C4A1FF",
          label: "purple",
          cost: 100,
        },
        {
          userId,
          type: "bg-color",
          value: "#90EE90",
          label: "green",
          cost: 100,
        },
        {
          userId,
          type: "bg-color",
          value: "#FFB2EF",
          label: "pink",
          cost: 900,
        },
        {
          userId,
          type: "bg-color",
          value: "#E3DFF2",
          label: "grey",
          cost: 50,
        },
        {
          userId,
          type: "bg-color",
          value: "#69D2E7",
          label: "blue",
          cost: 50,
        },
      ],
    });
    return res.status(200).json({});
  }

  // delete user => delete all their rows from db
  if (eventType === "user.deleted") {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  console.log(`User ${userId} was ${eventType}`);

  res.status(201).json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
  data: UserInterface;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";
