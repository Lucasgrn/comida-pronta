import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { Product } from "@prisma/client";
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id)
  const { name, price }: Product = await req.json()
  try {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        price,
        updatedAt: new Date()
      }
    })
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id)
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id: number = parseInt(params.id)
  try {
    await prisma.product.delete({
      where: {
        id
      }
    })
    return NextResponse.json({ sucess: "Product deleted successfully!" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}