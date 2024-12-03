import LoginForm from "@/app/login/login-form";
import SignupForm from "@/app/login/signup-form";
import { getSession } from "@/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div>
      <h1>Login</h1>
      <div
        className="
        flex
        space-x-4
        justify-center
        items-center
      "
      >
        <LoginForm />
        <SignupForm />
      </div>
    </div>
  );
}
