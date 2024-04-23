import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'

import {
  DatePickerRoot,
  DatePickerTrigger,
  OptionsCalendar,
  RangeCalendar,
  SimpleCalendar,
} from '../../src/components/date-picker/index'

type OnChangeSimpleFunction = (date: string) => void
type OnChangeFunction = (date: string[]) => void

interface SimpleCalendarProps {
  onChangeFn: OnChangeSimpleFunction
  data?: Date
}

interface CalendarProps {
  onChangeFn: OnChangeFunction
  data?: Date[]
}

const SimpleCalendarTest = ({ onChangeFn, data }: SimpleCalendarProps) => {
  return (
    <React.Fragment>
      <DatePickerRoot>
        <DatePickerTrigger asChild>
          <button data-testid="trigger-button">Trigger calendar</button>
        </DatePickerTrigger>
        <SimpleCalendar onChange={onChangeFn} value={data} />
      </DatePickerRoot>
    </React.Fragment>
  )
}

const RangeCalendarTest = ({ onChangeFn, data }: CalendarProps) => {
  return (
    <React.Fragment>
      <DatePickerRoot>
        <DatePickerTrigger asChild>
          <button data-testid="trigger-button">Trigger calendar</button>
        </DatePickerTrigger>
        <RangeCalendar onChange={onChangeFn} value={data} />
      </DatePickerRoot>
    </React.Fragment>
  )
}

const OptionsCalendarTest = ({ onChangeFn, data }: CalendarProps) => {
  return (
    <React.Fragment>
      <DatePickerRoot>
        <DatePickerTrigger asChild>
          <button data-testid="trigger-button">Trigger calendar</button>
        </DatePickerTrigger>
        <OptionsCalendar onChange={onChangeFn} value={data} />
      </DatePickerRoot>
    </React.Fragment>
  )
}

describe('Calendar component test', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-15T10:00:00'))
  })

  afterAll(() => {
    jest.clearAllTimers()
  })
  describe('Simple calendar', () => {
    it('Should start with a date value if passed', () => {
      const mockOnChange = jest.fn()

      const date = new Date('2024-01-20T05:00:00')

      render(<SimpleCalendarTest onChangeFn={mockOnChange} data={date} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const dayTwentyButton = screen.getByText('20')
      const selectButton = screen.getByText('Select')

      expect(dayTwentyButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange).toHaveBeenCalledWith('2024-01-20')
    })

    it('Should return selected date', () => {
      const mockOnChange = jest.fn()

      render(<SimpleCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const dayTenButton = screen.getByText('10')
      const selectButton = screen.getByText('Select')

      expect(dayTenButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(dayTenButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange).toHaveBeenCalledWith('2024-01-10')
    })
  })

  describe('Range calendar', () => {
    it('Should start with a date value if passed', () => {
      const mockOnChange = jest.fn()

      const dateEnd = new Date('2024-01-20T02:00:00')
      const dateStart = new Date('2024-01-10T02:00:00')

      render(
        <RangeCalendarTest
          onChangeFn={mockOnChange}
          data={[dateStart, dateEnd]}
        />,
      )

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const dayTenButton = screen.getByText('10')
      const dayTwentyButton = screen.getByText('20')
      const selectButton = screen.getByText('Select')

      expect(dayTenButton).toBeInTheDocument()
      expect(dayTwentyButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-10', '2024-01-20'])
    })

    it('Should return selected date', () => {
      const mockOnChange = jest.fn()

      render(<RangeCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const dayTenButton = screen.getByText('10')
      const dayTwentyButton = screen.getByText('20')
      const selectButton = screen.getByText('Select')

      expect(dayTenButton).toBeInTheDocument()
      expect(dayTwentyButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(dayTenButton)
      })

      act(() => {
        fireEvent.click(dayTwentyButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-10', '2024-01-20'])
    })
  })

  describe('Options calendar', () => {
    it('Should start with a date value if passed', () => {
      const mockOnChange = jest.fn()

      const dateEnd = new Date('2024-01-20T02:00:00')
      const dateStart = new Date('2024-01-10T02:00:00')

      render(
        <OptionsCalendarTest
          onChangeFn={mockOnChange}
          data={[dateStart, dateEnd]}
        />,
      )

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const dayTenButton = screen.getAllByText('10')[0]
      const dayTwentyButton = screen.getAllByText('20')[0]
      const selectButton = screen.getByText('Select')

      expect(dayTenButton).toBeInTheDocument()
      expect(dayTwentyButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()
      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-10', '2024-01-20'])
    })

    it('Should return selected date', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const dayTenButton = screen.getAllByText('10')[0]
      const dayTwentyButton = screen.getAllByText('20')[0]
      const selectButton = screen.getByText('Select')

      expect(dayTenButton).toBeInTheDocument()
      expect(dayTwentyButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(dayTenButton)
      })

      act(() => {
        fireEvent.click(dayTwentyButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-10', '2024-01-20'])
    })

    it('Should return todays date if today button is clicked', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const todayButton = screen.getByText('Today')
      const selectButton = screen.getByText('Select')

      expect(todayButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(todayButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-15'])
    })

    it('Should return yesterdays date if Yesterday button is clicked', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const yesterdayButton = screen.getByText('Yesterday')
      const selectButton = screen.getByText('Select')

      expect(yesterdayButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(yesterdayButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-14'])
    })

    it('Should return a week ago date if 7 days button is clicked', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const lastSevenDaysButton = screen.getByText('Last 7 days')
      const selectButton = screen.getByText('Select')

      expect(lastSevenDaysButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(lastSevenDaysButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-08', '2024-01-15'])
    })

    it('Should return a 30 days ago date if 30 days button is clicked', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const lastThirtyDaysButton = screen.getByText('Last 30 days')
      const selectButton = screen.getByText('Select')

      expect(lastThirtyDaysButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(lastThirtyDaysButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2023-12-16', '2024-01-15'])
    })

    it('Should return a this month date if this month button is clicked', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const thisMonthButton = screen.getByText('This Month')
      const selectButton = screen.getByText('Select')

      expect(thisMonthButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(thisMonthButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2024-01-01', '2024-01-31'])
    })

    it('Should return a last month date if last month button is clicked', () => {
      const mockOnChange = jest.fn()

      render(<OptionsCalendarTest onChangeFn={mockOnChange} />)

      const triggerButton = screen.getByTestId('trigger-button')

      act(() => {
        triggerButton.click()
      })

      const calendar = screen.getByRole('dialog')

      expect(calendar).toBeInTheDocument()

      const LastMonthButton = screen.getByText('Last Month')
      const selectButton = screen.getByText('Select')

      expect(LastMonthButton).toBeInTheDocument()
      expect(selectButton).toBeInTheDocument()

      act(() => {
        fireEvent.click(LastMonthButton)
      })

      selectButton.click()

      expect(mockOnChange).toHaveBeenCalled()

      expect(mockOnChange).toHaveBeenCalledWith(['2023-12-01', '2023-12-31'])
    })
  })
})
