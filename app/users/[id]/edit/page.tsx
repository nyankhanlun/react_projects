import { notFound } from 'next/navigation';
import { getUserById } from '../../../actions/users';
import UserForm from '../../user-form';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserEditPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  const user = await getUserById(userId);
  if (!user) notFound();

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit User</h1>

      <UserForm user={user} />

      <br />
      <a href={`/users/${user.id}`}>← Back to detail</a>
    </div>
  );
}
