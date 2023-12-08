import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})
export async function POST(request: NextRequest) {
  const { subject, text, html, to } = await request.json()
  if (!subject || !text) return new Response(null, { status: 400 })
  await transport.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: to || process.env.EMAIL_USERNAME,
    subject,
    text,
    html,
  })
  return new Response(null, {
    status: 200,
  })
}
