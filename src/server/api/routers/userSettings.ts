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
  updateBgColor: privateProcedure
    .input(
      z.object({
        hexValue: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userID = ctx.currentUser;
      const { hexValue } = input;
      await ctx.prisma.userSetting.updateMany({
        where: {
          userId: userID,
          key: "bg-color",
        },
        data: {
          value: hexValue,
        },
      });
    }),

  getCurrentAlarmSound: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;

    const res = await ctx.prisma.userSetting.findMany({
      where: {
        userId: userID,
        key: "alarm-sound",
      },
    });

    if (res.length > 0) {
      const alarmSound = res[0]?.value;
      return alarmSound;
    }

    // fallback
    // return "/basicalarm.wav";
  }),
  getPomoDuration: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;

    const res = await ctx.prisma.userSetting.findMany({
      where: {
        userId: userID,
        key: "pomo-duration",
      },
    });

    if (res.length > 0) {
      const pomoDuration = res[0]?.value;
      return Number(pomoDuration);
    }

    // fallback
    // return 25;
  }),
  getShortBreakDuration: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;

    const res = await ctx.prisma.userSetting.findMany({
      where: {
        userId: userID,
        key: "short-break-duration",
      },
    });

    if (res.length > 0) {
      const shortBreakDuration = res[0]?.value;
      return Number(shortBreakDuration);
    }

    // fallback
    // return 5;
  }),
  getLongBreakDuration: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;

    const res = await ctx.prisma.userSetting.findMany({
      where: {
        userId: userID,
        key: "long-break-duration",
      },
    });

    if (res.length > 0) {
      const longBreakDuration = res[0]?.value;
      return Number(longBreakDuration);
    }

    // fallback
    // return 15;
  }),
});
