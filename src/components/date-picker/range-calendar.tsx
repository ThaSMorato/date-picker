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

enum DatePosition {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  MIDDLE = 'MIDDLE',
  NONE = 'NONE',
  UNIQUE = 'UNIQUE',
}

type CheckSelectedResponse = 'UNIQUE' | 'MIDDLE' | 'FIRST' | 'SECOND' | 'NONE'

interface RangeProps {
  onChange?: (dates: Date[]) => void
  value?: Date[]
}

export const RangeCalendar = ({ onChange, value }: RangeProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const [selectedDates, setSelectedDates] = useState<Date[] | null>(
    value ?? null,
  )

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
    if (onChange && selectedDates) {
      return onChange(selectedDates)
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
                  const state = checkState(date.toDate())

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
                        state === DatePosition.UNIQUE &&
                          'rounded-lg text-white bg-blue-primary',
                        state === DatePosition.FIRST &&
                          'rounded-tl-lg rounded-bl-lg text-white bg-blue-primary',
                        state === DatePosition.SECOND &&
                          'rounded-tr-lg rounded-br-lg text-white bg-blue-primary',
                        state === DatePosition.MIDDLE &&
                          'text-blue-primary bg-blue-faded-primary',
                      )}
                      onClick={() => handleOnClickDate(date.toDate())}
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
