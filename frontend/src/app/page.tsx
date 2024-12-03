import LogoutButton from "@/app/logout-button";
import UserClient from "@/app/user-client";
import UserServer from "@/app/user-server";

import { getSession } from "@/session";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  if (session?.user) {
    return (
      <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-4xl font-bold">
          Welcome back, {session.user.username}!
        </h1>

        <div>
          <UserServer />
          <UserClient />
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-600">
            You&apos;re logged in as {session.user.email}.
          </p>
          <LogoutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">
        Welcome to the Next.js Auth Example!
      </h1>
      <UserClient />
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-gray-600">Please log in to continue.</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
