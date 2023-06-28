import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

const redis = Redis.fromEnv();
// ratelimiter for mutate duration, limits requests to 3 per 1 minute by user ID
const ratelimitDuration = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
});

// ratelimiter for mutate bg color, limits requests to 6 per 1 minute by user ID
const ratelimitUpdateBG = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(6, "60 s"),
});

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
      const { success } = await ratelimitUpdateBG.limit(userID);
      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Try again in a bit.",
        });
      }

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
  getAllUserSettings: privateProcedure.query(async ({ ctx }) => {
    const userID = ctx.currentUser;
    const res = await ctx.prisma.userSetting.findMany({
      where: {
        userId: userID,
        OR: [
          {
            key: "long-break-duration",
          },
          {
            key: "bg-color",
          },
          {
            key: "short-break-duration",
          },
          {
            key: "pomo-duration",
          },
          {
            key: "alarm-sound",
          },
        ],
      },
    });

    const userSettings = res.reduce((result, setting) => {
      result[setting.key] = setting.value;
      return result;
    }, {} as { [key: string]: string });

    return userSettings;
  }),

  mutatePomoduration: privateProcedure
    .input(
      z.object({
        pomoduration: z.string(),
        shortduration: z.string(),
        longduration: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userID = ctx.currentUser;
      const { success, pending, limit, reset, remaining } =
        await ratelimitDuration.limit(userID);

      if (!success)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Try again in a bit.",
        });

      const { pomoduration, shortduration, longduration } = input;
      await ctx.prisma.userSetting.updateMany({
        where: {
          userId: userID,
          key: "pomo-duration",
        },
        data: {
          value: pomoduration,
        },
      });
      await ctx.prisma.userSetting.updateMany({
        where: {
          userId: userID,
          key: "short-break-duration",
        },
        data: {
          value: shortduration,
        },
      });
      await ctx.prisma.userSetting.updateMany({
        where: {
          userId: userID,
          key: "long-break-duration",
        },
        data: {
          value: longduration,
        },
      });
    }),
});
