import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const notes = ctx.prisma.note.findMany({
      take: 10,
    });
    const users = await clerkClient.users.getUserList();

    return notes;
  }),
  createNote: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: "user_2PJ0oXvZnVTv9vy6txsi2qX53v9",
        },
      });
      return note;
    }),
});
