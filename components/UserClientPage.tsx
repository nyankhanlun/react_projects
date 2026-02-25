"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UseAutoLogout } from "./AutoLogout";
import Header from "./Header/header";
import { useSetList } from "@/context/SetListContext";
import { updateUserEnableStatus, updateUserStatus } from "@/app/actions/users_route";
import clsx from "clsx";

type Props = {
  users: any
}
export default function UserClient({ users }: Props) {
  const { currentUser } = useSetList()
  const [isAdmin, setIsAdmin] = useState(false);
  UseAutoLogout()
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        console.log("Logged in:", user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  useEffect(() => {
    if (currentUser?.role != null || currentUser?.role != undefined) {
      const res = currentUser.role === 'admin' ? true : false
      setIsAdmin(res)
    }
  });
  if (loading) return <p>Loading...</p>;

  const disableUser = async (user: any) => {
    const uid = user.id
    if (!confirm('Are you sure you want to disable this user?')) return;
    try {
      await fetch("/api/disable-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });
      await updateUserStatus(user)
      alert("User disabled");
    } catch (error: any) {
      console.log("Error user disable:", error.message);
    }

  };

  const enableUser = async (user: any) => {
    const uid = user.id
    if (!confirm('Are you sure you want to Enable this user?')) return;
    try {
      await updateUserEnableStatus(user)
      alert("User enabled");
    } catch (error: any) {
      console.log("Error user disable:", error.message);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col px-5 sm:px-10 py-5 bg-[#e1efff]">
      <div className="flex justify-end w-full text-right mb-5">
        <Header />
      </div>
      <div className="relative w-full bg-white shadow-sm rounded-lg border border-gray-200">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">

          <div className="relative w-full sm:w-auto">
            {/* {isAdmin && <Link href="/signup">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 shadow-sm font-medium rounded-md text-sm px-4 py-2 focus:outline-none"
              >
                Create User
              </button>
            </Link>} */}


            <div className="hidden absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <ul className="p-2 text-sm text-gray-700">
                <li><a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Reward</a></li>
                <li><a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Promote</a></li>
                <li><a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">Archive</a></li>
                <li><a href="#" className="block px-3 py-2 rounded text-red-600 hover:bg-gray-100">Delete</a></li>
              </ul>
            </div>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

            </div>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-4">
                  {/* <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> */}
                </th>
                <th className="p-1">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Plan (Days)</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((user: any, idx: any) => (
                <tr key={user.id} className={clsx( user.isUserEnable ? '' : 'bg-gray-300'
)}>
                  <td className="p-4">
                    {/* <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> */}
                  </td>
                  <td className="p-1">
                    <span className="font-medium ">{idx + 1}.</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-gray-500 text-xs break-all">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={user.role === 'admin' ? 'text-green-500 font-bold' : ''}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user?.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/users/${user.id}/edit`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                    {user.isUserEnable ?
                      <span onClick={() => disableUser(user)} className="font-medium text-red-300 hover:underline mx-7 cursor-pointer">Disable</span>
                      :
                      <span onClick={() => enableUser(user)} className="font-semibold text-gray-900 hover:underline mx-7  cursor-pointer">Enable</span>
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>

  );

}


