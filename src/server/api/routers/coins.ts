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
  addTenCoins: privateProcedure.mutation(async ({ ctx }) => {
    const userID = ctx.currentUser;
    await ctx.prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        coins: {
          increment: 10,
        },
      },
    });
  }),
  addCoins: privateProcedure
    .input(
      z.object({
        amount: z.number().positive().int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userID = ctx.currentUser;
      const { amount } = input;
      await ctx.prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          coins: {
            increment: amount,
          },
        },
      });
    }),
  subtractCoins: privateProcedure
    .input(
      z.object({
        amount: z.number().positive().int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userID = ctx.currentUser;
      const { amount } = input;
      const { success } = await ratelimit.limit(userID);

      if (success) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: userID,
          },
          select: {
            coins: true,
          },
        });

        if (user && user.coins >= amount) {
          await ctx.prisma.user.update({
            where: {
              id: userID,
            },
            data: {
              coins: {
                decrement: amount,
              },
            },
          });
        } else {
          throw new Error("Insufficient coins.");
        }
      } else {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Try again in a bit.",
        });
      }
    }),
});
