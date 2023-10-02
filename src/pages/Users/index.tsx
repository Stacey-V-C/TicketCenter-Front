type Props = {
  onSelect: (userId: string) => void;
  users: {
    red: string[];
    blue: string[];
  }
}

export const Users = ({ onSelect, users }: Props) => (
  <div>
    <h1>Select User to Login</h1>
  
  </div>
)