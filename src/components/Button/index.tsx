import React, { ButtonHTMLAttributes } from "react";
import "styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

// eslint-disable-next-line
export const Button = ({ isOutlined = false, ...rest }: ButtonProps) => {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...rest} />
  );
};
