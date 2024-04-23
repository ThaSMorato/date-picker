import dayjs from 'dayjs'
import { useState } from 'react'

import { Button } from './button'
import { Calendar } from './calendar'

interface RangeProps {
  onChange?: (dates: Date[]) => void
  value?: Date[]
}

export const RangeCalendar = ({ onChange, value }: RangeProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[] | null>(
    value ?? null,
  )

  const handleSelectDate = () => {
    if (onChange && selectedDates) {
      return onChange(selectedDates)
    }
  }

  const handleOnClickDate = (date: Date) => {
    if (selectedDates === null || selectedDates.length <= 0) {
      return setSelectedDates([date])
    }
    const dayjsDate = dayjs(date)

    if (selectedDates.length >= 2) {
      const [date1, date2] = selectedDates
      const dayjsDate1 = dayjs(date1)
      const dayjsDate2 = dayjs(date2)

      if (dayjsDate1.isSame(dayjsDate) || dayjsDate2.isSame(dayjsDate)) {
        return
      }

      if (dayjsDate.isAfter(dayjsDate2)) {
        return setSelectedDates([date1, date])
      }

      return setSelectedDates([date, date2])
    }

    const [date1] = selectedDates
    const dayjsDate1 = dayjs(date1)

    if (dayjsDate1.isSame(dayjsDate)) {
      return
    }

    if (dayjsDate1.isBefore(dayjsDate)) {
      return setSelectedDates([date1, date])
    }

    return setSelectedDates([date, date1])
  }

  return (
    <div className="flex flex-col gap-3 p-5 rounded-lg bg-white dark:bg-gray-dark">
      <Calendar value={selectedDates} setSelectedDates={handleOnClickDate} />
      <div className="flex items-center justify-end gap-4">
        <Button variant="ghost" onClick={() => setSelectedDates(null)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSelectDate}>
          Select
        </Button>
      </div>
    </div>
  )
}
