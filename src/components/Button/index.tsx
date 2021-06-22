import React, { ButtonHTMLAttributes } from "react";
import "styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// eslint-disable-next-line
export const Button = ({ ...rest }: ButtonProps) => {
  return <button className="button" {...rest} />;
};
