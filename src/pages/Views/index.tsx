import { useGetUserData } from "../../hooks/useGetUserData";

export const Views = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useGetUserData(userId);
  return (
    <div>
      <h1>Views</h1>
    </div>
  )
};