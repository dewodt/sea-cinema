import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | SEA Cinema",
  description: "Sign In Page SEA Cinema",
};

const SignIn = () => {
  return (
    <main className="flex flex-auto items-center justify-center bg-custom-soft-black px-5 py-10">
      <SignInForm />
    </main>
  );
};

export default SignIn;
