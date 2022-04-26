import { useEffect, useState } from 'react'

function CalendarDateSection(props) {
	const [classNames, setClassNames] = useState(['calendar-date'])

	const clickHandler = () => {
		setClassNames(prev =>
			prev.length === 1
				? [...prev, 'calendar-date__selected']
				: prev.filter(e => e !== 'calendar-date__selected')
		)
	}

	useEffect(() => {}, [])

	return (
		<div
			onClick={clickHandler}
			className={classNames.join(' ') + ' ' + props.className}
		>
			{props.children}
		</div>
	)
}

export default CalendarDateSection
