import { TextareaHTMLAttributes } from "react";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

export const Textarea: React.FC<ITextAreaProps> = ({
  id,
  label,
  ...textAreaProps
}) => {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...textAreaProps} />
    </div>
  );
};
