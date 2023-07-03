import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  // Check if the request is a POST request
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  // Check if user has session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unathorized Request" }, { status: 401 });
  }
  const username = session.username;

  // Get data from request body
  const formData = await req.formData();
  const amount = parseInt(formData.get("amount") as string);
  // Error when
  // Input empty parseInt will return Nan
  // Input <= 0
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  try {
    // Edit user's database
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
  } catch {
    // Error, username doesn't exist.
    return NextResponse.json(
      { error: "Username doesn't exists" },
      { status: 400 }
    );
  }

  // Success response
  return NextResponse.json({ message: "Top up successfull" }, { status: 200 });
};
