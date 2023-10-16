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

export const SendContact = createAsyncThunk(
  "Contact/SendContact",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}/contacts`, resD, {
          headers: {
            // Authorization: `Bearer  ${Cookies.get("SuperAdminToken")}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            // Authorization: `Bearer ${Cookies.get("MIG_Token")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getProduct = createAsyncThunk(
  "Contact/getProduct",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}/products/${resD}`, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getProductSummery = createAsyncThunk(
  "Contact/getProductSummery",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}/summary${resD}`, {
          // headers: {
          //   Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          // },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const AddToCartApi = createAsyncThunk(
  "Contact/AddToCartApi",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}/card`, resD, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const GetToCart = createAsyncThunk(
  "Contact/GetToCart",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}/card`, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const DeleteFromcart = createAsyncThunk(
  "Contact/DeleteFromcart",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(`${process.env.REACT_APP_BACKEND_API}/card/${id}`, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const GetCpupon = createAsyncThunk(
  "Contact/GetCpupon",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}/coupon`, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("ut")}`,
          },
          params: {
            name: resD,
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const AddPayment = createAsyncThunk(
  "Contact/AddPayment",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}/payment`, resD, {
          headers: {
            Authorization: `Bearer  ${localStorage.getItem("ut")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const UpdateProfile = createAsyncThunk(
  "Contact/UpdateProfile",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/users/${localStorage.getItem(
            "ui_Ap"
          )}`,
          resD,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer  ${localStorage.getItem("ut")}`,
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const UpdateDefult = createAsyncThunk(
  "Contact/UpdateDefult",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .put(
          `${process.env.REACT_APP_BACKEND_API}/addresses/${id}`,
          {
            is_default: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer  ${localStorage.getItem("ut")}`,
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const DeleteAddress = createAsyncThunk(
  "Contact/DeleteAddress",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_API}/addresses/${id}`,

          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer  ${localStorage.getItem("ut")}`,
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const ContactSlice = createSlice({
  name: "Contact",
  initialState: {
    isEmployeesLoading: false,
    error: null,
    empolyees: null,
    productArr: null,
    summeryArr: null,
    CartArr: null,
    TotalPrice: 0,
  },

  extraReducers: {
    //   // ClientsArr
    [getProduct.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.productArr = action.payload.data;
      state.isEmployeesLoading = false;
    },
    // getProductSummery
    [getProductSummery.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [getProductSummery.fulfilled]: (state, action) => {
      state.summeryArr = action.payload.data;
      state.isEmployeesLoading = false;
    },
    // GetToCart
    [GetToCart.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [GetToCart.fulfilled]: (state, action) => {
      state.CartArr = action.payload.data;
      // const Test = [{ price: 5 }, { price: 6 }, { price: 3 }];
      state.TotalPrice = action.payload.data.reduce(
        (acc, cur) => parseFloat(acc) + parseFloat(cur.price),
        0
      );
      state.isEmployeesLoading = false;
    },

    [GetCpupon.fulfilled]: (state, action) => {
      // const Test = [{ price: 5 }, { price: 6 }, { price: 3 }];
      if (action.payload.data) {
        state.TotalPrice =
          state.TotalPrice - (state.TotalPrice * action.payload.data) / 100;
      }
      state.isEmployeesLoading = false;
    },
    // [getUsers.rejected]: (state, action) => {
    //   state.isEmployeesLoading = false;
    //   // state.LoginArr = action.payload.data;
    //   // console.log(action);
    // },
    // [AddEmployees.pending]: (state, action) => {
    //   state.isEmployeesLoading = true;
    // },
    // [AddEmployees.fulfilled]: (state, action) => {
    //   if (action.payload.data) {
    //     state.empolyees.push(action.payload.data);
    //   }
    //   state.isEmployeesLoading = false;
    // },
    // [AddEmployees.rejected]: (state, action) => {
    //   state.error = action.payload.response.data.message;
    //   // console.log(action);
    //   state.isEmployeesLoading = false;
    // },
    // // DeletedEmployees
    // [DeletedEmployees.pending]: (state, action) => {
    //   state.isEmployeesLoading = true;
    // },
    // [DeletedEmployees.fulfilled]: (state, action) => {
    //   state.empolyees = state.empolyees.filter(
    //     (ele) => ele.id !== action.meta.arg
    //   );
    //   state.isEmployeesLoading = false;
    // },
    // [DeletedEmployees.rejected]: (state, action) => {
    //   state.isEmployeesLoading = false;
    // },
  },
});

export default ContactSlice.reducer;
