"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginForm(): React.JSX.Element {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Login successful");
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label htmlFor="login_email">Email</label>
        <input type="text" id="login_email" name="email" />
      </div>
      <div>
        <label htmlFor="login_password">Password</label>
        <input type="password" id="login_password" name="password" />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
