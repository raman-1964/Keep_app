import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Output from "./components/Output";
import InputHome from "./components/InputHome";
import { useDispatch, useSelector } from "react-redux";
import { getNoteRequest } from "../../store/Actions/noteAction";
import "./Home.css";

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
    </>
  );
}

export default Home;
