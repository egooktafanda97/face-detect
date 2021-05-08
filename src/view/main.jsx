import React, { Component } from "react";
import { HashRouter, Router, Route, Link, Switch } from "react-router-dom";
import Navigasi from "./layout/nav/Navigasi";
import "./_main.scss";
import FaceImg from "./components/face-img/face";
import FaceVidio from "./components/face-vidio/face";
import Details from "./components/face-vidio/details";
import Card from "react-bootstrap/Card";
import basis from "./db/data";

// ////////
import inp from "./components/input-pacu/index";

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <aside className='wrapper'>
          <Navigasi />
        </aside>
      </div>
    );
  }
}

function Dashboard() {
  return (
    <main>
      <Face />
    </main>
  );
}

//  Component Face-recognition
class Face extends Component {
  constructor() {
    super();
    this.state = {
      list_: [{ key: "0", val: "0" }],
      db: new basis(),
    };
    this.child = React.createRef();
    this.pushData = React.createRef();
    // console.log(.base());
  }
  dataCenter = () => {
    return this.state.db.base();
  };
  resultFace = (data) => {
    console.log(data);
    this.setState({
      list_: [
        { key: "id", val: data.id },
        { key: "nama", val: data.nama },
        { key: "jalur", val: data.jalur },
      ],
    });
    this.child.current.hendlerSatatedata();
  };

  upTODate = () => {
    this.pushData.current.hendlerPuhData();
  };
  render() {
    return (
      <div className='row'>
        <div className='col-md-6 col-lg-5'>
          <div className='c-card'>
            <Details ref={this.child} details={this.state.list_} />
          </div>
        </div>
        <div className='col-md-6 col-lg-7'>
          <Card className='c-card mt-1' style={{ border: "none" }} value='ok'>
            <Card.Body
              style={{
                padding: "0px",
                textAlign: "left",
              }}>
              <button
                className='btn btn-primary btn-sm'
                onClick={() => {
                  this.pushData.current.play();
                }}>
                Play
              </button>
            </Card.Body>
          </Card>
          <FaceVidio
            resultData={this.dataCenter()}
            ref={this.pushData}
            result={(value) => {
              this.resultFace(value);
            }}
          />
        </div>
      </div>
    );
  }
}
