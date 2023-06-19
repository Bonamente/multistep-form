import { createSlice } from '@reduxjs/toolkit';
import { Modal } from './types';

const initialState: Modal = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state) {
      state.isOpen = true;
    },

    hideModal(state) {
      state.isOpen = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
