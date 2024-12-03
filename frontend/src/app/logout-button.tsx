"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton(): JSX.Element {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      window.alert("Logged out successfully");
      return router.refresh();
    } else {
      return window.alert("Failed to log out");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
