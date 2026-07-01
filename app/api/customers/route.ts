import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ======================
// GET ALL CUSTOMERS
// ======================
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

// ======================
// CREATE CUSTOMER
// ======================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        gstNo: body.gstNo || null,
        address: body.address || null,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create customer" },
      { status: 500 }
    );
  }
}