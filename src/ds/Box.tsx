import type { FunctionComponent, ReactNode } from "react"

export const Box: FunctionComponent<{ children: ReactNode, color: string }> = ({ children, color }) => (
  <div
    className="w-120 min-h-60 bg-white border-solid border-2"
    style={{ borderColor: color }}
  >
    {children}
  </div>
)