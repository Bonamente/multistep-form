import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.notFound} container`}>
      <h1 className={styles.title}>{t('notFound.text')}</h1>
      <Link className={styles.link} to="/">
        {t('notFound.link')}
      </Link>
    </div>
  );
};

export default NotFoundPage;
