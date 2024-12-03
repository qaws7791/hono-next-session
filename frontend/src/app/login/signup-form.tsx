"use client";
import React from "react";

export default function SignupForm(): React.JSX.Element {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("name");

    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, username }),
    });

    if (res.ok) {
      alert("Signup successful");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <div>
        <label htmlFor="signup_name">Name</label>
        <input type="text" id="signup_name" name="name" />
      </div>
      <div>
        <label htmlFor="signup_email">Email</label>
        <input type="text" id="signup_email" name="email" />
      </div>
      <div>
        <label htmlFor="signup_password">Password</label>
        <input type="password" id="signup_password" name="password" />
      </div>

      <button type="submit">Signup</button>
    </form>
  );
}
