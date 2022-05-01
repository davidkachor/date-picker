import React, {useCallback, useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {setDark, setLight} from "../../store/themeSlice";
import {DateTime, Info} from "luxon/build/es6/luxon";

import Modal from '../UI/Modal'
import Select from '../UI/Select'
import YearSwitcher from './YearSwitcher/YearSwitcher'
import { Switch, FormControlLabel } from '@mui/material'
import CalendarDateSection from './CalendarDateSection/CalendarDateSection'

import createArrayOfDays from '../../helpers/create-array-of-days'

function Calendar(props) {
	const theme = useSelector(state => state.theme)
	const themeDispatch = useDispatch()

	const currentDate = DateTime.now()
	const [selectedMonth, setSelectedMonth] = useState(currentDate.month < 10 ? '0' + currentDate.month : '' + currentDate.month)
	const [selectedYear, setYear] = useState(currentDate.year)
	const [selectedDays, setSelectedDays] = useState([])

	const [daysArr, setDaysArr] = useState(
		createArrayOfDays(
			`${selectedYear}-${selectedMonth}`
		)
	)

	useEffect(() => {
		if (selectedDays.length > 0) {
			let outputValue = `${
				+selectedDays[0] < 10 ? '0' + selectedDays[0] : selectedDays[0]
			}.${selectedMonth}.${selectedYear}`

			if (selectedDays.length === 2) {
				outputValue += `-${
					+selectedDays[1] < 10 ? '0' + selectedDays[1] : selectedDays[1]
				}.${selectedMonth}.${selectedYear}`
			}
			props.onSelect(outputValue)
		} else props.onSelect('')
	}, [props, selectedDays, selectedMonth, selectedYear])

	useEffect(() => {
		setDaysArr(createArrayOfDays(`${selectedYear}-${selectedMonth}`))
		setSelectedDays([])
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
		if (theme === 'Light') {
			themeDispatch(setDark())
		} else themeDispatch(setLight())
	}

	const clickDayHandler = useCallback(type => {
		if (type === 'add') {
			return day =>
				setSelectedDays(prev =>
					prev.length < 2 ? [...prev, day].sort((a, b) => a - b) : [day]
				)
		} else if (type === 'remove') {
			return day => setSelectedDays(prev => prev.filter(e => e !== day))
		}
	}, [])

	return (
		<Modal onClose={props.onClose}>
			<div className="calendar">
				<div className="calendar_switch-data">
					<Select
						onChange={changeMonthHandler}
						className="month-switcher"
						optionList={Info.months('long', {locale: 'eng'})}
						defaultOption={+selectedMonth}
					/>
					<YearSwitcher
						onClick={changeYearHandler}
						currentYear={selectedYear}
					/>
				</div>
				<div className="calendar-container">
					{Info.weekdays('short', {locale: 'en'}).map((e, i) => (
						<div key={i} className="calendar-day">{e}</div>
					))}

					{daysArr.map((e, i) => {
						if (e) {
							return (
								<CalendarDateSection
									selectedDays={selectedDays}
									isToday={
										+e === currentDate.day &&
										+selectedMonth === DateTime.now().month &&
										+selectedYear === DateTime.now().year
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
					control={<Switch onChange={changeThemeHandler} checked={theme === 'Dark'}/>}
					label={theme + ' Mode'}
					labelPlacement={'start'}
				/>
			</div>
		</Modal>
	)
}

export default Calendar
