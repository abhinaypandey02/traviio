import jwt from 'jsonwebtoken'

export function generateAccessToken(payload: { id: string }) {
  return jwt.sign(payload, process.env.SIGNING_KEY!, { expiresIn: 600 })
}
