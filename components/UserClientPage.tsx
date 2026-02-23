"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UseAutoLogout } from "./AutoLogout";
import Header from "./Header/header";
import { useSetList } from "@/context/SetListContext";

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
  const handleLogout = async () => {
    await signOut(clientAuth);
    router.push("/login");
  };

  return (
    <main className="w-full min-h-screen flex flex-col px-5 sm:px-10 py-5 bg-[#e1efff]">
      <div className="flex justify-end w-full text-right mb-5">
        <Header />
      </div>
      <div className="relative w-full bg-white shadow-sm rounded-lg border border-gray-200">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">

          <div className="relative w-full sm:w-auto">
            {isAdmin && <Link href="/users/new">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 shadow-sm font-medium rounded-md text-sm px-4 py-2 focus:outline-none"
              >
                Create User
              </button>
            </Link>}


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
                <th className="px-6 py-3">Remainding Days</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((user: any, idx: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
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
                    30
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.onboardingDone ? <>
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>Active</>
                        :
                        <><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>InActive</>
                      }
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/users/${user.id}`} className="font-medium text-blue-600 hover:underline">Detail</Link>
                    <span className="font-medium text-yellow-600 hover:underline mx-3">Disable</span>
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


