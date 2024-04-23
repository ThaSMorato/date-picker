import dayjs, { Dayjs } from 'dayjs'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
    isCurrentDate?: boolean
  }>
}

type CalendarWeeks = Array<CalendarWeek>

export const getCalendarWeeks = (currentDate: Dayjs) => {
  const daysInMonth = currentDate.daysInMonth()

  const lastDayInCurrentMonth = currentDate.set('date', daysInMonth)

  const daysInMonthArray = Array.from({ length: daysInMonth }).map((_, index) =>
    currentDate.set('date', index + 1),
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
}
