import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a 2-second delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  return NextResponse.json({ message: 'Success after a 2-second delay' });
}
