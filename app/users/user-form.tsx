
'use client';

import { createUser, updateUser } from '../actions/users';
import { User } from '../types';

export default function UserForm({ user }: { user?: User }) {
  return (
    <form action={user ? updateUser : createUser} style={{ marginBottom: 10 }}>
      {user && <input type="hidden" name="id" value={user.id} />}
      <input name="name" placeholder="Name" defaultValue={user?.name} />
      <input name="email" placeholder="Email" defaultValue={user?.email} />
      <button type="submit">{user ? 'Update' : 'Create'}</button>
    </form>
  );
}
