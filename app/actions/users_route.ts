'use server';

import { adminDb, adminAuth } from "@/lib/firebase-admin";
import { clientAuth } from "@/lib/firebase-client";
import { redirect } from 'next/navigation';
import { User } from "../types";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirm = formData.get("confirmpassword")?.toString() ?? "";

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  try {
    const cred = await createUserWithEmailAndPassword(clientAuth, email, password);
    await updateProfile(cred.user, {
      displayName: name
    });

    const user: User = {
      id: cred.user.uid,
      name: name,
      email: email,
      password: password,
      confirmpassword: confirm,
      country: '',
      role: 'user',
      plan: 'free',
      teamId: '',
      createdAt: Date.now().toString(),
      isUserEnable: true,
    };

    const collectionRef = adminDb.collection('users');
    await collectionRef.doc(user?.id).set(
      user
    );

  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return { error: "Email already exists" };
    }

    if (error.code === "auth/invalid-email") {
      return { error: "Invalid email address" };
    }

    return { error: "Something went wrong" };
  }
  redirect("/login");
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

export async function editUser(formData: FormData) {
  const uid = formData.get('id') as string
  const user: User = {
    id: uid,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmpassword: formData.get('confirmpassword') as string,
    country: formData.get('country') as string,
    role: formData.get('role') as string,
    plan: formData.get('plan') as string,
    teamId: formData.get('teamId') as string,
    createdAt: formData.get('createdAt') as string,
    isUserEnable: formData.get('isUserEnable') === "true",
  };
  try {
    const docRef = adminDb.collection('users').doc(uid);
    const payload = {
      ...user,
    }
    await docRef.set(payload, { merge: true });

  } catch (error: any) {
    console.error("Error during updating user data :", error.message);
  }
  redirect("/users");
}

export async function updateUserStatus(user: any) {
  try {
    const docRef = adminDb.collection('users').doc(user.id);
    const payload = {
      ...user,
      isUserEnable: false
    }
    await docRef.set(payload, { merge: true });

  } catch (error: any) {
    console.error("Error during updating user data :", error.message);
  }
  redirect("/users");
}

export async function updateUserEnableStatus(user: any) {
  try {
    await adminAuth.updateUser(user.id, {
      disabled: false,
    });
    const docRef = adminDb.collection('users').doc(user.id);
    const payload = {
      ...user,
      isUserEnable: true
    }
    await docRef.set(payload, { merge: true });
  } catch (error: any) {
    console.error("Error during updating user enable status :", error.message);
  }
  redirect("/users");
}