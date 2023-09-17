import React, { forwardRef } from "react";
import { ReactComponent as Delete } from "../../../assets/svg/delete.svg";
import { ReactComponent as Edit } from "../../../assets/svg/edit.svg";
import { ReactComponent as Favourite } from "../../../assets/svg/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteRequest,
  likeNoteRequest,
  unlikeNoteRequest,
} from "../../../store/Actions/noteAction";
import Button from "../../../widgets/Button/Button";

const Output = forwardRef(
  (
    {
      id,
      titleContent,
      textContent,
      isFavorite = false,
      setNote,
      setToggle,
      selectedColor = {
        bg: " #e8e8e899",
        txt: " #708090",
      },
      setColorCode,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const { deleteNoteLoading } = useSelector((state) => state.noteReducer);
    const deletei = () => {
      dispatch(deleteNoteRequest(id));
    };

    return (
      <>
        <div className="card-cont" ref={ref}>
          <div
            className="cards scrollbar"
            style={{
              background: `${selectedColor.bg}`,
              color: `${selectedColor.txt}`,
            }}
          >
            <h3>{titleContent}</h3>
            <p>{textContent}</p>
          </div>
          <div className="button_cnt">
            <Button
              spinnerClassName="deleteSpinnerClassName"
              loading={deleteNoteLoading.includes(id)}
              onClick={deletei}
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
            >
              <Edit />
            </Button>
            <Button
              onClick={() => {
                if (isFavorite) dispatch(unlikeNoteRequest({ _id: id }));
                else dispatch(likeNoteRequest({ _id: id }));
              }}
            >
              <Favourite
                style={{
                  transform: "scale(0.7)",
                  fill: `${isFavorite ? "red" : ""}`,
                  color: `${isFavorite ? "red" : ""}`,
                }}
              />
            </Button>
          </div>
        </div>
      </>
    );
  }
);

export default Output;
