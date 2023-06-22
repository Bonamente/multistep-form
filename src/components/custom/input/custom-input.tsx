import { forwardRef } from 'react';
import cn from 'classnames';
import style from './custom-input.module.css';

interface CustomInputProps extends React.ComponentProps<'input'> {
  name: string;
  label: string;
  classNames: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ name, label, classNames = '', ...props }, ref) => {
    return (
      <div className={cn(style.inputContainer, classNames)}>
        <label htmlFor={name}>{label}</label>
        <input
          className={cn(style.input)}
          id={name}
          name={name}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
