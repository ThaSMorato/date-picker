import dayjs from 'dayjs'
import React, { useState } from 'react'

import { Button } from './button'
import { Calendar } from './calendar'
import { PresetButton } from './preset-button'

interface RangeProps {
  onChange?: (dates: Date[]) => void
  value?: Date[]
}

enum ButtonState {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  WEEK = 'WEEK',
  THIRTY = 'THIRTY',
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  CUSTOM = 'CUSTOM',
}

const TODAY = dayjs().startOf('day').set('hour', 5)

const VALUES_MAP = new Map([
  [ButtonState.TODAY, [TODAY.toDate()]],
  [ButtonState.YESTERDAY, [TODAY.subtract(1, 'day').toDate()]],
  [
    ButtonState.WEEK,
    [
      dayjs().startOf('week').startOf('day').set('hour', 5).toDate(),
      dayjs().endOf('week').startOf('day').set('hour', 5).toDate(),
    ],
  ],
  [ButtonState.THIRTY, [TODAY.subtract(30, 'day').toDate(), TODAY.toDate()]],
  [
    ButtonState.THIS_MONTH,
    [
      dayjs().startOf('month').startOf('day').set('hour', 5).toDate(),
      dayjs().endOf('month').startOf('day').set('hour', 5).toDate(),
    ],
  ],
  [
    ButtonState.LAST_MONTH,
    [
      dayjs()
        .subtract(1, 'month')
        .startOf('month')
        .startOf('day')
        .set('hour', 5)
        .toDate(),
      dayjs()
        .subtract(1, 'month')
        .endOf('month')
        .startOf('day')
        .set('hour', 5)
        .toDate(),
    ],
  ],
])

export const ListCalendar = ({ onChange, value }: RangeProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[] | null>(
    value ?? null,
  )

  const handleSelectDate = () => {
    if (onChange && selectedDates) {
      return onChange(selectedDates)
    }
  }

  const activedButtonState = () => {
    for (const key in ButtonState) {
      if (
        JSON.stringify(selectedDates) ===
        JSON.stringify(VALUES_MAP.get(key as ButtonState))
      ) {
        return key
      }
    }

    return ButtonState.CUSTOM
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
    <div className="flex flex-col gap-6 p-5 rounded-lg bg-white dark:bg-gray-dark">
      <div className="flex gap-6 items-start">
        <div>
          <ul>
            <li>
              <PresetButton
                onClick={() =>
                  setSelectedDates(VALUES_MAP.get(ButtonState.TODAY) ?? null)
                }
                isActive={activedButtonState() === ButtonState.TODAY}
              >
                Today
              </PresetButton>
            </li>
            <li>
              <PresetButton
                onClick={() =>
                  setSelectedDates(
                    VALUES_MAP.get(ButtonState.YESTERDAY) ?? null,
                  )
                }
                isActive={activedButtonState() === ButtonState.YESTERDAY}
              >
                Yesterday
              </PresetButton>
            </li>
            <li>
              <PresetButton
                onClick={() =>
                  setSelectedDates(VALUES_MAP.get(ButtonState.WEEK) ?? null)
                }
                isActive={activedButtonState() === ButtonState.WEEK}
              >
                Last 7 days
              </PresetButton>
            </li>
            <li>
              <PresetButton
                onClick={() =>
                  setSelectedDates(VALUES_MAP.get(ButtonState.THIRTY) ?? null)
                }
                isActive={activedButtonState() === ButtonState.THIRTY}
              >
                Last 30 days
              </PresetButton>
            </li>
            <li>
              <PresetButton
                onClick={() =>
                  setSelectedDates(
                    VALUES_MAP.get(ButtonState.THIS_MONTH) ?? null,
                  )
                }
                isActive={activedButtonState() === ButtonState.THIS_MONTH}
              >
                This Month
              </PresetButton>
            </li>
            <li>
              <PresetButton
                onClick={() =>
                  setSelectedDates(
                    VALUES_MAP.get(ButtonState.LAST_MONTH) ?? null,
                  )
                }
                isActive={activedButtonState() === ButtonState.LAST_MONTH}
              >
                Last Month
              </PresetButton>
            </li>
            <li>
              <PresetButton
                onClick={() => setSelectedDates(null)}
                isActive={activedButtonState() === ButtonState.CUSTOM}
              >
                Custom Range
              </PresetButton>
            </li>
          </ul>
        </div>
        {React.Children.toArray(
          Array.from({ length: 2 }).map((_) => (
            <Calendar
              setSelectedDates={handleOnClickDate}
              value={selectedDates}
            />
          )),
        )}
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
