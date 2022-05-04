import { createSlice } from '@reduxjs/toolkit';
import { ContentType } from '../../const';
import storage from '../../services/storage';
import { UserState } from '../../types/state';

const initialState: UserState = {
  isLogin: false,
  user: null,
  contentType: ContentType.topFilms,
};

const USER_DATA = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    registration(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
    updateUser(state, action) {
      storage.updateUser(action.payload);
      state.user = action.payload;
    },
    setContentType(state, action) {
      state.contentType = action.payload;
    },
  },
});

export const { login, registration, logout, updateUser, setContentType } = USER_DATA.actions;
export default USER_DATA.reducer;
