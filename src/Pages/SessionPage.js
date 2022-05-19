import "../App.css";
import trash from "../icon/trash.png";
import notes from "../icon/notes.png";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReducerContext } from "../App";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "./utils";

const SessionPage = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const [example, setExample] = useState(state);

  const handleTrash = (id) => {
    dispatch({ type: "SESSIONDELETE", id });
  };

  const handleAdd = () => {
    dispatch({ type: "SESSIONADD" });
  };

  const handleKeyPress = (e, sesid) => {
    if (e.key === "Enter") {
      dispatch({ type: "SESSIONTITLE", sesid, title: e.target.value });
      e.target.blur();
    }
  };

  const handlerDrag = (state) => {
    setExample(state);
    dispatch({
      type: "DRAG",
      state,
    });
  };

  useEffect(() => {
	 	setExample(state) 
  },[handleAdd])

  return (
    <>
      <div className="session_container">
        <div className="session_title">
          <h2>SESSION NOTES</h2>
        </div>
        <div className="session_content">
          <Container onDrop={(e) => handlerDrag(applyDrag(example, e))}>
            {example.map((p) => {
              return (
                <Draggable key={p.sessionid}>
                  <div className="session_box" key={p.sessionid}>
                    <div className="notes_box">
                      <Link to={`/sessionpage/${p.sessionid}`}>
                        <img src={notes} alt="notes" />
                      </Link>
                    </div>
                    <div className="title_box">
                      <input
                        placeholder={p.title}
                        type="text"
                        defaultValue={p.title}
                        onKeyPress={(e) => handleKeyPress(e, p.sessionid)}
                      />
                    </div>
                    <div className="date_box">
                      <span>{p.date}</span>
                    </div>
                    <div
                      className="trash_box"
                      onClick={() => handleTrash(p.sessionid)}
                    >
                      <button>
                        <img src={trash} alt="trash" />
                      </button>
                    </div>
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </div>
        <div className="add_page" onClick={handleAdd}>
          <button className="add_button">+</button>
          <p> Add page </p>
        </div>
      </div>
    </>
  );
};

export default SessionPage;

// const [session, setSession] = useState([
//     {
//       sessionid: nanoid(),
//       title: "Session 2",
//       tamplatePage: {
//         tamplateid: nanoid(),
//         tamplatetitle: "Tamplate1",
//         text: {
//           texttitle: "",
//         },
//       },
//     },
//   ]);

//   const handleAdd = () => {
//     setSession([
//       ...session,
//       {
//         title: "Session ",
//         sessionid: nanoid(),
//         date: new Date().toString().substring(4, 10),
//         tamplatePage: [
//           {
//             tamplateid: nanoid(),
//             tamplatetitle: "tamplate ",
//             textpage:{
//               text:''
//             }
//           },
//         ],
//       },
//     ]);
//   };

//   const handleTrash = (id) => {
//     setSession((prevsession) => prevsession.filter((item) => item.sessionid !== id));
//   };
