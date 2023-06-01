import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const unlockedSettingsRouter = createTRPCRouter({
  getUnlockedBGColors: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;
    const unlockedBGColors = await ctx.prisma.unlockable.findMany({
      where: {
        userId: userID,
        type: "bg-color",
        purchased: true,
      },
    });
    return unlockedBGColors;
  }),
  getUnlockedFeatures: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser;
    const unlockedFeatures = await ctx.prisma.unlockable.findMany({
      where: {
        userId,
        type: "feature",
        purchased: true,
      },
    });
    return unlockedFeatures;
  }),
  getLockedBGColors: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;
    const lockedBGColors = await ctx.prisma.unlockable.findMany({
      where: {
        userId: userID,
        type: "bg-color",
        purchased: false,
      },
    });
    return lockedBGColors;
  }),
});
