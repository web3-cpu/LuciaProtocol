import { ReactNode } from "react";
import { CSSProp } from "styled-components";
import tw, { css } from "twin.macro";

interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "subheading1"
    | "subheading2"
    | "subheading3"
    | "paragraph1"
    | "paragraph2"
    | "label1"
    | "label2"
    | "label3";
  weight?: "bold" | "semibold" | "medium" | "regular";

  color?: string;
  css?: CSSProp;
  tw?: string;
  children?: number | string | string[] | ReactNode;
}

const fontSizeMapping = {
  h1: css`
    font-size: 64px;
    line-height: 100px;
  `,
  h2: css`
    font-size: 52px;
    line-height: 80px;
  `,
  h3: css`
    font-size: 44px;
    line-height: 64px;
  `,
  subheading1: css`
    font-size: 32px;
    line-height: 40px;
  `,
  subheading2: css`
    font-size: 28px;
    line-height: 40px;
  `,
  subheading3: css`
    font-size: 20px;
    line-height: 32px;
  `,
  paragraph1: css`
    font-size: 16px;
    line-height: 24px;
  `,
  paragraph2: css`
    font-size: 14px;
    line-height: 20px;
  `,
  label1: css`
    font-size: 12px;
    line-height: 18px;
  `,
  label2: css`
    font-size: 11px;
    line-height: 14px;
  `,
  label3: css`
    font-size: 10px;
    line-height: 12px;
  `,
};

const weightMapping = {
  bold: tw`font-bold`,
  semibold: tw`font-semibold`,
  medium: tw`font-medium`,
  regular: tw`font-normal`,
};

const Component = ({ variant, ...props }: TypographyProps) => {
  if (variant === "h1") return <h1 {...props} />;
  if (variant === "h2") return <h2 {...props} />;
  if (variant === "h3") return <h3 {...props} />;
  if (variant === "subheading1") return <h4 {...props} />;
  if (variant === "subheading2") return <h5 {...props} />;
  if (variant === "subheading3") return <h6 {...props} />;
  if (variant === "paragraph1" || variant === "paragraph2") return <p {...props} />;
  return <span {...props} />;
};

const Typography = ({ variant = "label1", weight = "regular", children, color, css, ...props }: TypographyProps) => {
  const fontSizeStyle = fontSizeMapping[variant];
  const weightStyle = weightMapping[weight];

  return (
    <Component variant={variant} css={[fontSizeStyle, weightStyle, color && `color: ${color};`, css]} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
