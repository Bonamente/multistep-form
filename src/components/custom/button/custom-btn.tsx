import cn from 'classnames';

import style from './custom-btn.module.css';

interface CustomBtnProps extends React.ComponentProps<'button'> {
  classNames?: string;
}

const CustomBtn: React.FC<CustomBtnProps> = ({
  classNames,
  children,
  ...props
}) => {
  return (
    <button className={cn(style.button, classNames)} type="button" {...props}>
      {children}
    </button>
  );
};

export default CustomBtn;
