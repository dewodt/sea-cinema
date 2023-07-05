import type { Metadata } from "next";
import Cards from "@/components/Cards";
import { prisma } from "@/lib/prisma";

const Home = async () => {
  // Get all movies
  const movies = await prisma.movie.findMany();

  return (
    <main className="flex flex-auto flex-col items-center gap-8 px-5 py-10 lg:gap-10 xl:gap-12 xl:py-20 2xl:gap-14">
      <h1 className="text-center font-inter text-4xl font-bold text-custom-light-red xl:text-5xl">
        Now Playing
      </h1>
      <div className="grid w-fit grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-12 2xl:grid-cols-4 2xl:gap-14">
        {movies.map((movie) => {
          return (
            <Cards
              key={movie.id}
              id={movie.id}
              title={movie.title}
              ageRating={movie.ageRating}
              imageUrl={movie.imageUrl}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;

export const metadata: Metadata = {
  title: "SEA Cinema",
  description: "Home page of SEA Cinema",
  generator: "Next.js",
  applicationName: "SEA Cinema",
  colorScheme: "dark",
  openGraph: {
    title: "SEA Cinema",
    description: "Home page of SEA Cinema",
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
    title: "SEA Cinema",
    description: "Home page of SEA Cinema",
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
