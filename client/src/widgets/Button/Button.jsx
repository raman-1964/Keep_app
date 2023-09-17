import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import "./Button.css";

const Button = ({
  children,
  loading,
  className,
  spinnerClassName = "",
  spinnerTheme = "dark",
  ...rest
}) => {
  return (
    <button className={`button ${className ?? ""}`} {...rest}>
      {loading ? (
        <Spinner className={spinnerClassName ?? ""} theme={spinnerTheme} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
