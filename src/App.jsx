import React, {useState} from "react";
import Calendar from "./components/Calendar/Calendar";

function App() {
	const [isModalOpened, setIsModalOpened] = useState(false)

	const clickHandler = () => setIsModalOpened(prev => !prev)

	return (
		<React.Fragment>
			<button onClick={clickHandler} className='click-me-btn'>click!</button>
			{isModalOpened && <Calendar onClose={clickHandler}/>}
		</React.Fragment>
	)
}

export default App
