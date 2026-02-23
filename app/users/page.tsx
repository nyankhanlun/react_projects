import { Suspense } from "react";
import { getUserCollectoin } from "../actions/users_route";
import UserClient from "@/components/UserClientPage";

async function UsersList() {
  const users = await getUserCollectoin()
  return <UserClient users={users} />
}
export default function UsersPage() {

  return (
    <Suspense fallback={<p>Fetching songs...</p>} >
      <UsersList />
    </Suspense>
  )

}
