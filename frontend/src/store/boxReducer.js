import { createSlice } from '@reduxjs/toolkit'

//state
const initialState = {
  formValues: {
    name: '',
    weight: '',
    colour: '',
    country: 'default',
    cost: '',
  },
  showNewColour: false,
  showNameError: false,
  showWeightError: false,
  showCountryError: false,
  weightErrorMsg: '',
  allOrdersFromDB: [],
  allOrdersFromDBReversed: [],
  showColourPicker: false,
  showColourError: false,
}

//mutation
export const boxSlice = createSlice({
  name: 'boxReducer',
  initialState,
  reducers: {
    setColour: (state, selectedColour) => {
      selectedColour.payload.b = 0;
      state.formValues.colour = selectedColour.payload;
      state.showColourError = false;
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
      state.showWeightError = false;
      state.showCountryError = false;
      state.showColourError = false;
    },
    setShowNameError: (state, bool) => {
      state.showNameError = bool.payload;
    },
    setShowWeightError: (state, bool) => {
      state.showWeightError = bool.payload;
    },
    setShowCountryError: (state, bool) => {
      state.showCountryError = bool.payload;
    },
    setWeightErrorMsg: (state, msg) => {
      state.weightErrorMsg = msg.payload;
    },
    setAllOrdersFromDB: (state, allOrders) => {
      state.allOrdersFromDB = allOrders.payload;
      state.allOrdersFromDBReversed = state.allOrdersFromDB.reverse();
    },
    setShowColourPicker: (state, clickedBtn) => {
      state.showColourPicker = clickedBtn.payload;
    },
    setShowColourError: (state, bool) => {
      state.showColourError = bool.payload;
    },
  },
})

export const { setColour, setShowNewColour, setName, setWeight,
  setCountry, setForm, setShowNameError, setShowWeightError,
  setShowCountryError, setWeightErrorMsg, setAllOrdersFromDB,
  setShowColourPicker, setShowColourError } = boxSlice.actions;

export default boxSlice.reducer;