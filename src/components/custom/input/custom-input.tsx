import cn from 'classnames';

import style from './custom-input.module.css';

interface CustomInputProps extends React.ComponentProps<'input'> {
  name: string;
  label?: string;
  classNames?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  classNames,
  ...props
}) => {
  return (
    <div className={cn(style.inputContainer, classNames)}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input className={cn(style.input)} id={name} name={name} {...props} />
    </div>
  );
};

export default CustomInput;
