import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FetchedUserData } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const addUserData = createAsyncThunk(
  'user/addUserData',
  async (userData: FetchedUserData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Can't send data. Server error.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      return rejectWithValue(message);
    }
  }
);

export default addUserData;
