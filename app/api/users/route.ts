import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { User } from "@/app/types"

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

    const docRef = adminDb.collection("users").doc(uid)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: docSnap.id,
      ...docSnap.data(),
    })

  } catch (error) {
    console.error("Fetch user error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}


