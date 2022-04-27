import React, { useState, useEffect } from 'react'

const ThemeContext = React.createContext({
	theme: 'Light',
	onChangeThemeToLight: () => {},
	onChangeThemeToDark: () => {},
})

export const ThemeCtxProvider = props => {
	const [theme, setTheme] = useState('Light')

	useEffect(() => {
		const settledTheme = localStorage.getItem('THEME_OF_INTERFACE')
		if (settledTheme) {
			setTheme(settledTheme)
		} else setTheme('Light')
	}, [])

	useEffect(() => {
		localStorage.setItem('THEME_OF_INTERFACE', theme)
	}, [theme])

	const setLightTheme = () => {
		setTheme('Light')
	}
	const setDarkTheme = () => {
		setTheme('Dark')
	}

	return (
		<ThemeContext.Provider
			value={{
				theme: theme,
				onChangeThemeToDark: setDarkTheme,
				onChangeThemeToLight: setLightTheme,
			}}
		>
			{props.children}
		</ThemeContext.Provider>
	)
}

export default ThemeContext
