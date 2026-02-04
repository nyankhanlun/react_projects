
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { Song } from '../types';
import { adminDb } from './../../util/firebaseConfig'
import * as admin from 'firebase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteDoc } from 'firebase/firestore';

export async function getSongsCollectoin() {
  const collectionRef = adminDb.collection('songlist');
  const snapshot = await collectionRef.get();
  const allSongs = snapshot.docs.map((doc : any) => ({
    id: doc.id,
    ...doc.data()
  }));
  
  return allSongs;
}

export async function songById(songId: string): Promise<Song | null> {
  const docRef = adminDb.collection('songlist').doc(songId.toString());
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return null;
  }
  return { id: doc.id, ...doc.data() } as Song;
}

export async function updateSong(songId: string, data: Song) {
  const docRef = adminDb.collection('songlist').doc(songId);
  const payload = {
      ...data,
  }
  await docRef.set(payload, { merge: true });
}

export async function createSong(song: Song) {
  try {
  const collectionRef = adminDb.collection('songlist');
   const docRef = await collectionRef.doc(song?.id).set({
      ...song
    });
      revalidatePath('/songs');
      redirect('/songs');
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
}

export async function deleteSongById(songId: string) {
await adminDb.collection('songlist').doc(songId.toString()).delete();
revalidatePath('/songs');
redirect('/songs');
}

const filePath = path.join(process.cwd(), 'data/songs.json');

async function readSongs(): Promise<Song[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function getSongs(): Promise<Song[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeSongs(songs: Song[]) {
  await fs.writeFile(filePath, JSON.stringify(songs, null, 2));
}

// export async function createSong(formData: any) {
//   const songs = await readSongs();
//   songs.push(formData);
//   await writeSongs(songs);
// }

// export async function updateSong(formData: any) {
//   const songs = await readSongs();
//   const id = Number(formData?.id);
//   const index = songs.findIndex(u => u.id === id);
//   songs[index] = {
//     ...formData
//   };
//   await writeSongs(songs);
// }

// export async function deleteSong(id: number) {
//   const songs = await readSongs();
//   await writeSongs(songs.filter(u => u.id !== id));
// }

// export async function getSongById(id: number) {
//   const songs = await readSongs();
//   return songs.find(u => u.id === id);
// }
  // UPLOAD(func) data from json file 
  // async function uploadSongs() {
  //   const batch = adminDb.batch();

  //   songs.forEach((song) => {
  //     const docRef = adminDb.collection("songlist").doc(String(song.id));
    
  //     batch.set(docRef, {
  //       ...song,
  //        createdAt: Date.now(), 
  //     });
  //   });

  //   await batch.commit();
  //   console.log("✅ Songs uploaded successfully!");
  // }
  // use in component
   // uploadSongs().catch(console.error);
