export async function POST() {
  try {
    const invoice = await prisma.salesInvoice.create({
      data: {
        invoiceNumber: "INV-002",

        customerId: "cmqqftiom00007b38vt4z1kkf",

        subtotal: 50000,
        cgstTotal: 4500,
        sgstTotal: 4500,
        igstTotal: 0,
        grandTotal: 59000,

        items: {
          create: [
            {
              productId: "cmqqgr1h000027byo1bybg1gt",
              quantity: 1,
              rate: 50000,
              gstRate: 18,

              amount: 50000,
              cgst: 4500,
              sgst: 4500,
              igst: 0,

              total: 59000,
            },
          ],
        },
      },

      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
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