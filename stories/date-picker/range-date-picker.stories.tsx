import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  CalendarProps,
  DatePickerRoot,
  DatePickerTrigger,
  RangeCalendar,
} from '../../src/components/date-picker'

export default {
  title: 'Date Picker/Range Calendar',
  component: RangeCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        disable: false,
        code: `
        <DatePickerRoot>
  <DatePickerTrigger>Trigger Range Calendar Picker</DatePickerTrigger>
  <RangeCalendar />
</DatePickerRoot>

// or

<DatePickerRoot>
  <DatePickerTrigger asChild>
    <button>Trigger Range Calendar Picker</button>
  </DatePickerTrigger>
  <RangeCalendar />
</DatePickerRoot>
        `,
      },
    },
  },
} as Meta<CalendarProps>

export const RangeDatePicker: StoryObj<CalendarProps> = {
  render: () => (
    <DatePickerRoot>
      <DatePickerTrigger>Trigger Range Calendar Picker</DatePickerTrigger>
      <RangeCalendar />
    </DatePickerRoot>
  ),
}
