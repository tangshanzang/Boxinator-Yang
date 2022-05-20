import { createSlice } from '@reduxjs/toolkit'

//state
const initialState = {
  formValues: {
    name: '',
    weight: '',
    colour: {
      r: 0,
      g: 0,
      b: 255
    },
    country: '',
    cost: '',
  }
}

//mutation
export const boxSlice = createSlice({
  name: 'boxReducer',
  initialState,
  reducers: {
    setColour: (state, selectedColour) => {
      // console.log(selectedColour);
      selectedColour.payload.b = 255;
      state.formValues.colour = selectedColour.payload;
    }
  },
})

export const { setColour } = boxSlice.actions;

export default boxSlice.reducer;