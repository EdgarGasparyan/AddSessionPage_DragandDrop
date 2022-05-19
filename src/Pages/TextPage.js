import React, { useState, useContext, useEffect } from "react";
import { ReducerContext } from "../App";
import { Link, useParams } from "react-router-dom";

const TextPage = () => {
  const { state, dispatch } = useContext(ReducerContext);
  const [text, setText] = useState("");

  const handletext = (e) => {
	setText(e.target.value);
 };
 const { sesid,tampid } = useParams();
//  const dd = useLocation();
//  const sessionId = dd.pathname.slice(13, 14);


 const handleSaveText = () => {
	dispatch({ type: "TAMPLATETEXT", tampid, sesid, text });
 };
useEffect(() => {
	if(text === ''){
		let stext = state.filter((item) => item.sessionid === +sesid)[0].tamplatePage.filter((ttt) => ttt.tamplateid === +tampid)[0].text
		setText(stext)
	}
},[text])

  return (
    <>
      <div className="textpage">
        <div className="textpage_header">
          <div className="textpage_up">
            <span>You’re editing a new template</span>
          </div>
          <div className="textpage_button">
            
            <button onClick={handleSaveText}><Link to={'/'}>X</Link></button>
          </div>
        </div>
        <div className="textpage_title">
          <span>Untitled</span>
        </div>
        <div className="textpage_text">
          <textarea placeholder="... text" onChange={handletext} value={text}>
            {text}
          </textarea>
        </div>
      </div>
    </>
  );
};

export default TextPage;