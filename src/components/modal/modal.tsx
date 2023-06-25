import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useDisableBodyScroll from '../../hooks/use-disable-body-scroll';
import { clearData } from '../../store/user/slice';
import { hideModal } from '../../store/modal/slice';
import CustomBtn from '../custom/button/custom-btn';
import styles from './modal.module.css';

const Modal = () => {
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

  const modalContent =
    status === 'success' ? (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.successTitle}>
            The form has been successfully submitted
          </h2>
          <div className={styles.successIcon}>
            <img src="/icons/success-icon.svg" alt="" />
          </div>

          <CustomBtn
            className={styles.backBtn}
            onClick={handleClick}
            type="button"
          >
            Home
          </CustomBtn>
        </div>
      </div>
    ) : (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.errorTitle}>Error</h2>
          <div className={styles.errorIcon}>
            <img src="/icons/error-icon.svg" alt="" />
          </div>

          <CustomBtn
            className={styles.closeBtn}
            onClick={handleClick}
            type="button"
          >
            Close
          </CustomBtn>
        </div>
      </div>
    );

  return isOpen ? modalContent : null;
};

export default Modal;
