import { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.css";

const DropDown = ({
  children,
  btn,
  width = "150px",
  top = "unset",
  right = "unset",
  left = "unset",
  bottom = "unset",
  className,
  menuClassname,
}) => {
  const dropdownRef = useRef();
  const menuRef = useRef();

  const [dropdownActive, setDropdownActive] = useState(false);
  const onClose = () => setDropdownActive(false);

  useEffect(() => {
    menuRef.current.querySelectorAll("div").forEach((button) => {
      button.addEventListener("click", onClose);
    });
  }, []);

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <div
        className={styles.dropdownbutton}
        onClick={(e) => {
          e.stopPropagation();
          setDropdownActive((prev) => !prev);
        }}
      >
        {btn}
      </div>
      <div
        ref={menuRef}
        className={`${styles.dropDownMenu} ${
          dropdownActive ? styles.isActive : ""
        } ${menuClassname}`}
        style={{ width, top, right, left, bottom }}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
