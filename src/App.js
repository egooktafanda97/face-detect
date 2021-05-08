import logo from "./logo.svg";
import "./App.scss";
// import Main from "./view/pages/dashboard/Dashboard";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Routing from "./router/index";
import Login from './login';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routing />
        {/* <Login/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
