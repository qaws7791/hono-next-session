import { getSession } from "@/session";
import React from "react";

export default async function UserServer() {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const { user } = session;
  return (
    <div className="border rounded-lg border-gray-300 p-4">
      <span className="text-lg text-gray-600">
        this is rendered on the server
      </span>
      <h1>Hi {user.username}</h1>
      <p>Your email is {user.email}</p>
      <p>Your id is {user.id}</p>
    </div>
  );
}
