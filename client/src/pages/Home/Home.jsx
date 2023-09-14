import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Output from "./components/Output";
import InputHome from "./components/InputHome";
import { useDispatch, useSelector } from "react-redux";
import { getNoteRequest } from "../../store/Actions/noteAction";
import "./Home.css";
import SearchIcon from "../../assets/img/searchIcon.png";
import AddBtn from "../../assets/img/addBtn.png";

function Home() {
  const { notes, addnoteLoading, updateNoteLoading } = useSelector(
    (state) => state.noteReducer
  );
  const dispatch = useDispatch();

  const [note, setNote] = useState({ title: "", text: "" });
  const [error, setError] = useState({ title: "", text: "" });
  const [toggleId, setToggleId] = useState("");
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
                <input type="text" placeholder="Search" />
              </div>
              <div className="user-profile">
                <img src="" />
                <span>Hello, Sumit! </span>
              </div>
            </div>
          </div>
          <div className="FolderNavigationContainer">
            <button>+ Add New</button>
            <ul>
              <li>Personal</li>
              <li>Shared</li>
              <li>Liked</li>
            </ul>
          </div>
          <div className="InputOutputNotes">
            <button className="addnewnotebtn"><img src={AddBtn}/>Add New Note</button>
            <InputHome
              note={note}
              setNote={setNote}
              toggle={toggleId}
              setToggle={setToggleId}
              error={error}
              setError={setError}
              addnoteLoading={addnoteLoading}
              updateNoteLoading={updateNoteLoading}
            />
            <div className="output">
              {notes?.map((cur, ind) => {
                return (
                  <Output
                    key={ind}
                    ref={ind == notes.length - 1 ? lastElementRef : undefined}
                    id={cur._id}
                    titleContent={cur.title}
                    textContent={cur.text}
                    isFavorite={cur?.isFavorite}
                    setNote={setNote}
                    setToggle={setToggleId}
                    toggle={toggleId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
