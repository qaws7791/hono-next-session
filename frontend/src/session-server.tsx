import { SessionProvider } from "@/components/session-provider";
import { getSession } from "@/session";
import React from "react";

export default async function SessionServer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
