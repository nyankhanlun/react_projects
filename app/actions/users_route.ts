'use server';
import * as admin from 'firebase-admin';
import { redirect } from 'next/navigation';
import { deleteDoc } from 'firebase/firestore';
import { User } from "../types";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { adminDb, app } from '@/util/firebaseConfig';
import { revalidatePath } from 'next/cache';

const clientAuth = getAuth(app);

export async function registerUser(formData: FormData) {
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirm = String(formData.get("confirm_password"));

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
            confirmpassword: formData.get('confirm_password') as string,
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

    } catch (error: any) {
        console.error("Error during sign up:", error.message);
        return
    }
    revalidatePath('/login');
    redirect("/login");
}

export async function loginUser(email: any, password: any) {
    try {
        await signInWithEmailAndPassword(clientAuth, email, password);
    } catch (err: any) {
        return "Login failed";
    }
    revalidatePath('/songs');
    redirect("/songs");
}

export const logoutUser = async () => {
    await signOut(clientAuth);
    revalidatePath('/login');
    redirect("/login");
};



// export async function getUserCollectoin() {
//   const collectionRef = adminDb.collection('users');
//   const snapshot = await collectionRef.get();
//   const allUsers = snapshot.docs.map((doc: any) => ({
//     id: doc.id,
//     ...doc.data()
//   }));

//   return allUsers;
// }

// export async function userById(user: string): Promise<User | null> {
//   const docRef = adminDb.collection('users').doc(user.toString());
//   const doc = await docRef.get();
//   if (!doc.exists) {
//     console.log('No such document!');
//     return null;
//   }
//   return { id: doc.id, ...doc.data() } as User;
// }
