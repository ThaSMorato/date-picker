import { ReactNode } from 'react'

import { cn } from '../../utils'

export interface PresetButtonProps {
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
        'py-2 px-3 rounded text-xs text-gray dark:text-gray-base',
        'hover:bg-blue-faded-primary hover:font-medium hover:text-gray-dark dark:hover:bg-gray-dark-muted dark:hover:text-white',
        'data-[active=true]:rounded-r-none data-[active=true]:bg-gray-light data-[active=true]:text-blue-primary data-[active=true]:border-r-2 data-[active=true]:border-blue-primary',
        'dark:data-[active=true]:bg-gray-dark-muted dark:data-[active=true]:text-white dark:data-[active=true]:border-white',
      )}
    >
      {children}
    </button>
  )
}
