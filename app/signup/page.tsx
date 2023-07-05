import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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

export const metadata: Metadata = {
  title: "Sign Up | SEA Cinema",
  description: "Sign Up Page SEA Cinema",
  generator: "Next.js",
  applicationName: "SEA Cinema",
  colorScheme: "dark",
  openGraph: {
    title: "Sign Up | SEA Cinema",
    description: "Sign Up Page SEA Cinema",
    url: "https://cinema.dewodt.com",
    siteName: "SEA Cinema",
    images: [
      {
        url: "https://cinema.dewodt.com/sea-cinema-link-preview.png",
        width: 1200,
        height: 630,
        alt: "SEA Cinema",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | SEA Cinema",
    description: "Sign Up Page SEA Cinema",
    images: [
      {
        url: "https://cinema.dewodt.com/sea-cinema-link-preview.png",
        width: 1200,
        height: 630,
        alt: "SEA Cinema",
      },
    ],
  },
};
