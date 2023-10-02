import { useState } from "react"
import { Views } from "./pages/Views"
import { Users } from "./pages/Users"
import { useGetUsers } from "./hooks/useGetUsers"

function App() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const { users } = useGetUsers();

  return (
    <>
      {selectedUser ? (
        <Views userId={selectedUser} />
      ) : (
        <Users onSelect={setSelectedUser} users={users} />
      )}
    </>
  )
}

export default App
