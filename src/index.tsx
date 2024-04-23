import './styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  DatePickerRoot,
  DatePickerTrigger,
  RangeCalendar,
} from './components/date-picker'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DatePickerRoot>
      <DatePickerTrigger asChild>
        <button>Trigger calendar</button>
      </DatePickerTrigger>
      <RangeCalendar />
    </DatePickerRoot>
  </React.StrictMode>,
)
