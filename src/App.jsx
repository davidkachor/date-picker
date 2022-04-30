import React, {useEffect} from "react";
import CalendarInput from "./components/UI/CalendarInput";
import {useSelector} from "react-redux";

function App() {
	const theme = useSelector(state => state.theme)

	useEffect(() => {
		document.querySelector('body').id = theme === 'Light' ? 'lightTheme' : 'darkTheme'
	}, [theme])

	return (
		<React.Fragment>
			<CalendarInput/>
		</React.Fragment>
	)
}

export default App
