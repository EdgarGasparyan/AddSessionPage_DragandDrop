import React, { useEffect, useContext, useState } from "react";
import trash from "../icon/trash.png";
import blanck from "../icon/blanck.png";
import { Link, useParams } from "react-router-dom";
import { ReducerContext } from "../App";

const TamplatePage = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const [templates, setTemplates] = useState([]);

  const { sesid } = useParams();

  useEffect(() => {
    const currentSession = state.filter((s) => +s.sessionid === +sesid);
    if (currentSession.length) {
      setTemplates(currentSession[0].tamplatePage);
    } else {
      setTemplates([]);
    }
  }, [sesid, state]);
  const TamplateAdd = () => {
    dispatch({ type: "TAMPLATEADD", sesid });
  };

  const TamplateDelete = (sessionId, templateId) => {
    dispatch({ type: "TAMPLATEDELETE", sessionId, templateId });
  };

  const handleKeyPress = (e, sesid, tampid) => {
    if (e.key === "Enter") {
      // console.log(sesid, tamplateid);
      dispatch({ type: "TAMPLATETITLE", tampid ,sesid, tamplatetitle: e.target.value });
      e.target.blur();
    }
  };

  return (
    <>
      <div className="tamplate_page">
        <div className="session_title">
          <h2>ADD PAGE</h2>
        </div>
        <div className="tamplate_content">
          {templates.length
            ? templates.map((value) => (
                <div className="tamplate_box" key={value.tamplateid}>
                  <div className="blanck_box">
                    <Link
                      to={`/sessionpage/${sesid}/tamplatepage/${value.tamplateid}/textpage`}
                    >
                      <img src={blanck} alt="blanck" />
                    </Link>
                  </div>
                  <div className="title_box">
                    <input
                      type="text"
                      placeholder={value.tamplatetitle}
                      defaultValue={value.tamplatetitle}
                      onKeyPress={(e) => handleKeyPress(e, sesid, value.tamplateid)}
                    />
                    {/* <span>{value.tamplatetitle}</span> */}
                  </div>
                  <div className="date_box">
                    <span></span>
                  </div>
                  <div
                    className="trash_box"
                    onClick={() => TamplateDelete(sesid, value.tamplateid)}
                  >
                    <button>
                      <img src={trash} alt="trash" />
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="add_tamplate" onClick={TamplateAdd}>
          <button className="add_button">+</button>
          <p>Add Tamplate</p>
        </div>
      </div>
    </>
  );
};

export default TamplatePage;
