import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

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
    }),
});
