import type { Meta, StoryObj } from '@storybook/react'

import { Button, ButtonProps } from '../../src/components/date-picker/button'

export default {
  title: 'Simgle Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
} as Meta<ButtonProps>

export const PrimaryButton: StoryObj<ButtonProps> = {
  args: {
    variant: 'primary',
  },
}

export const GhostButton: StoryObj<ButtonProps> = {
  args: {
    variant: 'ghost',
  },
}

export const OutlinedButton: StoryObj<ButtonProps> = {
  args: {
    variant: 'outlined',
  },
}
