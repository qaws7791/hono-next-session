"use client";
import { useSession } from "@/components/session-provider";
import React from "react";

export default function UserClient() {
  const { session } = useSession();

  if (!session) {
    return (
      <div className="border rounded-lg border-gray-300 p-4">
        <span className="text-lg text-gray-600">
          this is rendered on the client
        </span>
        <h1>Not logged in</h1>
        <p>Please log in to continue.</p>
      </div>
    );
  }

  const { user } = session;
  return (
    <div className="border rounded-lg border-gray-300 p-4">
      <span className="text-lg text-gray-600">
        this is rendered on the client
      </span>
      <h1>Hi {user.username}</h1>
      <p>Your email is {user.email}</p>
      <p>Your id is {user.id}</p>
    </div>
  );
}
