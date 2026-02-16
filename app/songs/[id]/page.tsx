import { notFound } from 'next/navigation';
import { songById } from '../../actions/songs';
import Header from '@/components/Header/header';
import dynamic from 'next/dynamic'

type Props = {
  params: Promise<{ id: string }>;
};

const SongDetailClientPage = dynamic(() => import('./SongDetail'))
export default async function SongDetailPage({ params }: Props) {
  const { id } = await params;
  const song  = await songById(id);
  if (!song) notFound();

  return (
    <>
      <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] sm:items-start">
                <div className="flex justify-end w-full text-right">
                    <Header />
                </div>
             <SongDetailClientPage song={song} />   
      </main>
    </>
  );
}
