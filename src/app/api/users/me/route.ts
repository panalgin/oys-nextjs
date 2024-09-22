import { NextRequest, NextResponse } from 'next/server';
import { getUserByUid } from '@/server/user-service';

export async function GET(req: NextRequest) {
  const uid = req.headers.get('x-user-uid');

  if (!uid) {
    return NextResponse.json({ message: 'User UID is required' }, { status: 400 });
  }

  try {
    const user = await getUserByUid(uid);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
