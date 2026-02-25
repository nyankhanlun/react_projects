import { notFound } from 'next/navigation';
import UserForm from '../../user-form';
import { userById } from '@/app/actions/users_route';
import Header from '@/components/Header/header';

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
    <main className="w-full min-h-screen flex flex-col px-5 sm:px-10 py-5 bg-[#e1efff]">
          <div className="flex justify-end w-full mb-5">
            <Header />
          </div>
          <h1 className='text-center'>Edit User</h1>
          <a href="/users" className='mb-5'>← Back to users</a>
          <UserForm user={user}/>
        </main>
    </>
   
  );
}
