import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '../../utils'
import { getWeekDays } from '../../utils/get-week-days'
import { Button } from './button'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
    isCurrentDate?: boolean
  }>
}

type CalendarWeeks = Array<CalendarWeek>

interface SimpleCalendarProps {
  onChange?: (date: Date) => void
  value?: Date
}

export const SimpleCalendar = ({ onChange, value }: SimpleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null)

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

  const handleSelectDate = () => {
    if (onChange && selectedDate) {
      return onChange(selectedDate)
    }
  }

  const calendarWeeks = useMemo(() => {
    const daysInMonth = currentDate.daysInMonth()

    const lastDayInCurrentMonth = currentDate.set('date', daysInMonth)

    const daysInMonthArray = Array.from({ length: daysInMonth }).map(
      (_, index) => currentDate.set('date', index + 1),
    )

    const firstWeekDay = currentDate.get('day')

    const previusMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => lastDayInCurrentMonth.add(i + 1, 'day'))

    const calendarDays = [
      ...previusMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMonthArray.map((date) => ({
        date,
        disabled: false,
        isCurrentDate: date
          .startOf('day')
          .isSame(dayjs(new Date()).startOf('day')),
      })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const weekHasEnded = index % 7 === 0

        if (weekHasEnded) {
          weeks.push({
            week: index / 7 + 1,
            days: original.slice(index, index + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  const shortWeekdays = getWeekDays({ short: true })
  return (
    <div className="flex flex-col gap-3 p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <p className="text-gray-dark text-sm">{currentMonth}</p>
          <p className="text-gray-dark text-sm">{currentYear}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="h-5 w-5 flex items-center justify-center"
            onClick={handlePreviusMonth}
          >
            <ChevronLeft className="h-5" />
          </button>

          <button
            className="h-5 w-5 flex items-center justify-center"
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
                      ? 'text-gray-dark'
                      : 'text-red-primary',
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
                  const isSelected = date.isSame(selectedDate)
                  return (
                    <td
                      key={date.toString()}
                      className={cn(
                        !disabled &&
                          'hover:bg-blue-faded-primary hover:rounded-lg hover:text-blue-primary hover:cursor-pointer',
                        'text-xs w-8 h-8 font-normal text-center',
                        index > 0 && index < 6
                          ? 'text-gray-dark'
                          : 'text-red-primary',
                        isCurrentDate && 'text-blue-primary font-semibold',
                        isSelected && 'rounded-lg text-white bg-blue-primary',
                      )}
                      onClick={() => setSelectedDate(date.toDate())}
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
