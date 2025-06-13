import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would generate or serve a real PDF file
  // For this example, we'll just redirect to the resume page
  return NextResponse.redirect(new URL("/resume", "https://example.com"))
}
