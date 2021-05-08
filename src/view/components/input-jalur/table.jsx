import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Card } from "react-bootstrap";
import axios from "axios";
import "./_css.scss";
import { connect } from "react-redux";
import ComponentTbale from "./tesTable";
import Tables from "./tables";

import $ from "jquery";
// ///////////////////////////////
import swal from "sweetalert";
import Delete from "../child-components/alert-delets";

class table extends Component {
  state = {
    data_jalur: [],
    kecamatan: [],
    table: [],
  };
  constructor() {
    super();
    this.child = React.createRef();
  }

  hendlerChange_ = (id) => {
    const idData = {
      id: id,
    };
    axios
      .post("http://127.0.0.1:8000/api/getdataJalurByID", idData)
      .then(async (res) => {
        const data = await res.data;
        this.props.result(data);
      });
  };
  hendlerDeletes = (id) => {
    const prop = {
      id: id,
      Title: "Warning",
      Text: "Yakin akan menghapus data ..?",
      msgTrue: "Data berhasil di hapus",
      msgFalse: "Ma'af hapus gagal, sepertinya ada kesalahan..!",
      url: "http://127.0.0.1:8000/api/insJalur",
    };
    return new Delete(prop);
  };
  componentDidMount = () => {
    axios.get("http://127.0.0.1:8000/api/dataJalur").then(async (res) => {
      const persons = await res.data;
      this.setState({ data_jalur: persons });
      // console.log(this.props);
      this.props.UpAxios(persons);
    });
  };
  render() {
    // console.log(this.props.data);
    return (
      <Card>
        <Card.Body>
          {/* <ComponentTbale /> */}
          {/* <Tables /> */}
          <div className='responsive'>
            <table id='mainTable' className='table table-sm'>
              <thead className='bg-primary'>
                <tr>
                  <th className='ta-left'>Nama Jalur</th>
                  <th className='ta-left'>Kecamatan</th>
                  <th className='ta-left'>Desa</th>
                  <th className='ta-left'>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data_jalur.map((res, i) => (
                  <tr key={i}>
                    <td className='ta-left _f-13-px'>{res.nama_jalur}</td>
                    <td className='ta-left _f-13-px'>{res.nama_kec}</td>
                    <td className='ta-left _f-13-px'>{res.nama_desa}</td>
                    <td className='ta-left _f-13-px'>
                      <button
                        className='btn btn-primary btn-sm _f-10-px mr-1'
                        onClick={() => {
                          this.hendlerChange_(res.id);
                        }}>
                        Edit
                      </button>
                      <button
                        className='btn btn-danger btn-sm _f-10-px'
                        onClick={() => {
                          this.hendlerDeletes(res.id);
                        }}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

const mapRedux = (store) => {
  return {
    data: store.data_jalur,
  };
};
const hadData = (dispatch) => {
  return {
    UpAxios: (data) =>
      dispatch({
        type: "DATA_JALUR",
        data: data,
      }),
  };
};
export default connect(mapRedux, hadData)(table);
