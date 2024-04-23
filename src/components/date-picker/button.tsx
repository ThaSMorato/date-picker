import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../../utils'

enum Variant {
  'ghost' = 'text-blue-primary hover:text-blue-dark',
  'primary' = 'text-white bg-blue-primary hover:bg-blue-dark',
  'outlined' = 'text-blue-primary hover:text-blue-dark border-blue-primary hover:border-blue-dark border',
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
