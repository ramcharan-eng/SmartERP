import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Company Settings
export async function GET() {
  try {
    let company = await prisma.company.findFirst();

    if (!company) {
      company = await prisma.company.create({
        data: {
          companyName: "",
        },
      });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// CREATE / UPDATE Company Settings
export async function POST(req: Request) {
  try {
    const body = await req.json();

    let company = await prisma.company.findFirst();

    if (!company) {
      company = await prisma.company.create({
        data: {
          companyName: body.companyName,
          gstNumber: body.gstNumber,
          email: body.email,
          phone: body.phone,
          address: body.address,
        },
      });
    } else {
      company = await prisma.company.update({
        where: {
          id: company.id,
        },
        data: {
          companyName: body.companyName,
          gstNumber: body.gstNumber,
          email: body.email,
          phone: body.phone,
          address: body.address,
        },
      });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to save settings" },
      { status: 500 }
    );
  }
}