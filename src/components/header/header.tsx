import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import UserIcon from '../user-icon/user-icon';
import InfoLink from '../info-link/info-link';
import { ReactComponent as Icon } from '../../icons/folder-icon.svg';
import LangSwitcher from '../lang-switcher/lang-swithcer';
import styles from './header.module.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleLangChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem('currentLang', lng);
  };

  return (
    <header className={cn(styles.header)}>
      <UserIcon>
        <p className={styles.userInitials}>{t('homePage.user_initials')}</p>
      </UserIcon>

      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{t('homePage.user_name')}</h1>
        <ul className={styles.linkList}>
          <li>
            <InfoLink
              linkText={t('links.telegram') as string}
              linkUrl="#"
              Icon={Icon}
            />
          </li>
          <li>
            <InfoLink
              linkText={t('links.github') as string}
              linkUrl="#"
              Icon={Icon}
            />
          </li>
          <li>
            <InfoLink
              linkText={t('links.resume') as string}
              linkUrl="#"
              Icon={Icon}
            />
          </li>
        </ul>
      </div>

      <div className={styles.langSwitcher}>
        <LangSwitcher currentLang={currentLang} changeLang={handleLangChange} />
      </div>
    </header>
  );
};

export default Header;
