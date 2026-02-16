import { songById } from "@/app/actions/songs";
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic'

const SongForm = dynamic(() => import('../../song-form'))
type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditSongForm({ params }: Props) {
    const { id } = await params;
    const song = await songById(id);
    if (!song) notFound();

    return (
        <>
            <SongForm song={song} actionsProp="edit" />
        </>
    )
}