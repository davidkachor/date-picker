import React, {useState} from "react";
import Modal from './components/UI/Modal'

function App() {
	const [isModalOpened, setIsModalOpened] = useState(false)

	const clickHandler = () => setIsModalOpened(prev => !prev)

	return (
		<React.Fragment>
			<button onClick={clickHandler} className='click-me-btn'>click!</button>
			{isModalOpened && <Modal onClose={clickHandler}/>}
		</React.Fragment>
	)
}

export default App
