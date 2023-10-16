import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "js-cookie";

// export const getUsers = createAsyncThunk(
//   "Contact/getUsers",
//   async (resD, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const data = await axios
//         .get(`${process.env.REACT_APP_BACKEND_API}/admin/users`, {
//           headers: {
//             // Authorization: `Bearer  ${Cookies.get("SuperAdminToken")}`,
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             // Authorization: `Bearer ${Cookies.get("MIG_Token")}`,
//           },
//         })
//         .then((res) => res.data);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const getSearch = createAsyncThunk(
  "Home/getSearch",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}/search`, {
          // headers: {
          //   Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          // },
          params: { name: resD },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const HomeSlice = createSlice({
  name: "Home",
  initialState: {
    isEmployeesLoading: false,
    error: null,
    empolyees: null,
    SearchArr: null,
    summeryArr: null,
    CartArr: null,
    TotalPrice: 0,
  },

  extraReducers: {
    //   // ClientsArr
    [getSearch.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [getSearch.fulfilled]: (state, action) => {
      state.SearchArr = action.payload.data;
      state.isEmployeesLoading = false;
    },
  },
});

export default HomeSlice.reducer;
