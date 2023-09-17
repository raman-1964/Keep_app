import { useEffect, useRef, useState } from "react";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
  isModal,
  className,
  showCloseButton = false,
  leftCloseIcon = false,
  disableCloseHover,
  closeColor,
}) => {
  const closeRef = useRef();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isModal) {
      setShowModal(true);
    }
  }, [isModal]);

  useEffect(() => {
    if (closeRef && showModal) {
      closeRef.current.focus();
    }
  }, [closeRef, showModal]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  const onAnimationEnd = () => {
    if (!isModal) setShowModal(false);
  };

  return createPortal(
    <>
      {showModal && (
        <div
          className={`${styles.modalOverlay} ${isModal && styles.open}`}
          ref={closeRef}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className={`${styles.modalBox} ${
              isModal ? styles.open : styles.close
            } ${className}`}
            onAnimationEnd={onAnimationEnd}
            // ref={modalRef}
          >
            {showCloseButton && (
              <button
                className={`${styles.closeIcon} ${
                  leftCloseIcon ? styles.leftClose : ""
                } ${disableCloseHover ? styles.closeHoverless : ""}`}
                onClick={onClose}
              >
                <Close color={closeColor ?? "#094360"} />
              </button>
            )}
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("popup-modal")
  );
};

export default Modal;
