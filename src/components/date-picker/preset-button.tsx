import { ReactNode } from 'react'

import { cn } from '../../utils'

interface PresetButtonProps {
  isActive?: boolean
  children: ReactNode
  onClick: () => void
}

export const PresetButton = ({
  isActive = false,
  children,
  onClick,
}: PresetButtonProps) => {
  return (
    <button
      onClick={onClick}
      data-active={isActive}
      className={cn(
        'py-2 px-3 rounded text-xs text-gray',
        'hover:bg-blue-faded-primary hover:text-gray-dark',
        'data-[active=true]:bg-gray-light data-[active=true]:text-blue-primary data-[active=true]:border-r-2 data-[active=true]:border-blue-primary data-[active=true]:rounded-r-none',
      )}
    >
      {children}
    </button>
  )
}
