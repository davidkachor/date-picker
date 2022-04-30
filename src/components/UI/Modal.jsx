import ReactDOM from 'react-dom'

function Modal(props) {

	const clickHandler = event => {
		if (event.target.classList.contains('modal')) {
			props.onClose()
		}
	}


	return ReactDOM.createPortal(
		<div onClick={clickHandler} className="modal">
			{props.children}
		</div>,
		document.getElementById('modal-root')
	)
}

export default Modal
