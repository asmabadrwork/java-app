import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ user: { id: parseInt(id), name: `User ${id}` } });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await request.json();
    return NextResponse.json({ message: `User ${id} updated`, updatedData: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await request.json();
    return NextResponse.json({ message: `User ${id} partially updated`, patchedData: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ message: `User ${id} deleted successfully` }, { status: 200 });
}
