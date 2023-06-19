import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contacts, Profile, Advantages, About, UserData } from './types';
import addUserData from './thunk';

const initialState: UserData = {
  contacts: {
    phone: '',
    email: '',
  },

  profile: {
    nickname: '',
    name: '',
    surname: '',
    sex: null,
  },

  advantages: {
    advantages: ['', '', ''],
    checkboxes: [],
    radio: '',
  },

  about: {
    about: '',
  },

  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addContacts(state, action: PayloadAction<Contacts>) {
      const { phone, email } = action.payload;

      state.contacts.phone = phone;
      state.contacts.email = email;
    },

    addProfile(state, action: PayloadAction<Profile>) {
      const { nickname, name, surname, sex } = action.payload;

      state.profile.nickname = nickname;
      state.profile.name = name;
      state.profile.surname = surname;
      state.profile.sex = sex;
    },

    addAdvantages(state, action: PayloadAction<Advantages>) {
      const { advantages, checkboxes, radio } = action.payload;

      state.advantages.advantages = advantages;
      state.advantages.checkboxes = checkboxes;
      state.advantages.radio = radio;
    },

    addAbout(state, action: PayloadAction<About>) {
      const { about } = action.payload;

      state.about.about = about;
    },

    clearData() {
      return { ...initialState };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserData.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(addUserData.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload as string;

        console.log(payload);
      });
  },
});

export const { addContacts, addProfile, addAdvantages, addAbout, clearData } =
  userSlice.actions;

export default userSlice.reducer;
