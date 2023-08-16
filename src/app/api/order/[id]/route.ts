import { prisma } from "../../../../../prisma/prisma";
import { ProductsOnOrders } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const orderId: number = parseInt(params.id)
  const { productId, quantity }: ProductsOnOrders = await req.json()
  try {
    const order = await prisma.productsOnOrders.create({
      data: {
        productId,
        quantity,
        orderId
      }
    })
    return NextResponse.json(order, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}