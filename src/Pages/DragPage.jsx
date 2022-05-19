import React,{useState,useContext} from "react";
import "../App.css";
import { Container, Draggable } from 'react-smooth-dnd';
import {applyDrag, generateItems} from './utils'
import { ReducerContext } from "../App";


const DragPage = () => {
    const { state, dispatch } = useContext(ReducerContext);




// const block= {
//     items:[{id:1, data:'asda'},{id:2, data:'asda'},{id:3, data:'asda'},]
// }

//     const sttate = {
//         items: generateItems(50, (index) => {
//           return {
//             id: index,
//             data: 'Draggable' + index
//           };
//         })
//     };


    const [example, setExample] = useState(state)

    const handlerDrag = (state) => {
        setExample(state)
        dispatch({
            type: "DRAG",
            state
        })
    }


    
// console.log(sttate);
// console.log(block);
  return (
    <>
   <div>
       <h1>Hello</h1>
        <div className="simple-page">
          <Container onDrop={e => handlerDrag(applyDrag(example, e))}>
            {example.map(p => {
              return (
                <Draggable key={p.sessionid}>
                  <div className="draggable-item">
                    {p.title}
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </div>
      </div>
    </>
  );
};

export default DragPage;
