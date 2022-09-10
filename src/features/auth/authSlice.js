import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // for user object
    userToken: localStorage.getItem("token") || null, // for storing the JWT
    isLoggedIn: false,
    error: null,
    success: false, // for monitoring the registration process.
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },

    LOG_OUT: (state) => {
      console.log("called set LOG_OUT", state);
      state.user = undefined;

      console.log("called set LOG_OUT", state);
    },
  },
});

export const { setUser, setIsLoggedIn, setUserToken, LOG_OUT } =
  authSlice.actions;

export default authSlice.reducer;
