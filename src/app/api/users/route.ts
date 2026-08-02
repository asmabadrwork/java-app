import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

export async function GET() {
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = {
      id: users.length + 1,
      ...body,
    };
    return NextResponse.json({ user: newUser, message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
