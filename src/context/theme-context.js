import React, { useState, useEffect } from 'react'

const ThemeContext = React.createContext({
	theme: 'light',
	onChangeThemeToLight: () => {},
	onChangeThemeToDark: () => {},
})

export const ThemeCtxProvider = props => {
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		const settledTheme = localStorage.getItem('THEME_OF_INTERFACE')
		if (settledTheme) {
			setTheme(settledTheme)
		} else setTheme('light')
	}, [])

	useEffect(() => {
		localStorage.setItem('THEME_OF_INTERFACE', theme)
	}, [theme])

	const setLightTheme = () => {
		setTheme('light')
	}
	const setDarkTheme = () => {
		setTheme('dark')
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
