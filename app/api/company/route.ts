import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ==============================
// GET Company
// ==============================
export async function GET() {
  try {
    const company = await prisma.company.findFirst();

    return NextResponse.json(company);
  } catch (error) {
    console.error("GET Company Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch company",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// ==============================
// CREATE Company
// ==============================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingCompany = await prisma.company.findFirst();

    if (existingCompany) {
      return NextResponse.json(
        {
          success: false,
          message: "Company already exists",
        },
        { status: 400 }
      );
    }

    const company = await prisma.company.create({
      data: {
        companyName: body.companyName,
        ownerName: body.ownerName,
        email: body.email,
        phone: body.phone,
        gstNumber: body.gstNumber || null,
        panNumber: body.panNumber || null,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        financialYear: body.financialYear,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error("POST Company Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create company",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// ==============================
// UPDATE Company
// ==============================
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const existingCompany = await prisma.company.findFirst();

    if (!existingCompany) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found",
        },
        { status: 404 }
      );
    }

    const company = await prisma.company.update({
      where: {
        id: existingCompany.id,
      },
      data: {
        companyName: body.companyName,
        ownerName: body.ownerName,
        email: body.email,
        phone: body.phone,
        gstNumber: body.gstNumber || null,
        panNumber: body.panNumber || null,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        financialYear: body.financialYear,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error("PUT Company Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update company",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// ==============================
// DELETE Company
// ==============================
export async function DELETE() {
  try {
    const company = await prisma.company.findFirst();

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company not found",
        },
        { status: 404 }
      );
    }

    await prisma.company.delete({
      where: {
        id: company.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Company Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete company",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}