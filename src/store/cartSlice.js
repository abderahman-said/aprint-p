import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cartCount',
    initialState : { count : 0 },
    reducers:{
        updateCount (state , action){           
           state.count = action.payload
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;