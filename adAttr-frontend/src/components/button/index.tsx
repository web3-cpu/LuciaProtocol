import { ReactNode } from "react";
import { CSSProp } from "styled-components";
import tw, { css } from "twin.macro";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: "primary" | "secondary" | "green" | "danger";
  variant?: "contained" | "outlined" | "link";
  size?: "normal" | "small";
  Icon?: ReactNode;
  alignIcon?: "left" | "right";
  isDisabled?: boolean;
  label?: string;
  isRounded?: boolean;

  css?: CSSProp;
  tw?: string;
}

const Button = ({
  type = "button",
  color = "primary",
  size = "normal",
  variant = "contained",
  Icon,
  alignIcon = "left",
  label,
  isDisabled,
  isRounded,
  onClick,
  ...props
}: ButtonProps) => (
  <ButtonContainer>
    {variant !== "link" && <ButtonBackground />}
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      css={[
        props.css,
        tw`relative flex items-center justify-center gap-5 border-solid text-base active:(outline-none)`,
        isRounded ? tw`rounded-full` : tw`rounded-xl`,
        variant === "link"
          ? [tw`bg-white border-none font-medium`, textColor[color], size === "small" ? tw`text-xs` : tw`text-sm`]
          : variant === "contained"
            ? [containerStyles[size], backgroundStyles[color], borderColor[color], tw`border`]
            : [containerStyles[size], tw`bg-white border-2`, borderColor[color], textColor[color]],
        variant === "contained" &&
          css`
            &:active {
              box-shadow: 0px 4px 20px 0px #00000033 inset;
            }
          `,
        isDisabled ? tw`opacity-60 pointer-events-none` : tw`cursor-pointer`,
      ]}
      onClick={onClick}
    >
      {alignIcon === "left" && Icon}
      {label}
      {alignIcon === "right" && Icon}
    </button>
  </ButtonContainer>
);

const ButtonContainer = tw.div`relative inline-block`;

const ButtonBackground = tw.div`absolute inset-0 bg-white rounded-xl`;

const borderColor = {
  primary: tw`border-primary hover:not-active:(outline outline-8 outline-primary/10 outline-offset-0)`,
  secondary: tw`border-secondary hover:not-active:(outline outline-8 outline-secondary/10 outline-offset-0) `,
  green: tw`hover:not-active:(outline outline-8 outline-offset-0)`,
  danger: tw`border-danger hover:not-active:(outline outline-8 outline-danger/10 outline-offset-0)`,
};

const textColor = {
  primary: tw`text-primary`,
  secondary: tw`text-secondary`,
  green: tw``,
  danger: tw`text-danger`,
};

const backgroundStyles = {
  primary: tw`text-white`,
  secondary: tw`text-white`,
  green: tw`text-white`,
  danger: tw`text-white`,
};

const containerStyles = {
  normal: tw`p-4 leading-5`,
  small: tw`px-4 py-2.5 leading-5`,
};

export default Button;
