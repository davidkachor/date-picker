import {configureStore} from "@reduxjs/toolkit";
import ThemeSlice from './themeSlice'

const store = configureStore({
    reducer: ThemeSlice
})

export default store