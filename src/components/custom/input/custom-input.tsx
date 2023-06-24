import { forwardRef } from 'react';
import cn from 'classnames';
import style from './custom-input.module.css';

interface CustomInputProps extends React.ComponentProps<'input'> {
  id: string;
  name: string;
  label: string;
  classNames: string;
  isLabelShown: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ id, name, label, classNames, isLabelShown, ...props }, ref) => {
    return (
      <div className={cn(style.inputContainer, classNames)}>
        <label className={!isLabelShown ? 'visually-hidden' : ''} htmlFor={id}>
          {label}
        </label>
        <input id={id} name={name} ref={ref} {...props} />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
