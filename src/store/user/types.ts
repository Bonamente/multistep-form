export interface Contacts {
  phone: string;
  email: string;
}

export interface Profile {
  nickname: string;
  name: string;
  surname: string;
  sex: 'man' | 'woman' | '';
}

export interface Advantages {
  advantages: { value: string }[];
  checkboxes: { value: number; isSelected: boolean }[];
  radio: number;
}

export interface About {
  about: string;
}

export interface UserData {
  contacts: Contacts;
  profile: Profile;
  advantages: Advantages;
  about: About;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: null | string;
}

export type FetchedUserData = Omit<UserData, 'status' | 'error'>;
