import { createSlice } from "@reduxjs/toolkit";

const globalReducer = createSlice({
  name: "global",
  initialState: {
    success: "",
    searchBar: false,
    openSidebar: true,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload;
    },
    clearMessage: (state) => {
      state.success = "";
    },
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
  },
});

export const {
  setSuccess,
  clearMessage,
  toggleSearchBar,
  openSidebar,
  setOpenSidebar,
} = globalReducer.actions;

export default globalReducer.reducer;
