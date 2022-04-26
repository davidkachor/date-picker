import ReactDOM from 'react-dom'

function Modal(props) {
	return ReactDOM.createPortal(
		<div onClick={props.onClose} className="modal">
			{props.children}
		</div>,
		document.getElementById('modal-root')
	)
}

export default Modal
