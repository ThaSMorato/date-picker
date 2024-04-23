import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  DatePickerRoot,
  DatePickerTrigger,
  SimpleCalendar,
  SimpleCalendarProps,
} from '../../src/components/date-picker'

export default {
  title: 'Date Picker/Simple Calendar',
  component: SimpleCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        disable: false,
        code: `
        <DatePickerRoot>
  <DatePickerTrigger>Trigger Simple Calendar Picker</DatePickerTrigger>
  <SimpleCalendar />
</DatePickerRoot>

// or

<DatePickerRoot>
  <DatePickerTrigger asChild>
    <button>Trigger Range Calendar Picker</button>
  </DatePickerTrigger>
  <SimpleCalendar />
</DatePickerRoot>
        `,
      },
    },
  },
} as Meta<SimpleCalendarProps>

export const SimpleDatePicker: StoryObj<SimpleCalendarProps> = {
  render: () => (
    <DatePickerRoot>
      <DatePickerTrigger>Trigger Simple Calendar Picker</DatePickerTrigger>
      <SimpleCalendar />
    </DatePickerRoot>
  ),
}
