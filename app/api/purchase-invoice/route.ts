import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoice = await prisma.purchaseInvoice.create({
      data: {
        invoiceNumber: body.invoiceNumber,
        supplierId: body.supplierId,
        subtotal: body.subtotal,
        cgstTotal: body.cgstTotal,
        sgstTotal: body.sgstTotal,
        igstTotal: body.igstTotal,
        grandTotal: body.grandTotal,

        items: {
          create: body.items,
        },
      },
      include: {
        supplier: true,
        items: true,
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}