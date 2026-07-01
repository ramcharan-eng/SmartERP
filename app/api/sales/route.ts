import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sales = await prisma.salesInvoice.findMany({
    include: {
      customer: true,
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

  return NextResponse.json(sales);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoice = await prisma.salesInvoice.create({
      data: {
        invoiceNumber: `SINV-${Date.now()}`,
        customerId: body.customerId,
        isInterState: false,

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
        items: true,
      },
    });

    // Reduce Stock
    await prisma.product.update({
      where: {
        id: body.productId,
      },
      data: {
        stock: {
          decrement: body.quantity,
        },
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}