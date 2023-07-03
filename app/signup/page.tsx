import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up | SEA Cinema",
  description: "Sign Up Page SEA Cinema",
};

const SignUp = async () => {
  // Get session data
  const session = await getServerSession(authOptions);

  // If logged in, redirect to home
  if (session) {
    return redirect("/");
  }

  return (
    <main className="flex flex-auto items-center justify-center bg-custom-soft-black px-5 py-10">
      <SignUpForm />
    </main>
  );
};

export default SignUp;
