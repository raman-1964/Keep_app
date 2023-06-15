import React from "react";

function Input({
  type,
  className,
  name,
  value,
  setValue,
  width = "100%",
  ...rest
}) {
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
            className={className ?? ""}
            {...rest}
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
            className={className ?? ""}
            {...rest}
          />
        </div>
      );
  }
}

export default Input;
