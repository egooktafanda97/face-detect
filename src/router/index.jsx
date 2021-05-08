import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";

/////page ////

import Navigasi from "../view/layout/nav/Navigasi";
import Dashboard from "../view/layout/pages/dashboard/Dashboard";
import InputJalur from "../view/layout/pages/input-jalur/index";
import InputAnakPacu from "../view/layout/pages/input-anak-pacu/index";
export default function index() {
  return (
    <>
      <aside className='wrapper'>
        <Navigasi />
      </aside>
      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
      </Switch>

      <Switch>
        <Route exact path='/input_jalur'>
          <InputJalur />
        </Route>
        <Route path='/input_anak_pacu'>
          <InputAnakPacu />
        </Route>
      </Switch>
    </>
  );
}
