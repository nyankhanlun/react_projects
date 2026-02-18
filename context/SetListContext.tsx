"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { Song } from "@/app/types"
import { onAuthStateChanged } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";

type SetListContextType = {
  currentUserID: string
  setList: Song[]
  addToSetList: (song: Song) => Promise<void>
  removeFromSetList: (id: string) => Promise<void>
}

const SetListContext = createContext<SetListContextType | undefined>(undefined)

export function SetListProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [setList, setSetList] = useState<Song[]>([])
  const [currentUserID, setCurrentUserID] = useState<string>('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCurrentUserID(user.uid)
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchSetList = async () => {
    if (!currentUserID) return
    try {
      const res = await fetch(
        `/api/setlists?uid=${currentUserID}`
      )
      const data = await res.json()
      setSetList(data.songs || [])
    } catch (error) {
      console.error("Error fetching setlist:", error)
    }
  }

  useEffect(() => {
    if (currentUserID) {
      fetchSetList()
    }
  }, [currentUserID])

  const addToSetList = async (song: Song) => {
    if (setList.find((s) => s.id === song.id)) return

    const updated = [...setList, song]
    setSetList(updated)

    try {
      await fetch("/api/setlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: currentUserID,
          songs: updated,
        }),
      })
    } catch (error) {
      console.error("Error saving setlist:", error)
    }
  }

  const removeFromSetList = async (songId: string) => {
    if (!currentUserID) return

    // Update UI immediately (fast UX)
    const updated = setList.filter((song) => song.id !== songId)
    setSetList(updated)

    try {
      await fetch("/api/setlists", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: currentUserID,
          songId: songId,
        }),
      })
    } catch (error) {
      console.error("Error removing song:", error)
    }
  }

  return (
    <SetListContext.Provider value={{ currentUserID, setList, addToSetList, removeFromSetList }}>
      {children}
    </SetListContext.Provider>
  )
}

export function useSetList() {
  const context = useContext(SetListContext)
  if (!context) throw new Error("useSetList must be used inside provider")
  return context
}
