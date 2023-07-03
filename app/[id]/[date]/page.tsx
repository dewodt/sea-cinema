import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BookForm from "@/components/BookForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string; date: string };
}): Promise<Metadata> => {
  // Get params
  const { id, date } = params;

  // Get movie data
  const movie = await prisma.movie.findUnique({ where: { id: id } });

  // Available schedule (n times Today and 4x Tomorrow, 0 <= n <= 4 times because depends on the time of today)
  const availableSchedule = [];
  for (let i = 0; i < 4; i++) {
    const hour = 12 + 3 * i;
    const timeTodayIndex = new Date().setHours(hour, 0, 0, 0);
    const timeTomorrowIndex = timeTodayIndex + 24 * 60 * 60 * 1000;
    const timeNow = Date.now();

    // Add to available schedule if schedule is not passed
    if (timeNow < timeTodayIndex) {
      availableSchedule.push(timeTodayIndex);
    }

    // Tomorrow is no doubt available
    availableSchedule.push(timeTodayIndex, timeTomorrowIndex);
  }

  // If no movie is found
  if (!availableSchedule.includes(parseInt(date)) || !movie) {
    return {
      title: `Error 404 | SEA Cinema`,
      description: "Page is not found",
    };
  }

  return {
    title: `Book ${movie.title} | SEA Cinema`,
    description: `${movie.description}`,
  };
};

const MovieBook = async ({
  params,
}: {
  params: { id: string; date: string };
}) => {
  // Get session data
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to sign in
  if (!session) {
    redirect("/signin");
  }

  // Get params
  const { id, date } = params;

  // Get movie data
  const movie = await prisma.movie.findUnique({
    where: { id: id },
    select: { title: true, ticketPrice: true },
  });

  // Available schedule (n times Today and 4x Tomorrow, 0 <= n <= 4 times because depends on the time of today)
  const availableSchedule = [];
  for (let i = 0; i < 4; i++) {
    const hour = 12 + 3 * i;
    const timeTodayIndex = new Date().setHours(hour, 0, 0, 0);
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
  if (!availableSchedule.includes(parseInt(date)) || !movie) {
    return notFound();
  }

  // Get sold tickets for particular showtime & movie
  const soldSeatObjects = await prisma.ticket.findMany({
    where: {
      movieId: id,
      dateTimeStart: new Date(parseInt(date)),
    },
    select: {
      seatNumber: true,
    },
  });
  const soldSeats = soldSeatObjects.map((seat) => seat.seatNumber);

  return (
    <main className="flex flex-auto justify-center px-5 py-10 xl:py-16">
      <BookForm
        title={movie.title}
        price={movie.ticketPrice}
        date={date}
        soldSeats={soldSeats}
      />
    </main>
  );
};

export default MovieBook;
