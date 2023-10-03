import { useState } from "react"
import { QueryClient } from "react-query"
import { QueryClientProvider } from "react-query"

import { Views } from "./pages/Views"
import { Users } from "./pages/Users"
import { useGetUsers } from "./hooks/useGetUsers"
import { QueryContextProvider } from "./hooks/useQueryContext"
import "./styles/tailwind.css"

type User = {
  id: string;
  team: 'red' | 'blue';
}

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

export const Main = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { users } = useGetUsers();

  return (
    <>
      {selectedUser ? (
        <QueryContextProvider userId={selectedUser.id}>
          <Views team={selectedUser.team} unselect={() => setSelectedUser(null)}/>
        </QueryContextProvider>
      ) : (
        <Users onSelect={setSelectedUser} users={users} />
      )}
    </>
  )
}

export default App
