import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  selectedOption: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload
    },
    setOption: (state, action) => {
      state.selectedOption = action.payload
    },
  },
})

export const { setText, setOption } = appSlice.actions
export default appSlice.reducer
