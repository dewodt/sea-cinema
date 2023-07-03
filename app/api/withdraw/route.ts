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

  // Get user's balance
  const { balance } = (await prisma.user.findUnique({
    where: { username: username },
    select: { balance: true },
  })) as { balance: number };

  // Get user's input
  const formData = await req.formData();
  const amount = parseInt(formData.get("amount") as string) * -1;

  // Input empty or strings parseInt will return NaN
  if (!amount) {
    return NextResponse.json(
      { error: "Bad Request", message: "Withdrawal input should be a number!" },
      { status: 400 }
    );
  }

  // If input is number but outside the limit
  if (amount >= 0 || amount < -500000) {
    return NextResponse.json(
      { error: "Bad Request", message: "Withdrawal amount beyond the limit!" },
      { status: 400 }
    );
  }

  // If balance is not enough
  if (balance + amount < 0) {
    return NextResponse.json(
      { error: "Bad Request", message: "Your balance is not enough!" },
      { status: 400 }
    );
  }

  // Edit user's database
  // Note: username must exists because session exists (validated)
  await prisma.user.update({
    where: {
      username: username,
    },
    data: {
      balance: {
        increment: amount,
      },
      transactions: {
        create: {
          amount: amount,
        },
      },
    },
  });

  // Success response
  return NextResponse.json(
    { message: "Withdrawal successfull" },
    { status: 200 }
  );
};
