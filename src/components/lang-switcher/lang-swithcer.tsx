import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import CustomBtn from '../custom/button/custom-btn';
import styles from './lang-switcher.module.css';

type LangSwitcherProps = {
  currentLang: string;
  changeLang: (lng: string) => void;
};

const LangSwitcher: React.FC<LangSwitcherProps> = ({
  currentLang,
  changeLang,
}) => {
  const { t } = useTranslation();
  const [isSwitched, setSwitched] = useState(currentLang !== 'en');

  const handleClick = () => {
    setSwitched(!isSwitched);

    if (isSwitched) {
      changeLang('en');
    } else {
      changeLang('ru');
    }
  };

  return (
    <CustomBtn
      classNames={cn(styles.langSwitchBtn)}
      aria-label={t('buttons.change_lang') as string}
      type="button"
      onClick={handleClick}
    >
      {isSwitched ? 'ru' : 'en'}
    </CustomBtn>
  );
};

export default LangSwitcher;
