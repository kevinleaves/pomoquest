import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const unlockedSettingsRouter = createTRPCRouter({
  getUnlockedBGColors: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;
    const unlockedBGColors = await ctx.prisma.unlockable.findMany({
      where: {
        userId: userID,
        type: "bg-color",
      },
    });
    return unlockedBGColors;
  }),
});
