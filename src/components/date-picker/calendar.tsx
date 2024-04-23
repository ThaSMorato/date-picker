import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '../../utils'
import { getCalendarWeeks } from '../../utils/get-calendar-weeks'
import { getWeekDays } from '../../utils/get-week-days'

enum DatePosition {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  MIDDLE = 'MIDDLE',
  NONE = 'NONE',
  UNIQUE = 'UNIQUE',
}

type CheckSelectedResponse = 'UNIQUE' | 'MIDDLE' | 'FIRST' | 'SECOND' | 'NONE'

interface RangeProps {
  value: Date[] | null
  setSelectedDates: (dates: Date) => void
}

export const Calendar = ({
  value: selectedDates,
  setSelectedDates,
}: RangeProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1).startOf('day').set('hour', 5)
  })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const handlePreviusMonth = () => {
    const previusMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previusMonthDate)
  }
  const handleNextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  const calendarWeeks = useMemo(
    () => getCalendarWeeks(currentDate),
    [currentDate],
  )

  const checkState = (date: Date): CheckSelectedResponse => {
    if (selectedDates === null || selectedDates.length <= 0) {
      return DatePosition.NONE
    }

    const dayjsDate = dayjs(date)

    if (selectedDates.length === 1) {
      const [date1] = selectedDates
      const dayjsDate1 = dayjs(date1)

      return dayjsDate1.isSame(dayjsDate)
        ? DatePosition.UNIQUE
        : DatePosition.NONE
    }

    const [date1, date2] = selectedDates
    const dayjsDate1 = dayjs(date1)
    const dayjsDate2 = dayjs(date2)

    if (dayjsDate.isSame(dayjsDate1)) {
      return DatePosition.FIRST
    }
    if (dayjsDate.isSame(dayjsDate2)) {
      return DatePosition.SECOND
    }
    if (dayjsDate.isAfter(dayjsDate1) && dayjsDate.isBefore(dayjsDate2)) {
      return DatePosition.MIDDLE
    }

    return DatePosition.NONE
  }

  const shortWeekdays = getWeekDays({ short: true })
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <p className="text-gray-dark dark:text-gray-base text-sm">
            {currentMonth}
          </p>
          <p className="text-gray-dark dark:text-gray-base text-sm">
            {currentYear}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="h-5 w-5 flex items-center justify-center dark:text-gray-base"
            onClick={handlePreviusMonth}
          >
            <ChevronLeft className="h-5" />
          </button>

          <button
            className="h-5 w-5 flex items-center justify-center dark:text-gray-base"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-5" />
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {shortWeekdays.map((weekday, index) => (
                <th
                  key={weekday}
                  className={cn(
                    'text-xs w-8 h-8 font-normal',
                    index > 0 && index < 6
                      ? 'text-gray-dark dark:text-gray-base'
                      : 'text-red-primary dark:text-red-secondary',
                  )}
                >
                  {weekday}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarWeeks.map(({ week, days }) => (
              <tr key={week}>
                {days.map(({ date, disabled, isCurrentDate }, index) => {
                  const state = checkState(date.toDate())

                  return (
                    <td
                      key={date.toString()}
                      className={cn(
                        !disabled &&
                          'hover:bg-blue-faded-primary hover:rounded-lg hover:text-blue-primary hover:cursor-pointer dark:hover:text-white dark:hover:bg-gray-dark-muted',
                        'text-xs w-8 h-8 font-normal text-center',
                        index > 0 && index < 6
                          ? 'text-gray dark:text-gray-base'
                          : 'text-red-primary dark:text-red-secondary',
                        isCurrentDate &&
                          'text-blue-primary font-semibold dark:text-white',
                        state === DatePosition.UNIQUE &&
                          'rounded-lg text-white bg-blue-primary dark:text-white',
                        state === DatePosition.FIRST &&
                          'rounded-l-lg text-white bg-blue-primary dark:text-white',
                        state === DatePosition.SECOND &&
                          'rounded-r-lg text-white bg-blue-primary dark:text-white',
                        state === DatePosition.MIDDLE &&
                          'text-blue-primary bg-blue-faded-primary dark:text-white dark:bg-gray-dark-muted',
                      )}
                      onClick={() => setSelectedDates(date.toDate())}
                    >
                      {!disabled && date.get('date')}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
