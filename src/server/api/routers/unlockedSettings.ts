import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

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
  purchaseItem: privateProcedure
    .input(
      z.object({
        itemId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userID = ctx.currentUser;
      const { itemId } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userID,
        },
        select: {
          coins: true,
        },
      });

      const item = await ctx.prisma.unlockable.findUnique({
        where: {
          id: itemId,
        },
        select: {
          cost: true,
        },
      });

      if (user && item && user.coins >= item.cost) {
        await ctx.prisma.unlockable.update({
          where: {
            id: itemId,
          },
          data: {
            purchased: true,
          },
        });
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Insufficient coins.",
        });
      }
    }),
});
