import { createSlice } from "@reduxjs/toolkit";

const insertIdSlice = createSlice({
  name: "insertIds",
  initialState: {
    insertUserId: false,
    isRole: false,
    isAdmin: false,
    isDataMyUser: [],
    isDataProduct: [],
    isDataCart: [],
  },
  reducers: {
    setIsDataCart(state, action) {
      state.isDataCart = action.payload;
    },
    setInsertUserId(state, action) {
      state.insertUserId = action.payload;
    },
    setIsDataProduct(state, action) {
      state.isDataProduct = action.payload;
    },
    setIsDataMyUser(state, action) {
      state.isDataMyUser = action.payload;
    },
    setIsRole(state, action) {
      state.isRole = action.payload;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const {
  setInsertUserId,
  setIsRoleName,
  setIsAdmin,
  setIsDataMyUser,
  setIsRole,
  setIsDataProduct,
  setIsDataCart
} = insertIdSlice.actions;
export default insertIdSlice.reducer;
