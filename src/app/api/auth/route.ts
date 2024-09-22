import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/server/firebase-admin";

export async function POST(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const provider = req.nextUrl.searchParams.get("provider");

    const { uid } = await req.json();

    try {
        const userDoc = await firestore.collection("users").doc(uid).get();
        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const user = userDoc.data();
        console.log(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }

    console.log(code, provider);

    if (!code || !provider) {
        return NextResponse.json({ error: "No code or provider provided" }, { status: 400 });
    }

    return NextResponse.json({ code, provider });
}