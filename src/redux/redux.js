
const initState = {
  data_jalur: [
    {
      nama: "ego",
    },
  ],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DATA_JALUR":
      return {
        ...state,
        data_jalur: action.data,
      };
      break;

    default:
      break;
  }
  console.log(action);
  return state;
};


export default rootReducer;
