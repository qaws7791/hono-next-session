import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type Cookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: Date;
  secure?: boolean;
  httpOnly?: boolean;
};

export const parseCookieValue = (cookieString: string): Cookie => {
  const cookieParts = cookieString.split(";").map((part) => part.trim());
  const [name, value] = cookieParts[0].split("=");
  const cookie: Cookie = { name, value };

  cookieParts.slice(1).forEach((part) => {
    const [key, value] = part.split("=");
    switch (key) {
      case "Domain":
        cookie.domain = value;
        break;
      case "Path":
        cookie.path = value;
        break;
      case "Expires":
        cookie.expires = new Date(value);
        break;
      case "Secure":
        cookie.secure = true;
        break;
      case "HttpOnly":
        cookie.httpOnly = true;
        break;
    }
  });

  return cookie;
};

export const convertCookieToHeader = (cookies: RequestCookie[]): string => {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
};
