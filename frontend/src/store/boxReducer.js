import { createSlice } from '@reduxjs/toolkit'

//state
const initialState = {
  formValues: {
    name: '',
    weight: '',
    colour: {
      r: 0,
      g: 0,
      b: 0,
    },
    country: 'default',
    cost: '',
  },
  showNewColour: false,
  showNameError: false,
}

//mutation
export const boxSlice = createSlice({
  name: 'boxReducer',
  initialState,
  reducers: {
    setColour: (state, selectedColour) => {
      // console.log(selectedColour);
      selectedColour.payload.b = 0;
      state.formValues.colour = selectedColour.payload;
      // console.log(state.formValues.colour)
    },
    setShowNewColour: (state) => {
      state.showNewColour = true;
    },
    setName: (state, selectedName) => {
      state.formValues.name = selectedName.payload;
    },
    setWeight: (state, selectedWeight) => {
      state.formValues.weight = selectedWeight.payload;
    },
    setCountry: (state, selectedCountry) => {
      state.formValues.country = selectedCountry.payload;
    },
    setForm: (state, resetedForm) => {
      state.formValues = resetedForm.payload;
      state.showNewColour = false;
      state.showNameError = false;
    },
    setShowNameError: (state) => {
      state.showNameError = true;
    }
  },
})

export const { setColour, setShowNewColour, setName, setWeight, setCountry, setForm, setShowNameError } = boxSlice.actions;

export default boxSlice.reducer;