import { configureStore } from '@reduxjs/toolkit';
import boxReducer from './boxReducer';

const store = configureStore({
  reducer: {
    boxer: boxReducer,
  }
})

export default store;