import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useDisableBodyScroll from '../../hooks/use-disable-body-scroll';
import { clearData } from '../../store/user/slice';
import { hideModal } from '../../store/modal/slice';
import CustomBtn from '../custom/button/custom-btn';
import styles from './modal.module.css';

const Modal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modal);
  const { status } = useAppSelector((state) => state.user);
  useDisableBodyScroll(isOpen);

  const handleClick = () => {
    if (status === 'success') {
      dispatch(clearData());
      dispatch(hideModal());
      navigate('/');
    } else if (status === 'error') {
      dispatch(hideModal());
    }
  };

  let modalContent;

  if (status === 'success') {
    modalContent = (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.successTitle}>{t('modal.success_title')}</h2>
          <div className={styles.successIcon}>
            <img src="/icons/success-icon.svg" alt="" />
          </div>

          <CustomBtn
            className={styles.backBtn}
            onClick={handleClick}
            type="button"
          >
            {t('buttons.home')}
          </CustomBtn>
        </div>
      </div>
    );
  } else if (status === 'error') {
    modalContent = (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.errorTitle}>{t('modal.error_title')}</h2>
          <div className={styles.errorIcon}>
            <img src="/icons/error-icon.svg" alt="" />
          </div>

          <CustomBtn
            className={styles.closeBtn}
            onClick={handleClick}
            type="button"
          >
            {t('buttons.close')}
          </CustomBtn>
        </div>
      </div>
    );
  }

  return isOpen ? modalContent : null;
};

export default Modal;
