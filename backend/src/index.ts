import { serve } from "@hono/node-server";
import { Hono, type Env } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { userTable, type Session, type User } from "./db/schema.js";
import { sessionService } from "./lib/session.js";
import { authRouter } from "./routes/auth.js";
import { db } from "./db/index.js";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";

export interface Context extends Env {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}

const ORIGIN: string = "http://localhost:3000";

const app = new Hono<Context>();

app.use(logger());
app.use(
  "*",
  cors({
    origin: ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);
// csrf middleware
app.use(
  csrf({
    origin: ORIGIN,
  })
);

app.use("*", async (c, next) => {
  const sessionId = getCookie(c, "s_id");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await sessionService.validateSessionToken(
    sessionId
  );
  if (session === null) {
    // delete the session
    deleteCookie(c, "s_id");
    return next();
  }

  setCookie(c, "s_id", sessionId, {
    domain: "localhost",
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    expires: session.expiresAt,
  });
  c.set("user", user);
  c.set("session", session);
  return next();
});

app.route("/auth", authRouter);
app.get("/users", (c) => {
  const users = db
    .select({
      id: userTable.id,
      email: userTable.email,
      username: userTable.username,
    })
    .from(userTable)
    .all();

  return c.json({
    data: users,
  });
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 4000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
