import insertIdReducer from "./InsertId";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    insertIds: insertIdReducer,
  },
});

export default store;
