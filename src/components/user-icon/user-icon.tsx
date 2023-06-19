import cn from 'classnames';

import style from './user-icon.module.css';

interface UserIconProps {
  children: React.ReactNode;
}

const UserIcon: React.FC<UserIconProps> = ({ children }) => (
  <div className={cn(style.userIcon)}>{children}</div>
);

export default UserIcon;
