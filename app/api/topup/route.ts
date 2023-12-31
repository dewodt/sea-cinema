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

  // Get data from request body
  const formData = await req.formData();
  const amount = parseInt(formData.get("amount") as string);

  // Non number will return Nan from parseInt
  if (!amount) {
    return NextResponse.json(
      { error: "Bad Request", message: "Top up input should be a number!" },
      { status: 400 }
    );
  }

  // Negative number input
  if (amount <= 0) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Top up amount should be larger than 0!",
      },
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
  return NextResponse.json({ message: "Top up successfull" }, { status: 200 });
};
