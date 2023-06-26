import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addContacts } from '../../store/user/slice';
import CustomInput from '../custom/input/custom-input';
import CustomBtn from '../custom/button/custom-btn';

import { contactFormSchema } from '../../lib/yup/schema';
import { Contacts } from '../../store/user/types';
import styles from './contact-form.module.css';

const ContactForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { phone, email } = useAppSelector((state) => state.user.contacts);

  const { register, handleSubmit, formState } = useForm<Contacts>({
    defaultValues: {
      phone,
      email,
    },
    shouldUseNativeValidation: false,
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<Contacts> = (data: Contacts) => {
    dispatch(addContacts(data));
    navigate('/create/step1');
  };

  return (
    <form className={cn(styles.contactForm)} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.phoneInputContainer)}>
        <label htmlFor="phone">{t('contactForm.phone')}</label>

        <InputMask
          className={cn(styles.phoneInput, 'input-placeholder')}
          id="phone"
          mask="+7 (999) 999-99-99"
          placeholder="+7 999 999-99-99"
          {...register('phone')}
        />
        {formState.errors.phone && (
          <p className={styles.errorMessage}>
            {formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className={cn(styles.emailInputContainer)}>
        <CustomInput
          classNames={cn(styles.emailInput)}
          id="email"
          label={t('contactForm.email')}
          type="email"
          placeholder="tim.jennings@example.com"
          isLabelShown
          {...register('email')}
        />
        {formState.errors.email && (
          <p className={styles.errorMessage}>
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <CustomBtn type="submit" classNames={cn(styles.startBtn)}>
        {t('buttons.start')}
      </CustomBtn>
    </form>
  );
};

export default ContactForm;
