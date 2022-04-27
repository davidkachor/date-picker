import React, { useContext, useEffect, useState } from 'react'
import Modal from '../UI/Modal'
import Select from '../UI/Select'
import YearSwitcher from './YearSwitcher/YearSwitcher'
import { monthsList, createArrayOfDays } from '../../helpers/calendar-data'
import CalendarDateSection from './CalendarDateSection/CalendarDateSection'
import { Switch, FormControlLabel } from '@mui/material'
import ThemeContext from '../../context/theme-context'

function Calendar(props) {
	const currentDate = new Date()
	const themeCtx = useContext(ThemeContext)

	const [daysArr, setDaysArr] = useState(
		createArrayOfDays(
			`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`
		)
	)

	const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1)
	const [selectedYear, setYear] = useState(currentDate.getFullYear())
	const [selectedDay, setSelectedDay] = useState([])

	useEffect(() => {
		if (selectedDay.length > 0) {
			let outputValue = `${
				+selectedDay[0] < 10 ? '0' + selectedDay[0] : selectedDay[0]
			}.${
				+selectedMonth < 10 ? '0' + selectedMonth : selectedMonth
			}.${selectedYear}`

			if (selectedDay.length === 2) {
				outputValue += `-${
					+selectedDay[1] < 10 ? '0' + selectedDay[1] : selectedDay[1]
				}.${
					+selectedMonth < 10 ? '0' + selectedMonth : selectedMonth
				}.${selectedYear}`
			}
			props.onSelect(outputValue)
		} else props.onSelect('')
	}, [selectedDay])

	useEffect(() => {
		setDaysArr(createArrayOfDays(`${selectedYear}-${selectedMonth}`))
		setSelectedDay([])
	}, [selectedYear, selectedMonth])

	const changeMonthHandler = month => {
		setSelectedMonth(month)
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

	const changeThemeHandler = () => {
		if (themeCtx.theme === 'Light') {
			themeCtx.onChangeThemeToDark()
		} else themeCtx.onChangeThemeToLight()
	}

	const clickDayHandler = type => {
		if (type === 'add') {
			return day =>
				setSelectedDay(prev =>
					prev.length < 2 ? [...prev, day].sort((a, b) => a - b) : [day]
				)
		} else if (type === 'remove') {
			return day => setSelectedDay(prev => prev.filter(e => e !== day))
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
						defaultOption={selectedMonth}
					/>
					<YearSwitcher
						onClick={changeYearHandler}
						currentYear={selectedYear}
					/>
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
									selectingPosition={
										selectedDay.length === 1 && selectedDay.includes(e)
											? 'SINGLE_SELECTED'
											: selectedDay.length === 2 && e === selectedDay[0]
											? 'SELECTED_ROW_START'
											: selectedDay.length === 2 && e === selectedDay[1]
											? 'SELECTED_ROW_END'
											: selectedDay.length === 2 &&
											  e > selectedDay[0] &&
											  e < selectedDay[1]
											? 'SELECTED_ROW_MIDDLE'
											: 'IS_NOT_SELECTED'
									}
									isToday={
										e === currentDate.getDate() &&
										selectedMonth === new Date().getMonth() + 1 &&
										selectedYear === new Date().getFullYear()
									}
									onClick={clickDayHandler}
									value={e}
									key={i}
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
				<FormControlLabel
					control={<Switch onChange={changeThemeHandler} />}
					label={themeCtx.theme + 'Mode'}
					labelPlacement={'start'}
				/>
			</div>
		</Modal>
	)
}

export default Calendar
