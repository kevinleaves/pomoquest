import { createTRPCRouter } from "~/server/api/trpc";
import { notesRouter } from "~/server/api/routers/notes";
import { coinsRouter } from "./routers/coins";
import { settingsRouter } from "./routers/userSettings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  notes: notesRouter,
  coins: coinsRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
