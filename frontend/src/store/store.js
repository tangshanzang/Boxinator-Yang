import { configureStore } from '@reduxjs/toolkit';
import boxReducer from './boxReducer';

const store = configureStore({
  reducer: {
    boxReducer: boxReducer,
  }
})

export default store;