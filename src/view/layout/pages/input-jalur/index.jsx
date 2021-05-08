import React, { useState, useEffect, Component } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Input from "../../../components/input-jalur/index";
// import Tables from "../../../components/input-jalur/table";
import Tables from "../../../components/input-jalur/table";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      changeValue: [],
    };
    this.child = React.createRef();
  }
  hendlerResult = (newVal) => {
    this.setState({
      changeValue: newVal,
    });
    this.child.current.hendlerSatatedata();
  };

  render() {
    // console.log(this.getKecamatan());
    return (
      <main>
        <div className='row'>
          <div className='col-md-6 col-lg-6'>
            <Input ref={this.child} changeVlue={this.state.changeValue} />
          </div>
          <div className='col-md-6 col-lg-6'>
            <Tables
              result={(value) => {
                this.hendlerResult(value);
              }}
            />
          </div>
        </div>
      </main>
    );
  }
}
