import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/redux";

const storeRedux = createStore(rootReducer);


// //////////////////////////////////////////////////////////////////
// const cripto = require("aes-js");
// var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// // Convert text to bytes
// var text = "Ego oktafanda";
// var textBytes = cripto.utils.utf8.toBytes(text);
// var aesCtr = new cripto.ModeOfOperation.ctr(key, new cripto.Counter(5));
// var encryptedBytes = aesCtr.encrypt(textBytes);
// var encryptedHex = cripto.utils.hex.fromBytes(encryptedBytes);
// console.log(encryptedHex);
// /////////////////////////////////
// decode encryptedHex-> encode
// var encryptedBytes = cripto.utils.hex.toBytes(encryptedHex);
// var aesCtr = new cripto.ModeOfOperation.ctr(key, new cripto.Counter(5));
// var decryptedBytes = aesCtr.decrypt(encryptedBytes);
// var decryptedText = cripto.utils.utf8.fromBytes(decryptedBytes);
// console.log(decryptedText);
// ////////////////////////////////////////////////////////////////////

// console.log(process.env.REACT_APP_BASE_URL);







console.log(storeRedux.getState());

ReactDOM.render(
  <Provider store={storeRedux}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
