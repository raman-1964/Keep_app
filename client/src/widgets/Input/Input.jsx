import React, { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(
  (
    { type, className, name, value, setValue, width = "100%", ...rest },
    ref
  ) => {
    const onChange = (e) => {
      setValue((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    };

    switch (type) {
      case "textarea":
        return (
          <span style={{ width }}>
            <textarea
              value={value[name]}
              onChange={onChange}
              name={name}
              className={`input textarea ${className ?? ""}`}
              {...rest}
              ref={ref}
            />
          </span>
        );

      default:
        return (
          <div style={{ width }}>
            <input
              value={value[name]}
              onChange={onChange}
              name={name}
              type={type}
              className={`input ${className ?? ""}`}
              {...rest}
            />
          </div>
        );
    }
  }
);

export default Input;
