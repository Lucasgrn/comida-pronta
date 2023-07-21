import { prisma } from "../../../../../prisma/prisma";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { getSecret } from "@/lib/jwt";
import nookies, { setCookie } from 'nookies'

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

    const token = await new SignJWT({
      userId: user.id
    }).setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('9h')
      .sign(new TextEncoder().encode(getSecret()))

    return NextResponse.json({ user, token }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}