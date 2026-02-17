
'use client';

import Header from '@/components/Header/header';
import { createSong, updateSong } from '../actions/songs';
import { Song } from '../types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import classes from '@/app/songs/[id]/page.module.css'
import { onAuthStateChanged } from 'firebase/auth';
import { clientAuth } from '@/lib/firebase-client';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import LoadingComponent from '../loading';

const SongForm_chordWithLyrics = dynamic(() => import('@/components/Song/songForm_chordWithLyrics'), { ssr: false })
const SongForm_Lyrics = dynamic(() => import('@/components/Song/songForm_lyrics'), { ssr: false })
const SongForm_Chord = dynamic(() => import('@/components/Song/songForm_chord'), { ssr: false })

type SongFormProps = {
  song?: Song;
  actionsProp: "edit" | "create";
};
type SongMode = 'Lyrics' | 'ChordWithLyrics' | 'Chord';

export default function SongForm({ song, actionsProp }: SongFormProps) {
  const router = useRouter()
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lyricsWithChordLoading, setLyricsWithChordLoading] = useState(false);
  const [chordOnlyLoading, setChordOnlyLoading] = useState(false);


  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<SongMode>();
  const isSongMode = (value: string): value is SongMode =>
    value === 'Lyrics' || value === 'ChordWithLyrics' || value === 'Chord';

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (isSongMode(value)) {
      setMode(value);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        // console.log("Logged in:", user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  const [title, setTitle] = useState(song?.title ?? '');
  const [composer, setComposer] = useState(song?.composer ?? '');
  const [originalKey, setOriginalKey] = useState(song?.originalKey ?? '')
  const [timeSignature, setTimeSignature] = useState(song?.timeSignature ?? '');
  const [bpm, setBpm] = useState(song?.bpm ?? '');

  const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputComposerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComposer(event.target.value);
  };

  const handleInputOriginalKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalKey(event.target.value);
  };

  const handleTimeSignatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeSignature(event.target.value);
  };
  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(event.target.value);
  };

  async function handleSubmitChordSheet(data: Record<string, any>) {
    setError(null);
    setChordOnlyLoading(true);
    try {

      if (actionsProp === 'edit') {

        if (song?.id) {
          const obj = {
            ...song,
            title: title,
            composer: composer,
            originalKey: originalKey,
            chord_sections: data,
            createdAt: song?.createdAt,
            updatedAt: Date.now()
          }
          await updateSong(song.id, obj);
        } else {
          console.error("Cannot update song: Missing ID");
        }
      } else {
        const dateSt = Date.now()
        const obj = {
          id: dateSt.toString(),
          title: title,
          composer: composer,
          originalKey: originalKey,
          chord_sections: data,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        setTimeout(async () => {
          await createSong(obj);
        }, 100);
      }

    } catch (err: any) {
      setTimeout(() => setError(err.message || 'Something went wrong'), 3000);
    } finally {
      setChordOnlyLoading(false);
    }
    router.push('/songs');
  }
  async function handleSubmitLyrics(data: Record<string, any>) {
    setError(null);
    setLyricsLoading(true);
    try {
      if (actionsProp === 'edit') {
        if (song?.id) {
          const obj = {
            ...song,
            title: title,
            composer: composer,
            originalKey: originalKey,
            text_sections: data,
            createdAt: song?.createdAt,
            updatedAt: Date.now()
          }
          await updateSong(song.id, obj);
        } else {
          console.error("Cannot update song: Missing ID");
        }
      } else {
        const dateSt = Date.now()
        const obj = {
          id: dateSt.toString(),
          title: title,
          composer: composer,
          originalKey: originalKey,
          text_sections: data,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        setTimeout(async () => {
          await createSong(obj);
        }, 100);
      }

    } catch (err: any) {
      setTimeout(() => setError(err.message || 'Something went wrong'), 3000);
    } finally {
      setLyricsLoading(false);
    }
    router.push('/songs');
  }
  async function handleSubmitChordWithLyrics(data: Record<string, any>) {
    setError(null);
    setLyricsWithChordLoading(true);

    try {
      if (actionsProp === 'edit') {
        if (song?.id) {
          const obj = {
            ...song,
            title: title,
            composer: composer,
            originalKey: originalKey,
            timeSignature: timeSignature,
            bpm: bpm,
            key_sections: data,
            createdAt: song?.createdAt,
            updatedAt: Date.now()
          }
          await updateSong(song.id, obj);
        } else {
          console.error("Cannot update chord with lryics song: Missing ID");
        }
      } else {
        const dateStr = Date.now()
        const obj = {
          id: dateStr.toString(),
          title: title,
          composer: composer,
          originalKey: originalKey,
          timeSignature: timeSignature,
          bpm: bpm,
          key_sections: data,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        setTimeout(async () => {
          await createSong(obj);
        }, 100);
      }

    } catch (err: any) {
      setTimeout(() => setError(err.message || 'Something went wrong'), 3000);
    } finally {
      setLyricsWithChordLoading(false);
    }
    router.push('/songs');
  }
  return (
    <>
      <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] sm:items-start">
        <div className="flex justify-end w-full text-right">
          <Header />
        </div>

        {actionsProp === 'edit' &&
          <button
            onClick={() => router.back()}
            className={classes.responsive_back_btn}
          >
            <DoubleArrowLeftIcon />
            <span className={classes.btn_text}>Back</span>
          </button>
        }

        <div id="lyrics-form" className="w-full md:w-1xl lg:w-3xl mx-auto p-4 space-y-6 bg-white shadow-xl inset-shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="newOptions" className="font-medium mb-1">
                Choose Options
              </label>

              <select
                value={mode}
                onChange={handleModeChange}
                className="border rounded px-3 py-2"
              >
                <option >Choose Options</option>
                <option value="Lyrics">Lyrics Only</option>
                <option value="ChordWithLyrics">Lyrics & Chord</option>
                <option value="Chord">Chord Sheet Only</option>
              </select>
            </div>
          </div>
          {!mode && (
            <p className="text-sm text-red-500 mt-2">
              Please choose one option to start updating the song.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="title" className="font-medium mb-1">
                Title
              </label>
              <input
                value={title}
                onChange={handleInputTitleChange}
                placeholder="Enter Song Title"
                autoComplete="off"
                id="title"
                type="text"
                name="title"
                disabled={!mode}
                required
                className="border rounded px-3 py-2 
                disabled:bg-gray-200 
                disabled:text-gray-500 
                disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="composer" className="font-medium mb-1">
                Composer
              </label>
              <input
                value={composer}
                onChange={handleInputComposerChange}
                placeholder="Enter Composer or Artist"
                id="composer"
                type="text"
                name="composer"
                disabled={!mode}
                className="border rounded px-3 py-2 
                disabled:bg-gray-200 
                disabled:text-gray-500 
                disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="originalKey" className="font-medium mb-1">
                Original Key
              </label>
              <input
                value={originalKey}
                onChange={handleInputOriginalKeyChange}
                placeholder="Enter Original Key"
                id="originalKey"
                type="text"
                name="originalKey"
                disabled={!mode}
                className="border rounded px-3 py-2 
                disabled:bg-gray-200 
                disabled:text-gray-500 
                disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

        </div>

        <div className="w-full md:w-1xl lg:w-3xl mx-auto p-4 space-y-6 bg-white shadow-xl inset-shadow-xl">
          {mode === 'Lyrics' &&
            <>
              {lyricsLoading && <LoadingComponent />}
              {!lyricsLoading &&
                (
                  <SongForm_Lyrics song={song} onSubmit={handleSubmitLyrics}>
                    {error && (
                      <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
                        {error}
                      </div>
                    )}
                    <div className="flex flex-col  mt-5  sm:flex-row gap-3 justify-end">
                      <Link href={actionsProp === 'edit' ? `/songs/${song?.id}` : `/songs`} className="w-full sm:w-auto">
                        <button
                          className="w-full sm:w-auto px-4 py-2 border rounded text-gray-700 bg-[#E6E6E6] hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </Link>

                      {actionsProp === 'edit' ?
                        <>
                          {title !== '' && <button disabled={loading}
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                          }
                        </>
                        :
                        <>
                          {title !== '' && <button disabled={lyricsLoading}
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded 
                      disabled:bg-gray-200 
                      disabled:text-gray-500 
                      disabled:cursor-not-allowed
                      hover:bg-blue-700"
                          >
                            {lyricsLoading ? 'Adding...' : 'Add'}
                          </button>
                          }
                        </>
                      }
                    </div>
                  </SongForm_Lyrics>
                )
              }

            </>
          }
          {mode === 'ChordWithLyrics' && (
            <>
              {lyricsWithChordLoading && <LoadingComponent />}
              {!lyricsWithChordLoading && <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="timesignature" className="font-medium mb-1">
                      Time Signature
                    </label>
                    <input
                      value={timeSignature}
                      onChange={handleTimeSignatureChange}
                      id="timesignature"
                      type="text"
                      name="timesignature"
                      placeholder='Enter Time Signature'
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="bpm" className="font-medium mb-1">
                      BPM
                    </label>
                    <input
                      value={bpm}
                      onChange={handleBpmChange}
                      id="bpm"
                      type="text"
                      name="bpm"
                      required
                      placeholder='Enter BPM'
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <SongForm_chordWithLyrics song={song} onSubmit={handleSubmitChordWithLyrics}>
                  {error && (
                    <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
                      <p>Someting went wrong. try again!</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <Link href={actionsProp === 'edit' ? `/songs/${song?.id}` : `/songs`} className="w-full sm:w-auto">
                      <button
                        className="w-full sm:w-auto px-4 py-2 border rounded text-gray-700 bg-[#E6E6E6] hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </Link>

                    {actionsProp === 'edit' ?
                      <>
                        {title !== '' && <button disabled={loading}
                          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                        }
                      </>
                      :
                      <>
                        {title !== '' && <button disabled={lyricsWithChordLoading}
                          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded 
                          disabled:bg-gray-200 
                          disabled:text-gray-500 
                          disabled:cursor-not-allowed hover:bg-blue-700"
                        >
                          {lyricsWithChordLoading ? 'Adding...' : 'Add'}
                        </button>
                        }
                      </>
                    }
                  </div>

                </SongForm_chordWithLyrics>
              </>}
            </>
          )}
          {mode === 'Chord' && (
            <>
            {chordOnlyLoading && <LoadingComponent />}
            {!chordOnlyLoading && 
            <>
            <SongForm_Chord song={song} onSubmit={handleSubmitChordSheet}>
                {error && (
                  <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
                    <p>Someting went wrong. try again!</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-end mt-10">
                  <Link href={actionsProp === 'edit' ? `/songs/${song?.id}` : `/songs`} className="w-full sm:w-auto">
                    <button
                      className="w-full sm:w-auto px-4 py-2 border rounded text-gray-700 bg-[#E6E6E6] hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </Link>

                  {actionsProp === 'edit' ?
                    <>
                      {title !== '' && <button disabled={loading}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      }
                    </>
                    :
                    <>

                      {title !== '' && <button disabled={chordOnlyLoading}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {chordOnlyLoading ? 'Adding...' : 'Add'}
                      </button>
                      }
                    </>
                  }
                </div>
              </SongForm_Chord>
            </>}
              
            </>
          )}

        </div>

      </main>
    </>
  );
}
