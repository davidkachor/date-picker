import React, { useState } from 'react'
import Calendar from '../Calendar/Calendar'

function CalendarInput() {
	const [calendarIsOpen, setCalendarIsOpen] = useState(false)
	const [enteredValue, setEnteredValue] = useState('')

	const clickHandler = () => setCalendarIsOpen(prev => !prev)
	const selectHandler = value => setEnteredValue(value)

	return (
		<React.Fragment>
			<label className="input-calendar">
				<input
					value={enteredValue}
					placeholder={'dd.mm.yyyy'}
					type="text"
					disabled={true}
				/>
				<button className="input-calendar-btn" onClick={clickHandler}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-calendar"
						viewBox="0 0 16 16"
					>
						<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
					</svg>
				</button>
			</label>
			{calendarIsOpen && <Calendar onSelect={selectHandler} onClose={clickHandler} />}
		</React.Fragment>
	)
}

export default CalendarInput
