/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

// contactFormSchema
const phoneRegex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const contactFormSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Enter phone number')
    .matches(phoneRegex, 'The phone number must contain only digits'),
  email: Yup.string()
    .trim()
    .required('Enter email')
    .email('Enter a valid email')
    .matches(emailRegex, 'Enter a valid email'),
});

// profileFormSchema
const nicknameRegexp = /^[a-zA-Z0-9]+$/;
const nameRegexp = /^[a-zA-Z]+$/;

export const profileFormSchema = Yup.object().shape({
  nickname: Yup.string()
    .trim()
    .required('Enter your nickname')
    .matches(nicknameRegexp, 'Only letters and numbers are allowed')
    .max(30, 'The maximum length is 30 characters'),
  name: Yup.string()
    .trim()
    .required('Enter your name')
    .matches(nameRegexp, 'The name must contain only letters')
    .max(50, 'The maximum length is 50 characters'),
  surname: Yup.string()
    .trim()
    .required('Enter your surname')
    .matches(nameRegexp, 'The surname must contain only letters')
    .max(50, 'The maximum length is 50 characters'),
  sex: Yup.string().required('Select sex'),
});

// advantagesFormSchema
export const advantagesFormSchema = Yup.object().shape({
  advantages: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().trim().required('The field must not be empty'),
    })
  ),
});
