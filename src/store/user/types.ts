export interface Contacts {
  phone: string;
  email: string;
}

export interface Profile {
  nickname: string;
  name: string;
  surname: string;
  sex: 'man' | 'woman' | null;
}

export interface Advantages {
  advantages: string[];
  checkboxes: string[];
  radio: string;
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
