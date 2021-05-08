import React, { Component } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import userImg from "../../../Helpers/dependencies";
import Delete from "../child-components/alert-delets";
export default class table extends Component {
  state = {
    data: [],
  };
  constructor(props) {
    super(props);
  }
  //   construct method
  componentDidMount = () => {
    axios.get("http://127.0.0.1:8000/api/dataAnakPacu").then(async (res) => {
      const data = await res.data;
      this.setState({
        data: data,
      });
    });
  };

  hendlerDeletes = (id) => {
    const prop = {
      id: id,
      Title: "Warning",
      Text: "Yakin akan menghapus data ..?",
      msgTrue: "Data berhasil di hapus",
      msgFalse: "Ma'af hapus gagal, sepertinya ada kesalahan..!",
      url: "http://127.0.0.1:8000/api/instAnakPacu",
    };
    return new Delete(prop);
  };

  // change
  hendlerChange_ = (id) => {
    this.props.hendleidItem(id);
  };
  render() {
    return (
      <Card>
        <Card.Body>
          {/* <ComponentTbale /> */}
          {/* <Tables /> */}
          <div className='responsive'>
            <table id='mainTable' className='table table-sm'>
              <thead className='bg-primary'>
                <tr>
                  <th className='ta-left'>No</th>
                  <th className='ta-left'>Nama</th>
                  <th className='ta-left'>Kecamatan</th>
                  <th className='ta-left'>Desa</th>
                  <th className='ta-left'>Jalur</th>
                  <th className='ta-left'>Sejak</th>
                  <th className='ta-left'>Foto</th>
                  <th className='ta-left'>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((res, i) => (
                  <tr key={i}>
                    <td className='ta-left _f-13-px'>{i + 1}</td>
                    <td className='ta-left _f-13-px'>{res.nama_anak}</td>
                    <td className='ta-left _f-13-px'>{res.nama_kec}</td>
                    <td className='ta-left _f-13-px'>{res.nama_desa}</td>
                    <td className='ta-left _f-13-px'>{res.nama_jalur}</td>
                    <td className='ta-left _f-13-px'>{res.sejak}</td>
                    <td className='ta-left _f-13-px'>
                      <a href={userImg(res.foto)} target='balnk'>
                        <img
                          src={userImg(res.foto)}
                          width='50px'
                          height='50px'
                        />
                      </a>
                    </td>
                    <td className='ta-left _f-13-px'>
                      <button
                        className='btn btn-primary btn-sm _f-10-px mr-1'
                        onClick={() => {
                          this.hendlerChange_(res.id_anak_pacu);
                        }}>
                        Edit
                      </button>
                      <button
                        className='btn btn-danger btn-sm _f-10-px'
                        onClick={() => {
                          this.hendlerDeletes(res.id_anak_pacu);
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
