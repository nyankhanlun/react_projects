import { notFound } from 'next/navigation';
import UserForm from '../../user-form';
import { userById } from '@/app/actions/users_route';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserEditPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  const user = await userById(id);
  if (!user) notFound();

  return (
    <>
     <a href={`/users/${user.id}`}>← Back to detail</a>
      <div style={{ padding: 20 }}>
      <h1 className='text-center'>Edit User</h1>

      <UserForm user={user} />

      <br />
     
    </div>
    </>
   
  );
}
