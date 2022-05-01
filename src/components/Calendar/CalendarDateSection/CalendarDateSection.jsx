import React, {useCallback, useEffect, useState} from 'react'

function CalendarDateSection(props) {
	const [classNames, setClassNames] = useState(
		props.isToday
			? 'calendar-date calendar-date__today'
			: 'calendar-date'
	)
	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		if (props.selectedDays.length === 1 && props.value === props.selectedDays[0]) {
			setClassNames(props.isToday
				? 'calendar-date calendar-date__today calendar-date__single-selected'
				: 'calendar-date calendar-date__single-selected')
		} else if (props.selectedDays.length === 2 && props.value === props.selectedDays[0]) {
			setClassNames(props.isToday
				? 'calendar-date calendar-date__today calendar-multiple-selected__start'
				: 'calendar-date calendar-multiple-selected__start')
		} else if (
					props.selectedDays.length === 2
					&& props.value > props.selectedDays[0]
					&& props.value < props.selectedDays[1]
		) {
			setClassNames(props.isToday
				? 'calendar-date calendar-date__today calendar-multiple-selected__middle'
				: 'calendar-date calendar-multiple-selected__middle')
		} else if (props.selectedDays.length === 2 && props.value === props.selectedDays[1]) {
			setClassNames(props.isToday
				? 'calendar-date calendar-date__today calendar-multiple-selected__end'
				: 'calendar-date calendar-multiple-selected__end')
		} else setClassNames(
			props.isToday
				? 'calendar-date calendar-date__today'
				: 'calendar-date'
		)

	}, [props.selectedDays,props.value, isClicked, props.isToday])

	const clickHandler = useCallback(() => {
		if (!isClicked) {
			props.onClick('add')(props.value)
			setIsClicked(true)
		} else {
			props.onClick('remove')(props.value)
			setIsClicked(false)
		}
	}, [props, isClicked])

	return (
		<div onClick={clickHandler} className={classNames}>
			{props.children}
		</div>
	)
}

export default React.memo(CalendarDateSection)
