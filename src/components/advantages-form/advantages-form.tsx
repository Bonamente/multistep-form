import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addAdvantages } from '../../store/user/slice';
import CustomInput from '../custom/input/custom-input';
import CustomBtn from '../custom/button/custom-btn';

import { advantagesFormSchema } from '../../lib/yup/schema';
import { Advantages } from '../../store/user/types';
import styles from './advantages-form.module.css';

const radios = [1, 2, 3];

const AdvantagesForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { advantages, checkboxes, radio } = useAppSelector(
    (state) => state.user.advantages
  );

  const { register, handleSubmit, formState, control } = useForm<Advantages>({
    defaultValues: {
      advantages: [...advantages],
      checkboxes: [...checkboxes],
      radio,
    },
    shouldUseNativeValidation: false,
    // https://github.com/orgs/react-hook-form/discussions/7895
    // @ts-expect-error RHF V7 limitation
    resolver: yupResolver(advantagesFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'advantages',
  });

  const { fields: checkboxFields } = useFieldArray({
    control,
    name: 'checkboxes',
  });

  const onSubmit: SubmitHandler<Advantages> = (data: Advantages) => {
    dispatch(addAdvantages(data));
    navigate('/create/step3');
  };

  return (
    <form
      id="advantagesForm"
      className={cn(styles.advantagesForm)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={cn(styles.advantagesContainer)}>
        <h2 className={cn(styles.advantagesTitle)}>
          {t('advantagesForm.advantages')}
        </h2>
        <div>
          {fields.map((field, index) => (
            <div className={cn(styles.advantageOuterWrapper)} key={field.id}>
              <div className={cn(styles.advantageInnerWrapper)}>
                <CustomInput
                  classNames={cn(styles.advantageInput)}
                  id={field.id}
                  label={`${field.value}`}
                  isLabelShown={false}
                  type="text"
                  {...register(`advantages.${index}.value` as const)}
                />

                <CustomBtn
                  className={styles.removeBtn}
                  onClick={() => remove(index)}
                  type="button"
                >
                  <p className="visually-hidden"> {t('buttons.remove')}</p>
                  <img src="/icons/trash-icon.png" alt="" />
                </CustomBtn>
              </div>

              {formState.errors.advantages && (
                <p className={styles.errorMessage}>
                  {formState.errors.advantages?.[index]?.value?.message}
                </p>
              )}
            </div>
          ))}

          <button
            className={styles.appendBtn}
            onClick={() => append({ value: '' })}
            type="button"
          >
            <p className="visually-hidden"> {t('buttons.append')}</p>+
          </button>
        </div>
      </div>

      <div className={cn(styles.checkboxContainer)}>
        <h2 className={cn(styles.checkboxTitle)}>
          {t('advantagesForm.checkboxes')}
        </h2>
        <div>
          {checkboxFields.map((field, index) => (
            <div className={cn(styles.checkboxOuterWrapper)} key={field.id}>
              <div className={cn(styles.checkboxInnerWrapper)}>
                <CustomInput
                  classNames={cn(styles.checkboxInput)}
                  id={field.id}
                  label={`${field.value}`}
                  isLabelShown
                  type="checkbox"
                  {...register(`checkboxes.${index}.isSelected` as const)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(styles.radioContainer)}>
        <h2 className={cn(styles.radioTitle)}> {t('advantagesForm.radios')}</h2>
        <div>
          {radios.map((item) => (
            <div className={cn(styles.radioOuterWrapper)} key={item}>
              <div className={cn(styles.radioInnerWrapper)}>
                <CustomInput
                  classNames={cn(styles.radioInput)}
                  id={`${item}`}
                  label={`${item}`}
                  isLabelShown
                  value={item}
                  type="radio"
                  defaultChecked={radio === item}
                  {...register('radio')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AdvantagesForm;
