
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { Song } from '../types';

const filePath = path.join(process.cwd(), 'data/songs.json');

async function readSongs(): Promise<Song[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeSongs(songs: Song[]) {
  await fs.writeFile(filePath, JSON.stringify(songs, null, 2));
}

export async function createSong(formData: any) {
  const songs = await readSongs();
  songs.push(formData);
  await writeSongs(songs);
}

export async function updateSong(formData: any) {
  const songs = await readSongs();
  const id = Number(formData?.id);
  const index = songs.findIndex(u => u.id === id);
  songs[index] = {
    ...formData
  };
  await writeSongs(songs);
}

export async function deleteSong(id: number) {
  const songs = await readSongs();
  await writeSongs(songs.filter(u => u.id !== id));
}

export async function getSongs(): Promise<Song[]> {
  return readSongs();
}

export async function getSongById(id: number) {
  const songs = await readSongs();
  return songs.find(u => u.id === id);
}