import React, { useCallback, useEffect, useRef, useState } from "react";
import Output from "./components/Output";
import InputHome from "./components/InputHome";
import { useDispatch, useSelector } from "react-redux";
import { getNoteRequest } from "../../store/Actions/noteAction";
import "./Home.css";
import SearchIcon from "../../assets/img/searchIcon.png";
import Modal from "../../widgets/Modal/Modal";
import Input from "../../widgets/Input/Input";
import Button from "../../widgets/Button/Button";
import NoteDropdown from "../../components/NoteDropdown/NoteDropdown";

function Home() {
  const { notes, addnoteLoading, updateNoteLoading } = useSelector(
    (state) => state.noteReducer
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState({ searchValue: "" });

  const [inputModal, setInputModal] = useState(false);
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState({ folder: "" });
  const [note, setNote] = useState({ title: "", text: "" });
  const [colorCode, setColorCode] = useState({});
  const [error, setError] = useState({ title: "", text: "" });
  const [toggleId, setToggleId] = useState(null);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastElementRef = useCallback((element) => {
    if (!element) return;
    if (observer.current) observer.current.disconnect();

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage((prev) => prev + 1);
    }, options);

    observer.current.observe(element);
  }, []);

  useEffect(() => {
    const paramsObj = {
      page,
      limit: 15,
    };
    dispatch(getNoteRequest(paramsObj));
  }, [page]);

  return (
    <>
      <div className="notesContainer">
        <div className="centerNoteContainer">
          <div className="centerNotesNavbar">
            <div className="blankSpace"></div>
            <div className="searchAndProfilrContainer">
              <div className="SearchContainer">
                <img src={SearchIcon} />
                <Input
                  type="text"
                  className="search"
                  placeholder="Search"
                  name="searchValue"
                  value={search.searchValue}
                  setValue={setSearch}
                />
              </div>
            </div>
          </div>
          <div className="FolderNavigationContainer noscrollbar">
            <Button
              className="addnewfolderbtn"
              onClick={() => setNewFolderModal(true)}
            >
              + Add New
            </Button>
            {[...Array(2).keys()].map((_, ind) => (
              <NoteDropdown key={`noteDropdown-${ind}`} />
            ))}
          </div>
          <div className="InputOutputNotes scrollbar">
            <Button
              className="addnewnotebtn"
              onClick={() => {
                setInputModal(true);
                setColorCode({
                  bg: " #e8e8e899",
                  txt: " #708090",
                });
              }}
            >
              + Add New Note
            </Button>

            <div className="output">
              {notes?.map((cur, ind) => {
                return (
                  <Output
                    key={ind}
                    ref={ind == notes.length - 1 ? lastElementRef : undefined}
                    id={cur._id}
                    titleContent={cur.title}
                    selectedColor={cur?.colorCode}
                    setColorCode={setColorCode}
                    textContent={cur.text}
                    isFavorite={cur?.isFavorite}
                    setNote={setNote}
                    setToggle={setToggleId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal
        onClose={() => {
          setColorCode({});
          setNote({ title: "", text: "" });
          setError({ title: "", text: "" });
          setInputModal(false);
          setToggleId(null);
        }}
        isModal={inputModal || toggleId}
        showCloseButton
        className="modal"
      >
        <InputHome
          note={note}
          setNote={setNote}
          toggle={toggleId}
          setToggle={setToggleId}
          error={error}
          setError={setError}
          setInputModal={setInputModal}
          setColorCode={setColorCode}
          selectedColor={colorCode}
          addnoteLoading={addnoteLoading}
          updateNoteLoading={updateNoteLoading}
        />
      </Modal>

      <Modal
        isModal={newFolderModal}
        showCloseButton
        onClose={() => setNewFolderModal(false)}
        className="modal"
      >
        <div className="addFolder">
          <h1 className="modalHeading">Add New Folder</h1>
          <Input
            type="text"
            placeholder="Enter your folder name"
            className="input"
            autoComplete="off"
            name="folder"
            value={newFolderName}
            setValue={setNewFolderName}
          />
          <Button>Create</Button>
        </div>
      </Modal>
    </>
  );
}

export default Home;
