import { jwtVerify, SignJWT } from "jose"

export const getSecret = () => {
  const secret = process.env.SECRET
  if (!secret || secret.length === 0) {
    throw new Error('Does not exist secret variable.')
  }
  return secret
}
export const verifyAuth = async (token) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(getSecret()))
    return payload
  } catch (error) {
    console.log(error)
    throw new Error('Invalid token.')
  }
} 