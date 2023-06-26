import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useAppSelector } from '../../hooks/redux-hooks';
import ProfileForm from '../../components/profile-form/profile-form';
import AdvantagesForm from '../../components/advantages-form/advantages-form';
import CustomBtn from '../../components/custom/button/custom-btn';
import AboutForm from '../../components/about-form/about-form';
import Stepper from '../../components/stepper/stepper';
import styles from './create.module.css';

const steps = [
  {
    label: '1',
    step: 1,
  },
  {
    label: '2',
    step: 2,
  },
  {
    label: '3',
    step: 3,
  },
];

const Create = () => {
  const { status } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { step } = useParams();

  let formId;

  switch (step) {
    case 'step1':
      formId = 'profileForm';
      break;
    case 'step2':
      formId = 'advantagesForm';
      break;
    case 'step3':
      formId = 'aboutForm';
      break;
    default:
      throw new Error(`${t('errors.unknown_value')}: '${step}'!`);
  }

  return (
    <div className="container create-container">
      <Stepper steps={steps} activeStep={Number(step.replace(/\D/g, ''))} />

      <main>
        <div className={cn(styles.pageWrapper)}>
          {step === 'step1' && <ProfileForm />}
          {step === 'step2' && <AdvantagesForm />}
          {step === 'step3' && <AboutForm />}
        </div>
      </main>

      <div className={cn(styles.navigation)}>
        <CustomBtn
          classNames={cn(styles.backBtn)}
          onClick={() => navigate(-1)}
          type="button"
        >
          {t('buttons.back')}
        </CustomBtn>

        <CustomBtn
          form={formId}
          classNames={cn(styles.nextBtn)}
          type="submit"
          disabled={status === 'loading'}
        >
          {step === 'step3' ? `${t('buttons.submit')}` : `${t('buttons.next')}`}
        </CustomBtn>
      </div>
    </div>
  );
};

export default Create;
