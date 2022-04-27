import ReactDOM from 'react-dom'
import ThemeContext from '../../context/theme-context'
import {useContext, useEffect, useState} from "react";

function Modal(props) {
	const themeCtx = useContext(ThemeContext)
	const [id, setId] = useState('lightTheme')
	const clickHandler = event => {
		if (event.target.classList.contains('modal')) {
			props.onClose()
		}
	}
	useEffect(() => {
		if (themeCtx.theme === 'Light') {
			setId('lightTheme')
		} else setId('darkTheme')
	}, [themeCtx.theme])


	return ReactDOM.createPortal(
		<div onClick={clickHandler} id={id} className="modal">
			{props.children}
		</div>,
		document.getElementById('modal-root')
	)
}

export default Modal
