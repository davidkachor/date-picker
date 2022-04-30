import {createSlice} from "@reduxjs/toolkit";

const initialState = {theme: localStorage.getItem('THEME_OF_INTERFACE') || 'Light'}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setLight(state) {
            state.theme = 'Light'
            localStorage.setItem('THEME_OF_INTERFACE', 'Light')
        },
        setDark(state) {
            state.theme = 'Dark'
            localStorage.setItem('THEME_OF_INTERFACE', 'Dark')
        }
    }
})

export const {setDark, setLight} = themeSlice.actions

export default themeSlice.reducer