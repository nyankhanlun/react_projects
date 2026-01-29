import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserById, deleteUser } from '../../actions/users';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  const user = await getUserById(userId);
  if (!user) notFound();

  return (
    <div style={{ padding: 20 }}>
      <h1>User Detail</h1>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <hr />

      {/* Go to edit page */}
      <Link href={`/users/${user.id}/edit`}>
        <button>Edit User</button>
      </Link>

      {/* Delete */}
      <form action={deleteUser.bind(null, user.id)}>
        <button style={{ marginTop: 10 }}>Delete User</button>
      </form>

      <br />
      <Link href="/users">← Back to users</Link>
    </div>
  );
}
