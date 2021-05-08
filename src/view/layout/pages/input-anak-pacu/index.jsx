import React, { Component } from "react";
import ComponnetsImput from "../../../components/input-anak-pacu/index";
import Tales from "../../../components/input-anak-pacu/table";
export default class index extends Component {
  constructor(props){
    super(props)
    this.state={
      idItem : null
    }
    this.child = React.createRef();
  }
  hendleidItem = (newVal) => {
    // console.log(newVal);
    this.setState({
      idItem : newVal
    })
    
    this.child.current.handleaddstate(newVal);
  };
  render() {
    return (
      <main>
        <div className='row'>
          <div className='col-md-12 col-lg-12'>
          {/* ref={this.child} */}
            <ComponnetsImput  ref={this.child}  hendGetData={this.state.idItem} />
          </div>
          <div className='col-md-12 col-lg-12'>
            <Tales hendleidItem={this.hendleidItem} />
          </div>
        </div>
      </main>
    );
  }
}
