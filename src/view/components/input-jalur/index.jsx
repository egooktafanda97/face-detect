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
    value: "",
    nama: "",
    alamat: "",
    kec: "",
    desaP: "",
    lahir: "",
    id: "",
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  hendlerSatatedata = () => {
    this.setState({
      id: this.props.changeVlue.id,
      nama: this.props.changeVlue.nama_jalur,
      alamat: this.props.changeVlue.alamat,
      kec: this.props.changeVlue.kecamatan,
      desaP: this.props.changeVlue.desa,
      lahir: this.props.changeVlue.lahir,
    });
    //  console.log(this.state)
    const Qselect = (sel) => {
      return document.querySelector(sel);
    };
    Qselect("#nama_jalur").value = this.state.nama;
    Qselect("#alamat").value = this.state.alamat;
    Qselect("#kecamatan").value = this.state.kec;
    this.getChDesa(this.state.kec);
    $("#btn-sub")
      .text("Edit")
      .removeClass("btn-primary")
      .addClass("btn-success")
      .attr("data-case", "update");
    Qselect("#lahir").value = this.state.lahir;
  };

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.state.id,
      nama_jalur: event.target.elements.nama_jalur.value,
      alamat: event.target.elements.alamat_jalur.value,
      kecamatan: event.target.elements.kecamatan.value,
      desa: event.target.elements.desa.value,
      lahir: event.target.elements.lahir.value,
      case: $("#btn-sub").data("case"),
    };
    // console.log(data);
    this.insData(data);
    // alert("A name was submitted: " + this.state.value);
  }
  componentDidMount = () => {
    axios.get("http://127.0.0.1:8000/api/getKecamtan").then(async (res) => {
      const persons = await res.data;
      this.setState({ kecamatan: persons });
    });
    // console.log(this.props.changeVlue);
  };

  dataKecamatan = () => {
    return this.state.kecamatan.map((person, i) => (
      <>
        {i == 0 && (
          <>
            <option key={person} value=''>
              Pilih Kecamatan
            </option>
          </>
        )}

        <option value={person.id_kec}>{person.nama}</option>
      </>

      // <option key={i} value={person.id_kec}>
      //   {person.nama}
      // </option>
    ));
  };
  dataDesa = () => {
    return this.state.desa.map((desa, i) => (
      <option key={i} value={desa.id_kel}>
        {desa.nama}
      </option>
    ));
  };

  getDesa = (event) => {
    const data = {
      id_kec: event.target.value,
    };
    axios.post("http://127.0.0.1:8000/api/getDesa", data).then((res) => {
      this.setState({ desa: res.data });
    });
  };
  getChDesa = (id) => {
    const data = {
      id_kec: id,
    };
    axios.post("http://127.0.0.1:8000/api/getDesa", data).then((res) => {
      this.setState({ desa: res.data });
      document.querySelector("#desa").value = this.state.desaP;
    });
  };

  insData = (data) => {
    axios.post("http://127.0.0.1:8000/api/insJalur", data).then((res) => {
      // this.setState({ desa: res.data });
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

  reoload = () => {
    window.location.reload();
  };
  render() {
    // console.log(this.getKecamatan());
    // console.log(this.props);
    return (
      <Card>
        <Card.Body className='ta-left'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Nama Jalur</Form.Label>
              <Form.Control
                id='nama_jalur'
                type='text'
                placeholder='input nama jalur'
                name='nama_jalur'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alamat Jalur</Form.Label>
              <Form.Control
                id='alamat'
                type='text'
                placeholder='input alamat'
                name='alamat_jalur'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Kecamtan</Form.Label>
              <Form.Control
                id='kecamatan'
                as='select'
                onChange={this.getDesa.bind(this)}
                name='kecamatan'>
                {this.dataKecamatan()}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Desa</Form.Label>
              <Form.Control as='select' name='desa' id='desa'>
                {this.dataDesa()}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Lahir Jalur</Form.Label>
              <Form.Control
                id='lahir'
                type='date'
                placeholder='input lahir jalur'
                name='lahir'
              />
            </Form.Group>
            <Form.Group className='text-right'>
              {/* <LoadingButton /> */}
              <button
                className='btn btn-warning btn-sm mr-1'
                onClick={this.reoload}>
                Batal
              </button>
              <button
                className='btn btn-primary btn-sm'
                data-case='save'
                id='btn-sub'>
                simpan
              </button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant='primary'
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}>
      {isLoading ? "Loading…" : "Click to load"}
    </Button>
  );
}
