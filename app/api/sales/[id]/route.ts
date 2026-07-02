import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sale = await prisma.salesInvoice.findUnique({
    where: { id },
    include: {
      items: true,
      customer: true,
    },
  });

  return NextResponse.json(sale);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  await prisma.salesInvoice.update({
    where: { id },
    data: {
      customerId: body.customerId,
      subtotal: body.subtotal,
      cgstTotal: body.cgstTotal,
      sgstTotal: body.sgstTotal,
      igstTotal: body.igstTotal,
      grandTotal: body.grandTotal,
      items: {
        deleteMany: {},
        create: [
          {
            productId: body.productId,
            quantity: body.quantity,
            rate: body.rate,
            gstRate: body.gstRate,
            amount: body.subtotal,
            cgst: body.cgstTotal,
            sgst: body.sgstTotal,
            igst: body.igstTotal,
            total: body.grandTotal,
          },
        ],
      },
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.salesInvoice.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}