import Link from 'next/link';
import { getUsers } from '../actions/users';
import { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { adminDb } from './../../util/firebaseConfig'
import songs from './../../data/songs.json'

export default async function UsersPage() {
  async function uploadSongs() {
    const batch = adminDb.batch();

    songs.forEach((song) => {
      const docRef = adminDb.collection("songlist").doc(String(song.id));
    
      batch.set(docRef, {
        ...song,
         createdAt: Date.now(), 
      });
    });

    await batch.commit();
    console.log("✅ Songs uploaded successfully!");
  }

  // uploadSongs().catch(console.error);

  const users = await getUsers();
  return (
    <div style={{ padding: 20 }}>
      <h1>User Management</h1>

      {/* Create page link */}
      <Link href="/users/new">
        <button>Create User</button>
      </Link>

      <hr />

      {/* User list */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name} ({user.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
