import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return NextResponse.json({ message: `GET experience ${id}` });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return NextResponse.json({ message: `PUT experience ${id}` });
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return NextResponse.json({ message: `DELETE experience ${id}` });
}
