import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSongById, deleteSong } from '../../actions/songs';
import Header from '@/components/Header/header';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SongDetailPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  const song = await getSongById(userId);
  if (!song) notFound();

  return (
    <>
      <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] dark:bg-black sm:items-start">
        <div className="flex justify-end w-full text-right">
          <Header />
        </div>
<div style={{ padding: 20 }}>
        <h1>User Detail</h1>

        <p><strong>ID:</strong> {song.id}</p>
        <p><strong>Title:</strong> {song.title}</p>
        <p><strong>Composer:</strong> {song.composer}</p>

        <hr />

        {/* Go to edit page */}
        <Link href={`/songs/${song.id}/edit`}>
          <button>Edit User</button>
        </Link>

        {/* Delete */}
        {/* <form action={deleteSong.bind(null, song.id)}>
          <button style={{ marginTop: 10 }}>Delete User</button>
        </form> */}

        <br />
        <Link href="/songs">← Back to songs</Link>
      </div>
      </main>
      
    </>

  );
}
