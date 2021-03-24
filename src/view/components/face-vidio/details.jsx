import css from "./_detail.scss";
import React, { Component } from "react";

export default class detailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: this.props.details,
    };
  }
  hendlerSatatedata = () => {
    this.setState({
      dataList: this.props.details,
    });
  };
  list_ = () => {
    return this.state.dataList.map((post, i) => (
      <li className='list-group-item D-master mt-1 mb-1' key={i}>
        <div className='D-key'>{post.key}</div>
        <div className='D-dot'>:</div>
        <div className='D-val'>{post.val}</div>
      </li>
    ));
  };
  render() {
    return (
      <div>
        <ul className='list-group'>{this.list_()}</ul>
      </div>
    );
  }
}
