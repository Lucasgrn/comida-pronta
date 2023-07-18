import { prisma } from "../../../../../prisma/prisma";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

export async function POST(req: Request) {
  const { username, password }: User = await req.json()
  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!user || !await compare(password, user?.password)) {
      return NextResponse.json({ error: "Username or Password incorrect!" }, { status: 401 })
    }
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}