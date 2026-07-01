import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const purchases = await prisma.purchaseInvoice.findMany({
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const invoice = await prisma.purchaseInvoice.create({
      data: {
        invoiceNumber:
          "PINV-" + Date.now(),

        supplierId: body.supplierId,

        subtotal: body.subtotal,

        cgstTotal: body.cgstTotal,

        sgstTotal: body.sgstTotal,

        igstTotal: body.igstTotal,

        grandTotal: body.grandTotal,

        items: {
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

      include: {
        supplier: true,
        items: true,
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to save purchase" },
      { status: 500 }
    );
  }
}