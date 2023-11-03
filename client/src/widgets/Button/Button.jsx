import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Button.module.css";

const Button = ({
  children,
  loading,
  className,
  spinnerClassName = "",
  spinnerTheme = "dark",
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${loading && styles.loadingBtn} ${
        className ?? ""
      }`}
      {...rest}
    >
      {loading ? (
        <Spinner className={spinnerClassName ?? ""} theme={spinnerTheme} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
