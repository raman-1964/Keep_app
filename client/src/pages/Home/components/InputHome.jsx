import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Edit } from "../../../assets/svg/edit.svg";
import { ReactComponent as Plus } from "../../../assets/svg/plus.svg";
import { addNoteRequest, updateNoteRequest } from "../../../store/Actions/noteAction";
import { noteAllValidation } from "../../../utils/validation";
import Input from "../../../widgets/Input";
import Button from "../../../widgets/Button";

function InputHome({
  note,
  setNote,
  toggle,
  setToggle,
  error,
  setError,
  addnoteLoading,
  updateNoteLoading,
}) {
  const dispatch = useDispatch();
  const id = toggle;

  const addOrUpdate = (st) => {
    const { isValid, errors } = noteAllValidation(note);

    if (isValid) {
      if (st === "update") dispatch(updateNoteRequest({ note, id }));
      else dispatch(addNoteRequest(note));
    }

    setError(errors);
    setToggle("");
    setNote({
      title: "",
      text: "",
    });
  };

  return (
    <>
      <div className="inputContainer">
        <Input
          type="text"
          placeholder="Enter title..."
          className="input"
          autoComplete="off"
          name="title"
          value={note}
          setValue={setNote}
        />
        <Input
          type="textarea"
          cols=""
          rows="8"
          placeholder="Enter text..."
          className="textarea"
          name="text"
          value={note}
          setValue={setNote}
        />
        <p className="error homeError">
          {error && error["title"] && error["text"]
            ? "The title and text field is required."
            : error && error["title"]
            ? error["title"][0]
            : error && error["text"] && error["text"][0]}
        </p>
        {toggle || updateNoteLoading ? (
          <Button
            loading={updateNoteLoading}
            onClick={() => addOrUpdate("update")}
          >
            <Edit />
          </Button>
        ) : (
          <Button
            loading={addnoteLoading}
            onClick={() => addOrUpdate("add")}
          >
            <Plus />
          </Button>
        )}
      </div>
    </>
  );
}

export default InputHome;
