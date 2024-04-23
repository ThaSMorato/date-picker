import { useState } from 'react'

import { Button } from './button'
import { Calendar } from './calendar'

interface SimpleCalendarProps {
  onChange?: (date: Date) => void
  value?: Date
}

export const SimpleCalendar = ({ onChange, value }: SimpleCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null)

  const handleSelectDate = () => {
    if (onChange && selectedDate) {
      return onChange(selectedDate)
    }
  }

  const handleOnClickDate = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <div className="flex flex-col gap-3 p-5 rounded-lg">
      <Calendar
        value={selectedDate ? [selectedDate] : null}
        setSelectedDates={handleOnClickDate}
      />
      <div className="flex items-center justify-end gap-4">
        <Button variant="ghost" onClick={() => setSelectedDate(null)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSelectDate}>
          Select
        </Button>
      </div>
    </div>
  )
}
