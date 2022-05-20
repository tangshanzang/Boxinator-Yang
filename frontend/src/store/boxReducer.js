import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  formValues: {
    name: '',
    weight: '',
    colour: '',
    country: '',
    cost: '',
  }
}

export const boxSlice = createSlice({
  name: 'boxReducer',
  initialState,
  reducers: {
  },
})

export default boxReducer.reducer;