import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addAbout } from '../../store/user/slice';
import addUserData from '../../store/user/thunk';
import { showModal } from '../../store/modal/slice';

import { aboutFormSchema } from '../../lib/yup/schema';
import { About } from '../../store/user/types';
import styles from './about-form.module.css';

const AboutForm = () => {
  const dispatch = useAppDispatch();
  const { contacts, profile, advantages, about } = useAppSelector(
    (state) => state.user
  );

  const aboutText = about.about;

  const [count, setCount] = useState(0);
  const maxLength = 200;

  const { register, handleSubmit, formState, watch } = useForm<About>({
    defaultValues: { about: aboutText },
    shouldUseNativeValidation: false,
    resolver: yupResolver(aboutFormSchema),
  });

  useEffect(() => {
    const textLength = watch().about.replace(/\s/g, '').length;
    setCount(textLength);
  }, [watch().about]);

  const onSubmit: SubmitHandler<About> = (data: About) => {
    dispatch(addAbout(data));
    dispatch(addUserData({ contacts, profile, advantages, about }));
    dispatch(showModal());
  };

  return (
    <form
      id="aboutForm"
      className={cn(styles.aboutForm)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={cn(styles.aboutContainer)}>
        <label htmlFor="about">About</label>
        <textarea
          className={cn(styles.about)}
          id="about"
          placeholder="Add information about yourself"
          {...register('about')}
        />
        {formState.errors.about && (
          <p className={styles.errorMessage}>
            {formState.errors.about.message}
          </p>
        )}
        <div className={cn(styles.counter)}>
          <p>
            <span
              className={cn(
                styles.counterValue,
                count > maxLength ? `${styles.counterError}` : ''
              )}
            >
              {count}
            </span>{' '}
            / {maxLength}
          </p>
        </div>
      </div>
    </form>
  );
};

export default AboutForm;
