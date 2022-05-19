const data = JSON.parse(localStorage.getItem("data"));
const date = new Date().toString().substring(4, 10);

export const initialState = data || [
  {
    sessionid: 1,
    title: "Session",
    date: date,
    tamplatePage: [
      {
        tamplateid: 1,
        tamplatetitle: "Tamplate1",
        text: "",
      },
    ],
  },
];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SESSIONTITLE": {
      const currentSessionIdx = state.findIndex(
        (s) => +s.sessionid === +action.sesid
      );
      const currentSession = state[currentSessionIdx];

      const newSession = {
        ...currentSession,
        title: action.title,
      };
      state[currentSessionIdx] = newSession;

      const newState = [...state];
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case "TAMPLATETITLE": {
      const currentSessionIdx = state.findIndex(
        (s) => +s.sessionid === +action.sesid
      );
      const currentSession = state[currentSessionIdx];
      const tPage = currentSession.tamplatePage;
      const currentTamplate = tPage.filter(
        (tample) => tample.tamplateid === +action.tampid
      );
      // const count = currentTamplate[0].tamplatetitle;
      console.log((currentTamplate[0].tamplatetitle = action.tamplatetitle));
      const newTemplate = {
        ...currentSession,
        currentTamplate: [
          {
            tamplateid: action.tampid,
            tamplatetitle: action.tamplatetitle,
            text: "",
          },
        ],
      };

      state[currentSessionIdx] = newTemplate;

      const newState = [...state];
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case "SESSIONADD": {
      const count = state.length ? state[state.length - 1].sessionid + 1 : 1;
      const newState = [
        ...state,
        {
          sessionid: count,
          title: `Session ${count}`,
          date: date,
          tamplatePage: [
            {
              tamplateid: 1,
              tamplatetitle: "Tamplate 1",
              text: "",
            },
          ],
        },
      ];
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case "SESSIONDELETE":
      // const {id} = action
      const newState = state.filter((item) => item.sessionid !== action.id);
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    case "TAMPLATEADD": {
      const currentSessionIdx = state.findIndex(
        (s) => +s.sessionid === +action.sesid
      );
      const currentSession = state[currentSessionIdx];
      const tPage = state[currentSessionIdx].tamplatePage;
      const count = tPage.length ? tPage[tPage.length - 1].tamplateid + 1 : 1;
      const newTemplate = {
        ...currentSession,
        tamplatePage: [
          ...tPage,
          {
            tamplateid: count,
            tamplatetitle: `Tamplate ${count + 1}`,
            text: "",
          },
        ],
      };


      const changeState = [...state];
      changeState.splice(currentSessionIdx, 1);
      const newState = [...changeState, newTemplate];

      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case "TAMPLATEDELETE": {
      // Get Current Session Index
      const stateFilter = state.findIndex(
        (s) => +s.sessionid === +action.sesid
      );
      // Get Current Session`s TemplatePage Array By Id
      const currentSessionTemplatePage = state[stateFilter].tamplatePage;
      // Delete Current Session`s Template by Id
      const newTemplatePage = currentSessionTemplatePage.filter(
        (t) => +t.tamplateid !== +action.templateId
      );
      const newSession = {
        ...state[stateFilter],
        tamplatePage: newTemplatePage,
      };
      const changeState = [...state];
      changeState.splice(stateFilter, 1);
      const newState = [...changeState, newSession];
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case "TAMPLATETEXT": {
      // Get Current Session Index
      const currentSessionIdx = state.findIndex(
        (s) => +s.sessionid === +action.sesid
      );
      // Get Current Session
      const currentSession = state[currentSessionIdx];
      // Get Current TamplatePage
      const tPage = currentSession.tamplatePage;
      // Get Current TamplatePage
      const currentTamplate = tPage.filter(
        (tample) => tample.tamplateid === +action.tampid
      );
      //Get TamplatePage tamplatetitle id
      const count = currentTamplate[0].tamplatetitle;
      // Get TamplatePage text KEY And Set Text
      const tampText = (currentTamplate[0].text = action.text);

      const newText = {
        ...currentSession,
        currentTamplate: [
          {
            tamplateid: action.id,
            tamplatetitle: count,
            text: tampText,
          },
        ],
      };
      const changeState = state.filter(
        (item, index) => currentSessionIdx !== index
      );
      changeState.splice(currentSessionIdx, 0, newText);

      const newState = [...changeState];
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
      // const tPage = state[currentSessionIdx].tamplatePage;
      // const currenttTamplate = tPage.filter( (tpage) => tpage.tamplateid === +action.id);
    }
    //console.log(action.text, action.id, action.sessionId);
    //let ppp = state.filter((item) => item.sessionid == +action.sessionId)[0].tamplatePage.filter((ttt) => ttt.tamplateid == +action.id)[0].text.texttitle = action.text
    case "DRAG": {
    localStorage.setItem("data", JSON.stringify(action.state));
    return action.state
  }
    default:
      localStorage.setItem("data", JSON.stringify(state));
      return state;
  }
};

// console.log(id, "6666666666666666666");
// const changeState = [...state]
// const currentSession = changeState.findIndex(s => s.sessionid === id)
// changeState.splice(currentSession, 1)
// console.log(changeState, "555555555555555555");
// return [
//     ...changeState
// ]
