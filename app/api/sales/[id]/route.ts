import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sale = await prisma.salesInvoice.findUnique({
    where: {
      id: params.id,
    },
    include: {
      items: true,
      customer: true,
    },
  });

  return NextResponse.json(sale);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  await prisma.salesInvoice.update({
    where: {
      id: params.id,
    },
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
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.salesInvoice.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}