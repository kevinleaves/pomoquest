import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 1 requests per 10 seconds. prevents double click on 1 shop item
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

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
      const { success } = await ratelimit.limit(userID);

      const { itemId } = input;

      if (success) {
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
      } else {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Try again in a bit.",
        });
      }
    }),
});
