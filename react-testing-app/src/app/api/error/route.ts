import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'Internal Server Error', message: 'This is a simulated error response for testing.' },
    { status: 500 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Bad Request', message: 'Simulated bad request response.' },
    { status: 400 }
  );
}
