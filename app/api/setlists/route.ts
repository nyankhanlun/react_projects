import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function POST(req: Request) {
  try {
    const { uid, songs } = await req.json()

    if (!uid) {
      return NextResponse.json(
        { error: "Missing UID" },
        { status: 400 }
      )
    }

    await adminDb
      .collection("setlists")
      .doc(uid)
      .set(
        {
          songs: songs,
        },
        { merge: true }
      )

    //     await adminDb.collection("setlists").doc(uid).update({
    //   songs: admin.firestore.FieldValue.arrayUnion(song),
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving setlist:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")

    if (!uid) {
      return NextResponse.json(
        { error: "Missing UID" },
        { status: 400 }
      )
    }

    const docRef = adminDb.collection("setlists").doc(uid)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return NextResponse.json({ songs: [] })
    }

    return NextResponse.json({
      songs: docSnap.data()?.songs || [],
    })
  } catch (error) {
    console.error("Fetch setlist error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { uid, songId, deleteDoc } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "Missing uid" },
        { status: 400 }
      );
    }

    const docRef = adminDb.collection("setlists").doc(uid);

    if (deleteDoc) {
      // 🔥 Delete whole document
      await docRef.delete();
    } else {
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 }
        );
      }

      const currentSongs = docSnap.data()?.songs || [];

      const updatedSongs = currentSongs.filter(
        (song: any) => song.id !== songId
      );

      if (updatedSongs.length === 0) {
        await docRef.delete();
      } else {
        await docRef.set(
          { songs: updatedSongs },
          { merge: true }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to update list" },
      { status: 500 }
    );
  }
}
