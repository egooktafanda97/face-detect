const redux = require("redux");
const createStore = redux.createStore;

const initState = {
  nama: "ego",
};

const rootReducer = (state = initState, action) => {
  console.log(action);
  return state;
};

const store = createStore(rootReducer);
// console.log(store.getState());

store.dispatch({
  type: "CLICK",
  data: [
    {
      java: "90",
      php: "90",
      js: "90",
    },
    {
      java: "90",
      php: "90",
      js: "90",
    },
    {
      java: "90",
      php: "90",
      js: "90",
    },
  ],
});

store.dispatch({
    type: "CHANGE",
    data: [
      {
        java: "90",
        php: "90",
        js: "90",
      },
      {
        java: "90",
        php: "90",
        js: "90",
      },
      {
        java: "90",
        php: "90",
        js: "90",
      },
    ],
  });
  