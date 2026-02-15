'use server';


import { adminDb, adminAuth } from "@/lib/firebase-admin";
import { clientAuth } from "@/lib/firebase-client";
// import { adminDb } from './../../util/firebaseConfig'
import * as admin from 'firebase-admin';
import { redirect } from 'next/navigation';
import { deleteDoc } from 'firebase/firestore';
import { User } from "../types";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";



export async function registerUser(formData: FormData) {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirm = String(formData.get("confirmpassword"));

  if (password !== confirm) {
    throw new Error("Passwords do not match");
  }

  try {
    const cred = await createUserWithEmailAndPassword(clientAuth, email, password);
    await updateProfile(cred.user, {
      displayName: name
    });

    const user: User = {
      id: cred.user.uid,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmpassword: formData.get('confirmpassword') as string,
      country: formData.get('country') as string,
      role: 'user',
      plan: 'free',
      teamId: '',
      createdAt: Date.now().toString(),
      onboardingDone: false,
    };

    const collectionRef = adminDb.collection('users');
    await collectionRef.doc(user?.id).set(
      user
    );
    redirect("/login");
  } catch (error: any) {
    console.error("Error during sign up:", error.message);
  }
}

export async function getUserCollectoin() {
  const collectionRef = adminDb.collection('users');
  const snapshot = await collectionRef.get();
  const allUsers = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  }));

  return allUsers;
}

export async function userById(user: string): Promise<User | null> {
  const docRef = adminDb.collection('users').doc(user.toString());
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  }
  return { id: doc.id, ...doc.data() } as User;
}


