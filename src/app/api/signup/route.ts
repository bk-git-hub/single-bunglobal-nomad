import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const signUpSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(2),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = signUpSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    // Use the environment variable
    const backendUrl = `${process.env.API_BASE_URL}/users`;
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.message || 'Backend error' },
        { status: backendResponse.status }
      );
    }

    const responseData = await backendResponse.json();

    // Return the backend's response to the client
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Error forwarding request to backend:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
