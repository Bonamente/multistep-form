import { useForm, useController, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addProfile } from '../../store/user/slice';
import CustomInput from '../custom/input/custom-input';

import { profileFormSchema } from '../../lib/yup/schema';
import { Profile } from '../../store/user/types';
import styles from './profile-form.module.css';

const sexList = [
  { value: 'man', label: 'Man' },
  { value: 'woman', label: 'Woman' },
];

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { nickname, name, surname, sex } = useAppSelector(
    (state) => state.user.profile
  );

  const { register, handleSubmit, formState, control } = useForm<Profile>({
    defaultValues: {
      nickname,
      name,
      surname,
      sex,
    },
    shouldUseNativeValidation: false,
    // https://github.com/orgs/react-hook-form/discussions/7895
    // @ts-expect-error RHF V7 limitation
    resolver: yupResolver(profileFormSchema),
  });

  const {
    field: { value, onChange, ...restSexField },
  } = useController({ name: 'sex', control });

  const onSubmit: SubmitHandler<Profile> = (data: Profile) => {
    dispatch(addProfile(data));
    navigate('/create/step2');
  };

  return (
    <form
      id="profileForm"
      className={cn(styles.profileForm)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={cn(styles.inputContainer)}>
        <CustomInput
          classNames={cn(styles.profileInput)}
          id="nickname"
          label="Nickname"
          isLabelShown
          placeholder="user123"
          type="text"
          {...register('nickname')}
        />
        {formState.errors.nickname && (
          <p className={styles.errorMessage}>
            {formState.errors.nickname.message}
          </p>
        )}
      </div>

      <div className={cn(styles.inputContainer)}>
        <CustomInput
          classNames={cn(styles.profileInput)}
          id="name"
          label="Name"
          isLabelShown
          placeholder="John"
          type="text"
          {...register('name')}
        />
        {formState.errors.name && (
          <p className={styles.errorMessage}>{formState.errors.name.message}</p>
        )}
      </div>

      <div className={cn(styles.inputContainer)}>
        <CustomInput
          classNames={cn(styles.profileInput)}
          id="surname"
          label="Surname"
          isLabelShown
          placeholder="Doe"
          type="text"
          {...register('surname')}
        />
        {formState.errors.surname && (
          <p className={styles.errorMessage}>
            {formState.errors.surname.message}
          </p>
        )}
      </div>

      <div className={cn(styles.inputContainer)}>
        <label>Sex</label>
        <Select
          components={{
            IndicatorSeparator: () => null,
          }}
          styles={{
            control: (baseStyles, { isFocused }) => ({
              ...baseStyles,
              border: isFocused ? '2px solid #101010' : '1px solid #cecece',
              boxShadow: 'none',
              '&:hover': {
                border: isFocused ? '2px solid #101010' : '1px solid #cecece',
                boxShadow: 'none',
              },

              height: '44px',
              marginTop: '8px',
            }),
          }}
          placeholder="Not selected"
          isClearable
          options={sexList}
          value={value ? sexList.find((x) => x.value === value) : value}
          onChange={(option) => onChange(option ? option.value : option)}
          {...restSexField}
        />
        {formState.errors.sex && (
          <p className={styles.errorMessage}>{formState.errors.sex.message}</p>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
