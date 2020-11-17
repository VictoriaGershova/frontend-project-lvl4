/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  props: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.props = payload.props;
    },
    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
