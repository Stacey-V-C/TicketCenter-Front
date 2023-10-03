import type { FunctionComponent, ReactNode } from "react"
type Props = {
  children: ReactNode,
  color: string,
  disabled?: boolean,
  onClick: () => void
};

export const Button: FunctionComponent<Props> = ({
  children,
  color,
  disabled,
  onClick,
}) => (
  <button
    className="min-w-sm h-xs m-2 p-2 text-xs text-white border-0"
    style={{ backgroundColor: color }}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)
