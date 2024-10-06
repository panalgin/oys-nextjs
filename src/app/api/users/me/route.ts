import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '../../../../server/withAuth';
import { User } from '../../../../common/user';

export const GET = withAuth(async (req: NextRequest, user: User) => {
  try {
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
});
