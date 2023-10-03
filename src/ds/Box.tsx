import type { FunctionComponent, ReactNode } from "react"

type Props = {
  children: ReactNode,
  color: string
  flexDirection?: 'row' | 'column'
};

export const Box: FunctionComponent<Props> = ({
  children,
  color,
  flexDirection
}) => (
  <div
    className="w-lg min-h-sm m-2 p-2 bg-white border-solid border-2 flex"
    style={{
      borderColor: color,
      flexDirection: flexDirection || 'column'
    }}
  >
    {children}
  </div>
)