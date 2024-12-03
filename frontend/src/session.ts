import { convertCookieToHeader, parseCookieValue } from "@/cookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type SessionPayload = {
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export async function fetchSession(
  cookie: string
): Promise<SessionPayload | null> {
  const sessionRes = await fetch("http://localhost:4000/auth/session", {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookie,
    },
  });

  if (!sessionRes.ok) {
    return null;
  }

  return sessionRes.json();
}

export async function getSession(): Promise<SessionPayload | null> {
  const allCookies = await cookies().then((cookies) => cookies.getAll());
  const cookieHeader = convertCookieToHeader(allCookies);
  return fetchSession(cookieHeader);
}

export const updateSession = async (req: NextRequest, res: NextResponse) => {
  const requestCookies = req.cookies.getAll();
  const cookieHeader = convertCookieToHeader(requestCookies);

  try {
    const updatedSessionResponse = await fetch(
      "http://localhost:4000/auth/session",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const responseCookies = updatedSessionResponse.headers.getSetCookie();

    responseCookies.forEach((cookieString) => {
      const cookie = parseCookieValue(cookieString);
      res.cookies.set(cookie);
    });
  } catch (error) {
    console.error("Error updating session:", error);
  }

  return res;
};
