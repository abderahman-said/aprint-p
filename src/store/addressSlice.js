import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name : 'address',
    initialState : { addresses : [] },
    reducers:{
        addAddress (state , action){  
            // state.addresses = action.payload         
           // logic
        }
    }
})

export const addressActions = addressSlice.actions;
export default addressSlice;