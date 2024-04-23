import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../utils'

enum Variant {
  'ghost' = 'text-blue-primary hover:text-blue-dark dark:text-blue-faded-primary dark:hover:text-gray-base',
  'primary' = 'text-white bg-blue-primary hover:bg-blue-dark dark:hover:bg-gray-dark-muted',
  'outlined' = 'text-blue-primary border hover:text-blue-dark border-blue-primary hover:border-blue-dark dark:text-white dark:hover:text-blue-faded-secondary dark:hover:border-blue-faded-secondary dark:hover:bg-gray-dark-muted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'ghost' | 'primary' | 'outlined'
  children: ReactNode
}

export const Button = ({
  variant,
  children,
  className,
  ...rest
}: ButtonProps) => (
  <button
    {...rest}
    className={cn('px-4 py-2 rounded text-xs', Variant[variant], className)}
  >
    {children}
  </button>
)
