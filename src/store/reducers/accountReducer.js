import { createSlice } from "@reduxjs/toolkit";

const accountReducer = createSlice({
  name: "account",
  initialState: {
    account: "",
    balance: 0,
    wallet: "",
    wcsession: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setWcSession: (state, action) => {
      state.wcsession = action.payload;
    },
  },
});

export const {
    setAccount,
    setBalance,
    setWallet,
    setWcSession,
} = accountReducer.actions;

export default accountReducer.reducer;
