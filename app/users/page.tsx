import Link from 'next/link';
import { getUsers } from '../actions/users';

export default async function UsersPage() {
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
