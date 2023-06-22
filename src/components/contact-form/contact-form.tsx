/* eslint-disable no-useless-escape */
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addContacts } from '../../store/user/slice';
import style from './contact-form.module.css';
import CustomInput from '../custom/input/custom-input';
import CustomBtn from '../custom/button/custom-btn';

const phoneRegex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Inputs {
  phone: string;
  email: string;
}

const schema = Yup.object().shape({
  phone: Yup.string()
    .required('Enter phone number')
    .matches(phoneRegex, 'The phone number must contain only digits'),
  email: Yup.string()
    .trim()
    .required('Enter email')
    .email('Enter a valid email')
    .matches(emailRegex, 'Enter a valid email'),
});

const ContactForm = () => {
  const navigate = useNavigate();
  const { phone, email } = useAppSelector((state) => state.user.contacts);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState } = useForm<Inputs>({
    defaultValues: {
      phone,
      email,
    },
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log('test');
    dispatch(addContacts(data));
    navigate('/create/step1');
  };

  return (
    <form className={cn(style.contactForm)} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(style.phoneInputContainer)}>
        <label htmlFor="phone">Phone</label>

        <InputMask
          className={cn(style.phoneInput, 'input-placeholder')}
          id="phone"
          mask="+7 (999) 999-99-99"
          placeholder="+7 999 999-99-99"
          {...register('phone')}
        />
        {formState.errors.phone && (
          <p className={style.errorMessage}>{formState.errors.phone.message}</p>
        )}
      </div>

      <div className={cn(style.emailInputContainer)}>
        <CustomInput
          classNames={cn(style.emailInput)}
          label="Email"
          type="email"
          placeholder="tim.jennings@example.com"
          {...register('email')}
        />
        {formState.errors.email && (
          <p className={style.errorMessage}>{formState.errors.email.message}</p>
        )}
      </div>

      <CustomBtn type="submit" classNames={cn(style.startBtn)}>
        Start
      </CustomBtn>
    </form>
  );
};

export default ContactForm;
