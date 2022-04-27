import { useEffect, useState } from 'react'

function CalendarDateSection(props) {
	const [classNames, setClassNames] = useState(
		props.isToday
			? ['calendar-date', 'calendar-date__today']
			: ['calendar-date']
	)
	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		switch (props.selectingPosition) {
			default:
				setClassNames(
					props.isToday
						? ['calendar-date', 'calendar-date__today']
						: ['calendar-date']
				)
				break
			case 'SINGLE_SELECTED':
				setClassNames(props.isToday
					? ['calendar-date', 'calendar-date__today', 'calendar-date__single-selected']
					: ['calendar-date', 'calendar-date__single-selected'])
				break
			case 'SELECTED_ROW_START':
				setClassNames(props.isToday
					? ['calendar-date', 'calendar-date__today', 'calendar-multiple-selected__start']
					: ['calendar-date', 'calendar-multiple-selected__start'])
				break
			case 'SELECTED_ROW_MIDDLE':
				setClassNames(props.isToday
					? ['calendar-date', 'calendar-date__today', 'calendar-multiple-selected__middle']
					: ['calendar-date', 'calendar-multiple-selected__middle'])
				break
			case 'SELECTED_ROW_END':
				setClassNames(props.isToday
					? ['calendar-date', 'calendar-date__today', 'calendar-multiple-selected__end']
					: ['calendar-date', 'calendar-multiple-selected__end'])
		}
	}, [props.selectingPosition, isClicked, props.isToday])

	const clickHandler = () => {
		if (!isClicked) {
			props.onClick('add')(props.value)
			setIsClicked(true)
		} else {
			props.onClick('remove')(props.value)
			setIsClicked(false)
		}
	}

	return (
		<div onClick={clickHandler} className={classNames.join(' ') + ' '}>
			{props.children}
		</div>
	)
}

export default CalendarDateSection
