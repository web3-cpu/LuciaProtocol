import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import tw, { css } from "twin.macro";
import { CSSProp } from "styled-components";

import Typography from "../typography";

type InputProps =
  | ({
      multiline: true;
    } & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>)
  | ({
      multiline?: false;
    } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>);

type TextFieldProps = InputProps & {
  label?: string;
  helperText?: string;
  multiline?: boolean;
  // true - valid, false - error, undefined - normal
  isValid?: boolean;

  containerStyles?: {
    css?: CSSProp;
    tw?: string;
  };

  css?: CSSProp;
  tw?: string;
};

const Component = ({ multiline, ...props }: InputProps) => {
  if (multiline)
    return (
      <textarea {...(props as DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>)} />
    );
  return <input {...(props as DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)} />;
};

const TextField = ({ label, helperText, isValid, containerStyles, ...props }: TextFieldProps) => (
  <InputContainer {...containerStyles}>
    {label && (
      <Typography
        variant="label1"
        weight="regular"
        tw="block mb-1"
        css={[props.disabled ? tw`` : isValid === true ? tw`` : isValid === false ? tw`text-danger` : tw``]}
      >
        {label}
      </Typography>
    )}
    <Component
      {...props}
      css={[
        inputStyles,
        props.disabled ? disabledStyles : isValid === true ? validStyles : isValid === false ? errorStyles : null,
        props.css,
      ]}
    />
    {helperText && (
      <Typography variant="label1" weight="regular" tw="block mt-1" css={[isValid === false ? tw`text-danger` : tw``]}>
        {helperText}
      </Typography>
    )}
  </InputContainer>
);

const InputContainer = tw.div`w-full`;
const inputStyles = css`
  ${tw`rounded-lg focus:(border-primary) w-full`}

  padding: 8px 16px;
  background-color: #faf7f5;
  font-size: 16px;
  line-height: 30px;
  border: 1px solid transparent;
  outline: none;

  &:focus {
    background-color: #fbf6f1;
  }
`;

const disabledStyles = css`
  border-color: #dde2e5;
  background-color: #fbf9f8;
`;

const validStyles = tw``;
const errorStyles = tw``;

export default TextField;
