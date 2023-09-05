import React from "react";
import Spinner from "../components/Spinner/Spinner";

const Button = ({
  children,
  loading,
  className,
  spinnerClassName = "",
  ...rest
}) => {
  return (
    <button className={className} {...rest}>
      {loading ? <Spinner className={spinnerClassName ?? ""} /> : children}
    </button>
  );
};

export default Button;
