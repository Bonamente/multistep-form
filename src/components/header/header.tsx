import cn from 'classnames';

import style from './header.module.css';
import UserIcon from '../user-icon/user-icon';
import InfoLink from '../info-link/info-link';

import { ReactComponent as Icon } from '../../icons/folder-icon.svg';

const Header = () => {
  return (
    <header className={cn(style.header)}>
      <UserIcon>
        <p className={style.userInitials}>JD</p>
      </UserIcon>

      <div className={style.userInfo}>
        <h1 className={style.userName}>John Doe</h1>
        <ul className={style.linkList}>
          <li>
            <InfoLink linkText="Telegram" linkUrl="#" Icon={Icon} />
          </li>
          <li>
            <InfoLink linkText="GitHub" linkUrl="#" Icon={Icon} />
          </li>
          <li>
            <InfoLink linkText="Resume" linkUrl="#" Icon={Icon} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
