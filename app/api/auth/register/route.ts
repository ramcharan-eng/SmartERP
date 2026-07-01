import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    console.log("Original Password:", body.password);
    console.log("Hashed Password:", hashedPassword);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email,
        password: hashedPassword,
        role: body.role || "Admin",
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Registration Error:", error);

    return NextResponse.json(
      {
        message: "Registration failed",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}