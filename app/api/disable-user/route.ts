import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    await adminAuth.updateUser(uid, {
      disabled: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to disable user" },
      { status: 500 }
    );
  }
}

// Call API from React Component
// const disableUser = async (uid: string) => {
//   await fetch("/api/disable-user", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ uid }),
//   });

//   alert("User disabled");
// };

// Re-enable User
// await authAdmin.updateUser(uid, {
//   disabled: false,
// });