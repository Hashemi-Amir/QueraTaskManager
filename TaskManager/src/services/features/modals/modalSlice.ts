import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
    large : boolean | string,
    medium : boolean | string,
    small : boolean | string ,
    xSmall : boolean | string
};

const initialState: initialStateType = {
    large : '',
    medium : '',
    small : '' ,
    xSmall : ''
};


const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {

    closeAllModals: (state) => {
        state.large = '';
        state.medium = '';
        state.small = '' ;
        state.xSmall = '' ;
    },
    toggleLargeModal : (state , action) => {
        state.large = action.payload
    },
    toggleMediumModal : (state , action) => {
        state.medium = action.payload
    },
    toggleSmallModal : (state , action) => {
        state.small = action.payload
    },
    toggleXSmallModal : (state , action) => {
        state.xSmall = action.payload
    },

  },

});

export default modalSlice.reducer;
export const { closeAllModals , toggleLargeModal , toggleMediumModal , toggleSmallModal,toggleXSmallModal} =
modalSlice.actions;

