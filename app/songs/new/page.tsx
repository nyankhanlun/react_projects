import dynamic from 'next/dynamic'

const SongForm = dynamic(() => import('../song-form'))
export default function NewSongPage() {
    return <SongForm actionsProp="create" />
}