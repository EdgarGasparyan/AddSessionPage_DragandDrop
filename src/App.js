import {createContext, useReducer} from "react"
import "./App.css";
import SessionPage from "./Pages/SessionPage";
import TamplatePage from "./Pages/TamplatePage";
import { Routes, Route } from "react-router-dom";
import TextPage from "./Pages/TextPage";
import { initialState, reducer } from "./Pages/State";
import DragPage from "./Pages/DragPage";

export const ReducerContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReducerContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path="/" element={<SessionPage />} />
        <Route path="/re" element={<DragPage />} />
        <Route path="/sessionpage/:sesid" element={<TamplatePage />} />
        <Route path="/sessionpage/:sesid/tamplatepage/:tampid/textpage" element={<TextPage/>} />
      </Routes>

    </ReducerContext.Provider>
    
  
    
  );
};

export default App;
