import Link from "next/link";
import Button from "@/components/Button";
import type { Metadata } from "next";

const NotFound = () => {
  return (
    <main className="flex flex-auto flex-col items-center justify-center gap-4 px-5 py-10 font-inter xl:gap-6">
      <h1 className="text-center text-4xl font-bold leading-none text-custom-light-red xl:text-5xl xl:leading-none">
        Error 404
      </h1>
      <p className="text-center text-lg font-bold leading-tight text-custom-white xl:text-xl xl:leading-tight">
        The page you&apos;re looking for doesn&apos;t exist
      </p>
      <Link href="/">
        <Button type="button" color="red" paddingX="30px" paddingY="15px">
          Home
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: "Error 404 | SEA Cinema",
  description: "Error 404 page of SEA Cinema",
  generator: "Next.js",
  applicationName: "SEA Cinema",
  colorScheme: "dark",
  openGraph: {
    title: "Error 404 | SEA Cinema",
    description: "Error 404 page of SEA Cinema",
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
    title: "Error 404 | SEA Cinema",
    description: "Error 404 page of SEA Cinema",
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
