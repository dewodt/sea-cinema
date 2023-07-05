import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  // Check method req
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  // Get form data
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const ageString = formData.get("age") as string;
  const age = parseInt(ageString);
  const password = formData.get("password") as string;

  // Make sure each field is not empty
  if (!name || !username || !ageString || !password) {
    return NextResponse.json(
      { error: "Bad Request", message: "All fields are required" },
      { status: 400 }
    );
  }

  // If age is not a number or out of range.
  if (isNaN(age) || age <= 0) {
    return NextResponse.json(
      { error: "Bad Request", message: "Age is not valid!" },
      { status: 400 }
    );
  }

  // Validate if username already exists
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (user) {
    return NextResponse.json(
      { error: "Bad Request", message: "Username already exists" },
      { status: 400 }
    );
  }

  // If username doesn't exist, create a new user
  // Create hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  // Update DB
  await prisma.user.create({
    data: {
      name: name,
      age: age,
      username: username,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "Sign up successfull" }, { status: 200 });
};
