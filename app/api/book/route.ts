import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  // Check if the request is a POST request
  if (req.method !== "POST") {
    return NextResponse.json(
      {
        error: "Method not allowed",
        message: "Only POSTS request is allowed!",
      },
      { status: 405 }
    );
  }

  // Check if user has session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unathorized Request", message: "You have to login first!" },
      { status: 401 }
    );
  }
  const username = session.username;

  // Get form data
  const formData = await req.formData();
  const id = formData.get("id") as string; // movie id
  const time = parseInt(formData.get("date") as string); // movie start time
  const date = new Date(time);
  const seats = (formData.get("seats") as string)
    .split(",")
    .map((seat) => parseInt(seat));

  // Check if movie exists
  const movie = await prisma.movie.findUnique({ where: { id: id } });
  if (!movie) {
    return NextResponse.json(
      { error: "Bad Request", message: "Movie does not exist!" },
      { status: 400 }
    );
  }
  const { ticketPrice } = movie;

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
  if (!availableSchedule.includes(time)) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Schedule does not exist or is expired!",
      },
      { status: 400 }
    );
  }

  // Check if seat number is valid
  const foundInvalid = seats.some((seat) => seat <= 0 || seat > 64);
  if (foundInvalid) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "A / Some seat(s) number is invalid",
      },
      { status: 400 }
    );
  }

  // Check if seat is purchased or no
  // Get all seats for that movie and date
  const soldSeatObjects = await prisma.ticket.findMany({
    where: {
      movieId: id,
      dateTimeStart: date,
    },
    select: {
      seatNumber: true,
    },
  });
  const soldSeats = soldSeatObjects.map((seat) => seat.seatNumber);
  const foundPurchased = seats.some((seat) => soldSeats.includes(seat));
  if (foundPurchased) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "The seat(s) has been purchased",
      },
      { status: 400 }
    );
  }

  // Check if user's balance is enough
  const { balance } = (await prisma.user.findUnique({
    where: { username: username },
    select: { balance: true },
  })) as { balance: number };
  const total = ticketPrice * seats.length;
  if (balance < total) {
    return NextResponse.json(
      { error: "Bad Request", message: "Not enough balance!" },
      { status: 400 }
    );
  }

  // Create data for ticket
  const data = seats.map((seat) => {
    return {
      movieId: id,
      dateTimeStart: date,
      seatNumber: seat,
    };
  });

  // Create ticket and update user's balance and transaction record
  await prisma.user.update({
    where: { username: username },
    data: {
      balance: { increment: total * -1 },
      transactions: { create: { amount: total * -1 } },
      tickets: { createMany: { data: data } },
    },
  });

  return NextResponse.json(
    { message: "Purchased Ticket Success" },
    { status: 200 }
  );
};
