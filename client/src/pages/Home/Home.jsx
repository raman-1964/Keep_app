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
import { pagination } from "../../utils/pagination";
import { createFolderRequest } from "../../store/Actions/folderAction";
import Spinner from "../../components/Spinner/Spinner";

function Home() {
  const dispatch = useDispatch();

  const observer = useRef();

  const [page, setPage] = useState(1);
  const [colorCode, setColorCode] = useState({});
  const [toggleId, setToggleId] = useState(null);
  const [inputModal, setInputModal] = useState(false);
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [search, setSearch] = useState({ searchValue: "" });
  const [newFolderName, setNewFolderName] = useState({ folder: "" });
  const [note, setNote] = useState({ title: "", text: "" });
  const [error, setError] = useState({ title: "", text: "" });

  const {
    notes,
    addnoteLoading,
    updateNoteLoading,
    isNextPage,
    notesLoading,
    isNextPageLoading,
  } = useSelector((state) => state.noteReducer);
  const { createfolderLoading } = useSelector((state) => state.folderReducer);

  const lastElementRef = useCallback(
    (element) => pagination(element, observer, isNextPage, setPage),
    [isNextPage]
  );

  const createNewFolder = () => {
    dispatch(
      createFolderRequest({ name: newFolderName.folder, setNewFolderModal })
    );
  };

  useEffect(() => {
    if (selectedFolder) {
      const paramsObj = {
        folder: selectedFolder._id,
        page,
        limit: 5,
      };
      dispatch(getNoteRequest(paramsObj));
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [page, selectedFolder?._id]);

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
              <div className="selectedFolderName">
                <span></span>
                <p>{selectedFolder?.name}</p>
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

            <NoteDropdown
              type="personal"
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
            />
            <NoteDropdown
              type="shared"
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
            />
          </div>

          {selectedFolder?._id ? (
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

              {notesLoading ? (
                <div className="spinner-cont">
                  <Spinner />
                </div>
              ) : (
                <div className="output">
                  {notes?.map((cur, ind) => {
                    return (
                      <Output
                        key={ind}
                        ref={
                          ind == notes.length - 1 ? lastElementRef : undefined
                        }
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
              )}
              {isNextPageLoading ? (
                <div className="spinner-cont">
                  <Spinner />
                </div>
              ) : null}
            </div>
          ) : null}
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
          selectedFolder={selectedFolder}
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
          <Button
            onClick={() => createNewFolder()}
            spinnerTheme="light"
            loading={createfolderLoading}
          >
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Home;
