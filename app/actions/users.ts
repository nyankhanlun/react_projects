
// 'use server';

// import { promises as fs } from 'fs';
// import path from 'path';
// import { User } from '../types';

// const filePath = path.join(process.cwd(), 'data/users.json');

// async function readUsers(): Promise<User[]> {
//   const data = await fs.readFile(filePath, 'utf-8');
//   return JSON.parse(data);
// }

// async function writeUsers(users: User[]) {
//   await fs.writeFile(filePath, JSON.stringify(users, null, 2));
// }

// export async function createUser(formData: FormData) {
//   const users = await readUsers();
//   const user: User = {
//     id: Date.now(),
//     name: formData.get('name') as string,
//     email: formData.get('email') as string,
//   };
//   users.push(user);
//   await writeUsers(users);
//   revalidatePath('/users');
//   redirect('/users');
// }

// import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';

// export async function updateUser(formData: FormData) {
//   const users = await readUsers();
//   const id = Number(formData.get('id'));
//   const index = users.findIndex(u => u.id === id);
//   users[index] = {
//     id,
//     name: formData.get('name') as string,
//     email: formData.get('email') as string,
//   };
//   await writeUsers(users);

//   revalidatePath('/users');
//   revalidatePath(`/users/${id}`);
//   redirect(`/users/${id}`);
// }


// export async function deleteUser(id: number) {
//   const users = await readUsers();
//   await writeUsers(users.filter(u => u.id !== id));
// }

// export async function getUsers(): Promise<User[]> {
//   return readUsers();
// }

// export async function getUserById(id: number) {
//   const users = await readUsers();
//   return users.find(u => u.id === id);
// }

