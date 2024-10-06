import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@/common/user';
import { Role } from '../common/roles.enum';

async function authenticateUser(): Promise<User | null> {
	const cookieStore = cookies();
	const token = cookieStore.get('_okul_app_jwt')?.value;

	if (!token) {
		return null;
	}

	try {
		const jwtSecret = process.env.NEXT_SERVER_JWT_SECRET;
		if (!jwtSecret) {
			throw new Error('JWT_SECRET is not set');
		}

		const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

		// Here you would typically fetch the user data from your database
		// For this example, we'll just return the data from the token
		const user: User = {
			uid: decoded.sub as string,
			email: decoded.email as string,
			displayName: decoded.displayName as string,
			photoURL: decoded.photoURL as string,
			roles: decoded.roles as Array<Role>,
		};

		return user;
	} catch (error) {
		console.error('Error verifying token:', error);
		return null;
	}
}

export function withAuth(handler: (req: NextRequest, user: User) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const user = await authenticateUser();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, user);
  };
}