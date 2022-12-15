import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const Input: React.FC<IInputProps> = ({ id, label, ...inputProps }) => {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...inputProps} />
    </div>
  );
};
