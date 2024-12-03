import { Hono } from "hono";
import type { Context } from "../index.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { sessionService } from "../lib/session.js";
import { deleteCookie, setCookie } from "hono/cookie";

const authRouter = new Hono<Context>();

authRouter
  .get("/session", async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user) {
      return c.json({ message: "Not logged in" }, 401);
    }

    return c.json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  })
  .post(
    "/login",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    ),
    async (c) => {
      const body = c.req.valid("json");

      const existingUser = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, body.email))
        .get();

      if (!existingUser) {
        return c.json({ error: "Invalid email or password" }, 401);
      }

      const isValidPassword = await verifyPassword(
        existingUser.hashedPassword,
        body.password
      );

      if (!isValidPassword) {
        return c.json({ error: "Invalid email or password" }, 401);
      }
      const token = sessionService.generateSessionToken();
      const session = await sessionService.createSession(
        token,
        existingUser.id
      );

      setCookie(c, "s_id", token, {
        domain: "localhost",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        expires: session.expiresAt,
      });

      return c.json({ message: "Logged in" });
    }
  )
  .post(
    "/register",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        username: z.string().min(3),
      })
    ),
    async (c) => {
      const body = c.req.valid("json");
      const existingUser = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, body.email))
        .get();
      if (existingUser) {
        return c.json({ error: "User already exists" }, 400);
      }
      const hashedPassword = await hashPassword(body.password);
      await db.insert(userTable).values({
        email: body.email,
        username: body.username,
        hashedPassword,
      });
      return c.json({ message: "User created" });
    }
  )
  .post("/logout", async (c) => {
    const user = c.get("user");
    const session = c.get("session");

    if (!user || !session) {
      return c.json({ message: "Not logged in" }, 401);
    }

    await sessionService.invalidateSession(session.id);
    // delete the session cookie
    deleteCookie(c, "s_id");
    return c.json({ message: "Logged out" });
  });

export { authRouter };
