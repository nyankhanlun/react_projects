import { songById } from "@/app/actions/songs";
import { notFound } from "next/navigation";
import SongForm from "../../song-form";

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