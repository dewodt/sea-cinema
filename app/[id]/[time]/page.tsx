import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookForm from "@/components/BookForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const MovieBook = async ({
  params,
}: {
  params: { id: string; time: string };
}) => {
  // Get session data
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to sign in
  if (!session) {
    redirect("/signin");
  }

  // Get params
  const { id, time } = params;

  // Get movie data
  const movie = await prisma.movie.findUnique({
    where: { id: id },
    select: { title: true, ticketPrice: true },
  });

  // Check if schedule exist / valid
  // ASSUMPTIONS: ALL SCHEDULE IS IN INDONESIAN WIB TIME.
  // Schedule time WIB: 12:00, 15:00, 18:00, 21:00
  // Schedule time UTC: 5:00, 8:00, 11:00, 14:00
  const availableSchedule = [];
  for (let i = 0; i < 4; i++) {
    const utcHour = 12 + 3 * i - 7;
    const timeTodayIndex = new Date().setUTCHours(utcHour, 0, 0, 0);
    const timeTomorrowIndex = timeTodayIndex + 24 * 60 * 60 * 1000;
    const timeNow = Date.now();

    // Check if schedule is passed
    if (timeNow < timeTodayIndex) {
      availableSchedule.push(timeTodayIndex);
    }

    // Tomorrow is no doubt available
    availableSchedule.push(timeTomorrowIndex);
  }

  // Check if date is not available schedule or if movie is not found
  if (!availableSchedule.includes(parseInt(time)) || !movie) {
    return notFound();
  }

  // Get sold tickets for particular showtime & movie
  const soldSeatObjects = await prisma.ticket.findMany({
    where: {
      movieId: id,
      dateTimeStart: new Date(parseInt(time)),
    },
    select: {
      seatNumber: true,
    },
  });
  const soldSeats = soldSeatObjects.map((seat) => seat.seatNumber);

  return (
    <main className="flex flex-auto justify-center px-5 py-10 xl:py-16">
      <BookForm
        id={id}
        title={movie.title}
        price={movie.ticketPrice}
        date={new Date(parseInt(time))}
        soldSeats={soldSeats}
      />
    </main>
  );
};

export default MovieBook;

export const generateMetadata = async ({
  params,
}: {
  params: { id: string; time: string };
}): Promise<Metadata> => {
  // Get params
  const { id, time } = params;

  // Get movie data
  const movie = await prisma.movie.findUnique({ where: { id: id } });

  // Check if schedule exist / valid
  // ASSUMPTIONS: ALL SCHEDULE IS IN INDONESIAN WIB TIME.
  // Schedule time WIB: 12:00, 15:00, 18:00, 21:00
  // Schedule time UTC: 5:00, 8:00, 11:00, 14:00
  const availableSchedule = [];
  for (let i = 0; i < 4; i++) {
    const utcHour = 12 + 3 * i - 7;
    const timeTodayIndex = new Date().setUTCHours(utcHour, 0, 0, 0);
    const timeTomorrowIndex = timeTodayIndex + 24 * 60 * 60 * 1000;
    const timeNow = Date.now();

    // Check if schedule is passed
    if (timeNow < timeTodayIndex) {
      availableSchedule.push(timeTodayIndex);
    }

    // Tomorrow is no doubt available
    availableSchedule.push(timeTomorrowIndex);
  }

  // If no movie is found
  if (!availableSchedule.includes(parseInt(time)) || !movie) {
    return {
      title: `Error 404 | SEA Cinema`,
      description: "Page is not found",
    };
  }

  return {
    title: `Book ${movie.title} | SEA Cinema`,
    description: `${movie.description}`,
    generator: "Next.js",
    applicationName: "SEA Cinema",
    colorScheme: "dark",
    openGraph: {
      title: `Book ${movie.title} | SEA Cinema`,
      description: `${movie.description}`,
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
      title: `Book ${movie.title} | SEA Cinema`,
      description: `${movie.description}`,
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
};
