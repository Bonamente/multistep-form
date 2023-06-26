/* eslint-disable no-useless-escape */
import * as Yup from 'yup';
import { i18nextInstance as i18n } from '../i18n/i18n';

// contactFormSchema
const phoneRegex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const contactFormSchema = Yup.object().shape({
  phone: Yup.string()
    .required(() => i18n.t('errors.phone'))
    .matches(phoneRegex, () => i18n.t('errors.phone_invalid')),
  email: Yup.string()
    .trim()
    .required(() => i18n.t('errors.email'))
    .email(() => i18n.t('errors.email_invalid'))
    .matches(emailRegex, () => i18n.t('errors.email_invalid')),
});

// profileFormSchema
const nicknameRegexp = /^[a-zA-Z0-9а-яА-ЯёЁ]+$/;
const nameRegexp = /^[a-zA-Zа-яА-ЯёЁ]+$/;

export const profileFormSchema = Yup.object().shape({
  nickname: Yup.string()
    .trim()
    .required(() => i18n.t('errors.nickname'))
    .matches(nicknameRegexp, () => i18n.t('errors.nickname_invalid'))
    .max(30, () => i18n.t('errors.max_length_30')),
  name: Yup.string()
    .trim()
    .required(() => i18n.t('errors.name'))
    .matches(nameRegexp, () => i18n.t('errors.name_invalid'))
    .max(50, () => i18n.t('errors.max_length_50')),
  surname: Yup.string()
    .trim()
    .required(() => i18n.t('errors.surname'))
    .matches(nameRegexp, () => i18n.t('errors.surname_invalid'))
    .max(50, () => i18n.t('errors.max_length_50')),
  sex: Yup.string().required(() => i18n.t('errors.sex')),
});

// advantagesFormSchema
export const advantagesFormSchema = Yup.object().shape({
  advantages: Yup.array().of(
    Yup.object().shape({
      value: Yup.string()
        .trim()
        .required(() => i18n.t('errors.not_empty')),
    })
  ),
});

// aboutFormSchema
export const aboutFormSchema = Yup.object().shape({
  about: Yup.string()
    .trim()
    .required(() => i18n.t('errors.not_empty'))
    .max(200, () => i18n.t('errors.max_length_200')),
});
