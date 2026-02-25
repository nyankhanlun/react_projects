import Header from '@/components/Header/header';
import UserForm from '../user-form';

export default function CreateUserPage() {

  return (
    <main className="w-full min-h-screen flex flex-col px-5 sm:px-10 py-5 bg-[#e1efff]">
      <div className="flex justify-end w-full mb-5">
        <Header />
      </div>
      <a href="/users" className='mb-5'>← Back to users</a>
      <UserForm />
    </main>
  )
}
