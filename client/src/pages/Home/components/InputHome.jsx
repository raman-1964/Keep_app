import React from "react";
import { useDispatch } from "react-redux";
import {
  addNoteRequest,
  updateNoteRequest,
} from "../../../store/Actions/noteAction";
import { noteAllValidation } from "../../../utils/validation";
import Input from "../../../widgets/Input/Input";
import colorcode from "../../../assets/img/colorCode.png";
import Button from "../../../widgets/Button/Button";
import DropDown from "../../../widgets/DropDown/DropDown";
import { colorCode } from "../../../utils/constants";

function InputHome({
  note,
  setNote,
  toggle,
  setToggle,
  error,
  setError,
  setInputModal,
  addnoteLoading,
  updateNoteLoading,
  setColorCode,
  selectedColor,
  selectedFolder,
}) {
  const dispatch = useDispatch();
  const id = toggle;

  const addOrUpdate = (st) => {
    const { isValid, errors } = noteAllValidation(note);

    if (isValid) {
      if (st === "update")
        dispatch(
          updateNoteRequest({ setToggle, id, data: { ...note, selectedColor } })
        );
      else
        dispatch(
          addNoteRequest({
            setInputModal,
            data: { ...note, selectedColor, folder: selectedFolder },
          })
        );
    }

    setError(errors);
    setNote({
      title: "",
      text: "",
    });
  };

  return (
    <>
      <div className="inputContainer">
        <div className="dropDown">
          <DropDown
            left="0"
            width="10rem"
            btn={<img src={colorcode} />}
            menuClassname="menuCont"
          >
            <div className="colorDropDown">
              {colorCode.map((code, ind) => (
                <div
                  key={`colorCode-${ind}`}
                  style={{ background: `${code.bg}`, color: `${code.txt}` }}
                  className="colorDropDownCont"
                  onClick={() => setColorCode(colorCode[ind])}
                >
                  <h1 className="colorDropDownTxt">This is the text</h1>
                </div>
              ))}
            </div>
          </DropDown>
          <div
            style={{
              background: `${selectedColor.bg}`,
              color: `${selectedColor.txt}`,
            }}
            className="selectedColorDropDownCont"
          >
            <h1 className="colorDropDownTxt">This is the text</h1>
          </div>
        </div>
        <h1 className="modalHeading heading">
          {!toggle ? "Add " : "Update "}
          Your Note
        </h1>
        <div className="inputCont">
          <h1>Title</h1>
          <Input
            type="text"
            placeholder="Enter title..."
            autoComplete="off"
            name="title"
            value={note}
            setValue={setNote}
          />
          <p className="error">
            {error && error["title"] ? error["title"][0] : ""}
          </p>
        </div>
        <div className="inputCont">
          <h1>Text</h1>
          <Input
            type="textarea"
            placeholder="Enter text..."
            className="textarea scrollbar"
            name="text"
            value={note}
            setValue={setNote}
          />
          <p className="error">
            {error && error["text"] ? error["text"][0] : ""}
          </p>
        </div>
        <div className="addBtnCont">
          {toggle || updateNoteLoading ? (
            <Button
              loading={updateNoteLoading}
              onClick={() => addOrUpdate("update")}
              spinnerTheme="light"
            >
              Update
            </Button>
          ) : (
            <Button
              loading={addnoteLoading}
              onClick={() => addOrUpdate("add")}
              spinnerTheme="light"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default InputHome;
