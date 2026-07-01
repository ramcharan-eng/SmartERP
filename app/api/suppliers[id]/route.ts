import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supplier = await prisma.supplier.findUnique({
    where: { id },
  });

  return NextResponse.json(supplier);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const supplier = await prisma.supplier.update({
    where: { id },
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
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.supplier.delete({
    where: { id },
  });

  return NextResponse.json({
    message: "Deleted Successfully",
  });
}