import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase-admin'; // Adjust the path as necessary
import { UserSignInDto } from '@/lib/contacts/user-sign-in.dto';

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
		return NextResponse.json({ message: 'User upserted', userId: userRef.id }, { status: 200 });

	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
		}
		return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
	}
}
