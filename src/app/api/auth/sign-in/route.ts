import { NextResponse } from 'next/server';
import { firestore } from '@/server/firebase-admin';
import { UserSignInDto } from '@/common/user-sign-in.dto';
import jwt from 'jsonwebtoken';
import { Role } from '../../../../common/roles.enum';

export async function POST(req: Request) {
	const { uid, email, displayName, photoURL } = await req.json();

	if (!uid || !email || !displayName || !photoURL) {
		return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
	}

	const userSignInDto: UserSignInDto = {
		uid: uid,
		email: email,
		displayName: displayName,
		photoURL: photoURL,
	};

	try {
		const userRef = firestore.collection('users').doc(uid);

		await userRef.set(userSignInDto);

		const payload: jwt.JwtPayload = {
			sub: uid,
			aud: 'okul-app',
			roles: [Role.User],
			email: email,
			displayName: displayName,
			photoURL: photoURL,
			iat: Math.floor(Date.now() / 1000),
			iss: 'okul-app',
		};

		const jwtSecret = process.env.NEXT_SERVER_JWT_SECRET;

		if (!jwtSecret) {
			throw new Error('JWT_SECRET is not set');
		}
		// Create JWT token
		const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

		// Create response with cookie
		const response = NextResponse.json(
			{ message: 'User upserted', userId: userRef.id },
			{ status: 200 }
		);

		// Set cookie
		response.cookies.set('_okul_app_jwt', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: payload.exp && payload.iat ? payload.exp - payload.iat : 86400,
			path: '/',
		});

		return response;

	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
		}
		return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
	}
}
