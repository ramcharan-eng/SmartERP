import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supplier = await prisma.supplier.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        gstNumber: body.gstNumber,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
      },
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create supplier" },
      { status: 500 }
    );
  }
}