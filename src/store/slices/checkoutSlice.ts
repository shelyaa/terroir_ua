import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  city: null,
  novaPoshtaBranch: null,
  address: null,
  zipCode: null,
  phoneNumber: null,
  details: null,
};

const checkoutSlice = createSlice({
  name: "checkoutUser",
  initialState,
  reducers: {
    setCheckoutUser(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.city = action.payload.city;
      state.novaPoshtaBranch = action.payload.novaPoshtaBranch;
      state.address = action.payload.address;
      state.zipCode = action.payload.zipCode;
      state.phoneNumber = action.payload.phoneNumber;
      state.details = action.payload.details;
    },
  },
});

export const { setCheckoutUser } = checkoutSlice.actions;

export default checkoutSlice.reducer;
