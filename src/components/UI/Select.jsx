function Select(props) {
	const changeHandler = event => {
		props.onChange(+event.target.value < 10 ? '0' + event.target.value : event.target.value)
	}

	return (
		<select
			onChange={changeHandler}
			className={props.className}
			defaultValue={props.defaultOption}
			name={props.id}
			id={props.id}
		>
			{props.optionList.map((e, i) => (
				<option key={e} value={i + 1}>
					{e}
				</option>
			))}
		</select>
	)
}

export default Select
