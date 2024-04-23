import '../../styles/index.css'

import * as Popover from '@radix-ui/react-popover'

import { ListCalendar } from './list-calendar'
import { RangeCalendar as RangeCalendarComponent } from './range-calendar'
import { SimpleCalendar as SimpleCalendarComponent } from './simple-calendar'

interface CalendarProps {
  onChange?: (dates: Date[]) => void
  value?: Date[]
}

interface SimpleCalendarProps {
  onChange?: (dates: Date) => void
  value?: Date
}

const DatePickerRoot = Popover.Root

const DatePickerTrigger = Popover.Trigger

const SimpleCalendar = ({ onChange, value }: SimpleCalendarProps) => {
  return (
    <Popover.Portal>
      <Popover.Content>
        <SimpleCalendarComponent onChange={onChange} value={value} />
      </Popover.Content>
    </Popover.Portal>
  )
}

const RangeCalendar = ({ onChange, value }: CalendarProps) => {
  return (
    <Popover.Portal>
      <Popover.Content>
        <RangeCalendarComponent onChange={onChange} value={value} />
      </Popover.Content>
    </Popover.Portal>
  )
}

const OptionsCalendar = ({ onChange, value }: CalendarProps) => {
  return (
    <Popover.Portal>
      <Popover.Content>
        <ListCalendar onChange={onChange} value={value} />
      </Popover.Content>
    </Popover.Portal>
  )
}

export {
  DatePickerRoot,
  DatePickerTrigger,
  OptionsCalendar,
  RangeCalendar,
  SimpleCalendar,
}
