import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  getCurrentBgColor: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;
    const settings = await ctx.prisma.userSetting.findMany({
      where: {
        userId: userID,
      },
    });
    const settingEntry = settings.find((setting) => setting.key === "bg-color");

    return settingEntry?.value;
  }),
});