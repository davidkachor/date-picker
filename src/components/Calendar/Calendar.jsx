import Modal from '../UI/Modal'
import Select from '../UI/Select'
import YearSwitcher from './YearSwitcher/YearSwitcher'
import React, { useEffect, useState } from 'react'
import { monthsList, createArrayOfDays } from '../../helpers/calendar-data'
import CalendarDateSection from './CalendarDateSection/CalendarDateSection'

function Calendar(props) {
	const currentDate = new Date()
	const [dateToRender, setDateToRender] = useState(
		`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
	)
	const [month, setMonth] = useState(currentDate.getMonth() + 1)
	const [year, setYear] = useState(currentDate.getFullYear())
	const [daysArr, setDaysArr] = useState(
		createArrayOfDays(
			`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
		)
	)

	useEffect(() => {
		setDateToRender(`${year}-${month}`)
	}, [year, month])

	useEffect(() => {
		setDaysArr(createArrayOfDays(dateToRender))
	}, [dateToRender])

	const changeMonthHandler = month => {
		setMonth(month)
	}
	const changeYearHandler = type => {
		switch (type || '') {
			default:
				return year => setYear(year)
			case 'next-year':
				return () => setYear(prev => ++prev)
			case 'prev-year':
				return () => setYear(prev => --prev)
		}
	}

	return (
		<Modal onClose={props.onClose}>
			<div className="calendar">
				<div className="calendar_switch-data">
					<Select
						onChange={changeMonthHandler}
						className="month-switcher"
						optionList={monthsList}
						defaultOption={month}
					/>
					<YearSwitcher onClick={changeYearHandler} currentYear={year} />
				</div>
				<div className="calendar-container">
					<div className="calendar-day">Sun</div>
					<div className="calendar-day">Mon</div>
					<div className="calendar-day">Tue</div>
					<div className="calendar-day">Wed</div>
					<div className="calendar-day">Thu</div>
					<div className="calendar-day">Fri</div>
					<div className="calendar-day">Sat</div>
					{daysArr.map((e, i) => {
						if (e) {
							return (
								<CalendarDateSection
									key={i}
									className={
										e === currentDate.getDate() &&
										month === new Date().getMonth() + 1 &&
										year === new Date().getFullYear()
											? 'calendar-date__today'
											: ''
									}
								>
									{e}
								</CalendarDateSection>
							)
						} else {
							return (
								<div className="calendar-date__empty" key={i}>
									{e}
								</div>
							)
						}
					})}
				</div>
			</div>
		</Modal>
	)
}

export default Calendar
