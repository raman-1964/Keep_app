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
import Button from "../../../widgets/Button";

const Output = forwardRef(
  (
    {
      id,
      titleContent,
      textContent,
      isFavorite = false,
      setNote,
      setToggle,
      toggle,
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
          <div className="cards scrollbar">
            <h3>{titleContent}</h3>
            <p>{textContent}</p>
          </div>
          {/* <hr /> */}
          <div className="button_cnt">
            <Button
              spinnerClassName="spinnerClassName"
              loading={deleteNoteLoading.includes(id)}
              onClick={deletei}
            >
              <Delete />
            </Button>
            <Button
              style={{
                backgroundColor: `${toggle === id ? "yellow" : ""}`,
                color: `${toggle === id ? "purple" : ""}`,
              }}
              onClick={() => {
                setNote({
                  title: titleContent,
                  text: textContent,
                });
                setToggle(id);
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
