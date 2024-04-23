import * as Popover from '@radix-ui/react-popover'

import { RangeCalendar as RangeCalendarComponent } from './range-calendar'
import { SimpleCalendar as SimpleCalendarComponent } from './simple-calendar'

const DatePickerRoot = Popover.Root

const DatePickerTrigger = Popover.Trigger

const SimpleCalendar = () => {
  return (
    <Popover.Portal>
      <Popover.Content>
        <SimpleCalendarComponent />
      </Popover.Content>
    </Popover.Portal>
  )
}

const RangeCalendar = () => {
  return (
    <Popover.Portal>
      <Popover.Content>
        <RangeCalendarComponent />
      </Popover.Content>
    </Popover.Portal>
  )
}

export { DatePickerRoot, DatePickerTrigger, RangeCalendar, SimpleCalendar }
