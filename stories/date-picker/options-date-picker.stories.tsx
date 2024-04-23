import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  CalendarProps,
  DatePickerRoot,
  DatePickerTrigger,
  OptionsCalendar,
} from '../../src/components/date-picker'

export default {
  title: 'Date Picker/Options Calendar',
  component: OptionsCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        disable: false,
        code: `
        <DatePickerRoot>
  <DatePickerTrigger>Trigger Options Calendar Picker</DatePickerTrigger>
  <OptionsCalendar />
</DatePickerRoot>

// or

<DatePickerRoot>
  <DatePickerTrigger asChild>
    <button>Trigger Options Calendar Picker</button>
  </DatePickerTrigger>
  <OptionsCalendar />
</DatePickerRoot>
        `,
      },
    },
  },
} as Meta<CalendarProps>

export const OptionsDatePicker: StoryObj = {
  render: () => (
    <DatePickerRoot>
      <DatePickerTrigger>Trigger Options Calendar Picker</DatePickerTrigger>
      <OptionsCalendar />
    </DatePickerRoot>
  ),
}
