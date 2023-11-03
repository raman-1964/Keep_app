import React, { forwardRef } from "react";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { ReactComponent as Favourite } from "../../assets/svg/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteRequest,
  likeNoteRequest,
  unlikeNoteRequest,
} from "../../store/Actions/noteAction";
import Button from "../../widgets/Button/Button";
import styles from "./NoteContainer.module.css";

const NoteContainer = forwardRef(
  (
    {
      id,
      titleContent,
      textContent,
      isFavorite = [],
      setNote,
      setToggle,
      selectedColor = {
        bg: "#e8e8e899",
        txt: "#708090",
      },
      isDashboard = false,
      setColorCode,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const loggedInUser = localStorage.getItem("Raman-Keep-Username");
    const { deleteNoteLoading } = useSelector((state) => state.noteReducer);
    const deletei = () => {
      dispatch(deleteNoteRequest(id));
    };

    return (
      <>
        <div className={styles.card_cont} ref={ref}>
          <div
            className={`${!isDashboard ? styles.HomeCards : null} ${
              styles.cards
            } scrollbar`}
            style={{
              background: `${selectedColor.bg}`,
              color: `${selectedColor.txt}`,
            }}
          >
            <h3>{titleContent}</h3>
            <p>{textContent}</p>
          </div>
          {!isDashboard ? (
            <div className={` ${styles.button_cnt}`}>
              <Button
                spinnerClassName={styles.deleteSpinnerClassName}
                loading={deleteNoteLoading.includes(id)}
                onClick={deletei}
                className={styles.btn}
              >
                <Delete />
              </Button>
              <Button
                onClick={() => {
                  setNote({
                    title: titleContent,
                    text: textContent,
                  });
                  setToggle(id);
                  setColorCode(selectedColor);
                }}
                className={styles.btn}
              >
                <Edit />
              </Button>
              <Button
                onClick={() => {
                  if (isFavorite.includes(loggedInUser))
                    dispatch(unlikeNoteRequest({ _id: id }));
                  else dispatch(likeNoteRequest({ _id: id }));
                }}
                className={styles.btn}
              >
                <Favourite
                  style={{
                    transform: "scale(0.7)",
                    fill: `${isFavorite.includes(loggedInUser) ? "red" : ""}`,
                    color: `${isFavorite.includes(loggedInUser) ? "red" : ""}`,
                  }}
                />
              </Button>
            </div>
          ) : null}
        </div>
      </>
    );
  }
);

export default NoteContainer;
