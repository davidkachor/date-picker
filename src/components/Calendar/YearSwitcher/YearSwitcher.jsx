function YearSwitcher(props) {
    return <div className='year-switcher'>
        <button onClick={props.onClick('prev-year')} className='switch-btn'>{'<'}</button>
        <p className='switch-value'>{props.currentYear}</p>
        <button onClick={props.onClick('next-year')} className='switch-btn'>{'>'}</button>
    </div>
}

export default YearSwitcher