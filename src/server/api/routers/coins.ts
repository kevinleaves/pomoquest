import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const coinsRouter = createTRPCRouter({
  getCoins: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (user) {
      return user.coins;
    }
  }),
});
