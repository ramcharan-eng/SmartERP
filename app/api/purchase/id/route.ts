import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  try {
    const purchase = await prisma.purchaseInvoice.findUnique({
      where: {
        id,
      },

      include: {
        supplier: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { message: "Purchase not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(purchase);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch purchase" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  try {
    const body = await req.json();

    await prisma.purchaseInvoiceItem.deleteMany({
      where: {
        purchaseInvoiceId: id,
      },
    });

    const purchase = await prisma.purchaseInvoice.update({
      where: {
        id,
      },

      data: {
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

    return NextResponse.json(purchase);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update purchase" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  try {
    await prisma.purchaseInvoice.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Purchase Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete purchase" },
      { status: 500 }
    );
  }
}