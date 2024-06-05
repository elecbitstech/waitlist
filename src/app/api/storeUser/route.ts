import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../../../firebaseServiceAccountKey.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    const { email, name, phoneNumber, organizationName, designation } = await req.json();

    if (!email || !name || !phoneNumber || !organizationName || !designation) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const userRef = db.collection('signups').doc(email);
    const doc = await userRef.get();

    if (doc.exists) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    await db.collection('signups').doc(email).set({
      name,
      phoneNumber,
      organizationName,
      designation,
    });

    return NextResponse.json({ message: 'Email successfully added' }, { status: 200 });
  } catch (error) {
    console.error('Error adding document: ', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
