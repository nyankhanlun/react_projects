import { clientAuth } from "@/lib/firebase-client";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUserById, deleteUser } from '../../actions/users';
import { Suspense } from "react";
import { userById } from "@/app/actions/users_route";
import UserDetailClient from "@/components/UserDetailClientPage";



type Props = {
  params: Promise<{ id: string }>;
};



export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;

  const user = await userById(id);
  if (!user) notFound();

  return (
    <Suspense fallback={<p>Fetching user detail...</p>} >
      <UserDetailClient user={user} />
    </Suspense>

  );
}
