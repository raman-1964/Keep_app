import React, { useCallback, useEffect, useRef, useState } from "react";
import Output from "./components/Output";
import InputHome from "./components/InputHome";
import { useDispatch, useSelector } from "react-redux";
import { getNoteRequest } from "../../store/Actions/noteAction";
import "./Home.css";
import Spinner from "../../components/Spinner/Spinner";
import { pagination } from "../../utils/pagination";

function Home() {
  const dispatch = useDispatch();

  const observer = useRef();
  const [note, setNote] = useState({ title: "", text: "" });
  const [error, setError] = useState({ title: "", text: "" });
  const [toggleId, setToggleId] = useState("");
  const [page, setPage] = useState(1);

  const {
    notes,
    notesLoading,
    isNextPageLoading,
    addnoteLoading,
    updateNoteLoading,
    isNextPage,
  } = useSelector((state) => state.noteReducer);

  const lastElementRef = useCallback(
    (element) => pagination(element, observer, isNextPage, setPage),
    [isNextPage]
  );

  useEffect(() => {
    const paramsObj = {
      page,
      limit: 20,
    };
    dispatch(getNoteRequest(paramsObj));

    return () => {
      if (observer.current) observer.current.disconnect();
    };
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
      {notesLoading ? (
        <div className="spinner-cont">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="output">
            {notes.length
              ? notes.map((cur, ind) => {
                  return (
                    <Output
                      key={ind}
                      ref={
                        ind === notes.length - 1 ? lastElementRef : undefined
                      }
                      id={cur._id}
                      titleContent={cur.title}
                      textContent={cur.text}
                      isFavorite={cur?.isFavorite}
                      setNote={setNote}
                      setToggle={setToggleId}
                      toggle={toggleId}
                    />
                  );
                })
              : null}
          </div>
          {isNextPageLoading ? (
            <div className="spinner-cont">
              <Spinner />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Home;
