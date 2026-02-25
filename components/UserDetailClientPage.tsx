"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteUser } from "@/app/actions/users";

type Props = {
    user: any
}
export default function UserDetailClient({ user }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        console.log("Logged in:", user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;


    return <>
         <Link href="/users">← Back to users</Link>
      <div style={{ padding: 20 }}>
      <h1>User Detail</h1>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <hr />

      <div className='grid grid-cols-2 my-10'>
      <Link href={`/users/${user.id}/edit`}>
        <button>Edit User</button>
      </Link>

      <form action={deleteUser.bind(null, user.id)}>
        <button style={{ marginTop: 10 }}>Delete User</button>
      </form>
      </div>
      <br />
    </div>
    </>
}
