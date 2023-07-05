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
  const id = formData.get("id") as string; // Get ticket id

  // Check if ticket exists or no and check if user owns the ticket
  const ticket = await prisma.ticket.findUnique({
    where: { id: id },
    include: {
      user: { select: { username: true } },
      movie: { select: { ticketPrice: true } },
    },
  });
  if (!ticket || ticket.user.username !== username) {
    return NextResponse.json(
      { error: "Bad Request", message: "You do not own this ticket!" },
      { status: 400 }
    );
  }
  const { ticketPrice } = ticket.movie;

  // Check if ticket is already expired or no
  if (Date.now() >= ticket.dateTimeStart.getTime()) {
    return NextResponse.json(
      { error: "Bad Request", message: "Ticket is already expired!" },
      { status: 400 }
    );
  }

  // Create ticket and update user's balance and transaction record
  await prisma.user.update({
    where: { username: username },
    data: {
      balance: { increment: ticketPrice },
      transactions: { create: { amount: ticketPrice } },
      tickets: { delete: { id: id } },
    },
  });

  return NextResponse.json(
    { message: "Cancel ticket success" },
    { status: 200 }
  );
};
