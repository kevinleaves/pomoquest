import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const notes = await ctx.prisma.note.findMany({
      take: 10,
    });
    // const users = await clerkClient.users.getUserList();
    return notes;
  }),
  createNote: privateProcedure
    .input(
      z.object({
        title: z.string().min(5).max(100),
        content: z.string().max(255),
      })
    )
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
  deleteNote: privateProcedure
    .input(z.object({ noteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { noteId } = input;
      const deleted = await ctx.prisma.note.delete({
        where: {
          id: noteId,
        },
      });
      return deleted;
    }),
});
