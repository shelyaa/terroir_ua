import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  name: null,
  id: null,
  role: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isLoading = false;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.name = null;
      state.id = null;
      state.role = null;
      state.isLoading = false;

    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
});

export const {setUser, removeUser, setLoading} = userSlice.actions;

export default userSlice.reducer;