import type { Meta, StoryObj } from '@storybook/react'

import {
  PresetButton,
  PresetButtonProps,
} from '../../src/components/date-picker/preset-button'

export default {
  title: 'Simgle Components/Preset Button (list)',
  component: PresetButton,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
} as Meta<PresetButtonProps>

export const Button: StoryObj<PresetButtonProps> = {
  args: {
    isActive: false,
  },
}

export const ActivatedButton: StoryObj<PresetButtonProps> = {
  args: {
    isActive: true,
  },
}
