import React, { useState, useEffect, Component } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import $ from "jquery";
// ///////////////////////////////
import swal from "sweetalert";

export default class index extends Component {
  state = {
    kecamatan: [],
    desa: [],
    data_jalur: [],
    value: "",
    data_val: null,
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleaddstate = async (id) => {
    const propsId = id;
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/dataAnakPacuById",
      {
        id: propsId,
      }
    );

    this.setState({
      data_val: data,
    });
    console.log(data);
    if (data.id_anak_pacu !== undefined) {
      document.querySelector("[name='nama']").value = data.nama_anak;
      document.querySelector("[name='alamat']").value = data.alamat;
      document.querySelector("[name='kecamatan']").value = data.a_kec;
      this.getDesaById(data.a_kec);
      document.querySelector("[name='email']").value = data.email;
      document.querySelector("[name='hp']").value = data.hp;
      document.querySelector("[name='jalur']").value = data.jalur;
      document.querySelector("[name='bergabung']").value = data.sejak;
      $("#btn-saves")
        .text("Edit")
        .removeClass("btn-primary")
        .addClass("btn-success")
        .attr("data-case", "update");
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    if ($("#btn-saves").data("case") == "update") {
      formData.append("id", this.state.data_val.id_anak_pacu);
    }
    formData.append("nama", event.target.elements.nama.value);
    formData.append("alamat", event.target.elements.alamat.value);
    formData.append("kecamatan", event.target.elements.kecamatan.value);
    formData.append("desa", event.target.elements.desa.value);
    formData.append("email", event.target.elements.email.value);
    formData.append("hp", event.target.elements.hp.value);
    formData.append("jalur", event.target.elements.jalur.value);
    formData.append("sejak", event.target.elements.bergabung.value);
    formData.append("foto", event.target.elements.foto.files[0]);
    formData.append("case", $("#btn-saves").data("case"));
    // for (let keyValuePair of formData.entries()) {
    //   console.log(keyValuePair);
    // }
    this.insData(formData);
  }
  addValueForm = () => {
    console.log(this.state.data_val);
  };
  componentDidMount = () => {
    axios.get("http://127.0.0.1:8000/api/getKecamtan").then(async (res) => {
      const persons = await res.data;
      this.setState({ kecamatan: persons });
    });
    axios.get("http://127.0.0.1:8000/api/dataJalur").then(async (res) => {
      const persons = await res.data;
      this.setState({ data_jalur: persons });
    });
  };
  componentDidUpdate = (a, b, c) => {
    // this.handleaddstate();
  };

  dataKecamatan = () => {
    return this.state.kecamatan.map((person, i) => (
      <option key={i} value={person.id_kec}>
        {person.nama}
      </option>
    ));
  };
  dataDesa = () => {
    return this.state.desa.map((desa, i) => (
      <option key={i} value={desa.id_kel}>
        {desa.nama}
      </option>
    ));
  };

  getDesaById = (id) => {
    const data = {
      id_kec: id,
    };
    axios.post("http://127.0.0.1:8000/api/getDesa", data).then((res) => {
      this.setState({ desa: res.data });
      document.querySelector(
        "[name='desa']"
      ).value = this.state.data_val.a_desa;
    });
  };

  getDesa = (event) => {
    const data = {
      id_kec: event.target.value,
    };
    axios.post("http://127.0.0.1:8000/api/getDesa", data).then((res) => {
      this.setState({ desa: res.data });
    });
  };
  getDataJalur = () => {
    return this.state.data_jalur.map((jalur, i) => (
      <>
        {i == 0 && (
          <>
            <option key={jalur} value=''>
              Pilih Jalur
            </option>
          </>
        )}
        <option key={i} value={jalur.id}>
          {jalur.nama_jalur}
        </option>
      </>
    ));
  };

  insData = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/instAnakPacu", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "200") {
          swal({
            title: "Berhasil",
            text: "Data tlah disimpan",
            icon: "success",
            button: "Ok",
          }).then((btn) => {
            if (btn) {
              window.location.reload();
            }
          });
        } else {
          swal({
            title: "Ma'af",
            text: "Data gagal disimpan",
            icon: "error",
            button: "Ok",
          }).then((btn) => {
            if (btn) {
              window.location.reload();
            }
          });
        }
      });
  };
  render() {
    // this.hendladdState(this.props.hendGetData);

    return (
      <Card>
        <Card.Body className='ta-left'>
          <Form onSubmit={this.handleSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <Form.Group>
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='input nama jalur'
                    name='nama'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='input alamat'
                    name='alamat'
                    // value={this.state.data}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Kecamtan</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={this.getDesa.bind(this)}
                    name='kecamatan'>
                    {this.dataKecamatan()}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Desa</Form.Label>
                  <Form.Control as='select' name='desa'>
                    {this.dataDesa()}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='input email'
                    name='email'
                  />
                </Form.Group>
              </div>
              <div className='col-md-6'>
                <Form.Group>
                  <Form.Label>Hp</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='input Nomor Hp'
                    name='hp'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jalur</Form.Label>
                  <Form.Control as='select' name='jalur'>
                    {this.getDataJalur()}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bergabung Sejak</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='tanggal bergabung di jaur'
                    name='bergabung'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bergabung Sejak</Form.Label>
                  <Form.Control
                    type='file'
                    name='foto'
                    onChange={this.hendlerFoto}
                  />
                </Form.Group>
                <Form.Group className='text-right'>
                  {/* <LoadingButton /> */}
                  <button
                    className='btn btn-primary'
                    data-case='save'
                    id='btn-saves'>
                    simpan
                  </button>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
