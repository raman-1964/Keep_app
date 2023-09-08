import React, { forwardRef } from "react";

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
              style={{ resize: "none", whiteSpace: "pre-wrap" }}
              className={className ?? ""}
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
              style={{ whiteSpace: "pre-wrap" }}
              className={className ?? ""}
              {...rest}
            />
          </div>
        );
    }
  }
);

export default Input;
