import React, { Component } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-responsive/js/dataTables.responsive";
import { Card } from "react-bootstrap";
// yarn add datatables.net
// yarn add datatables.net-dt
// yarn add datatables.net-responsive
// yarn add datatables.net-responsive-dt
import axios from "axios";

export default class componentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: ["m", "l", "m", "k", "kl"],
        data: [],
      },
      data_jalur: [],
    };
  }

  hendlerSatatedata = () => {
    this.setState({
      data: {
        title: this.props.table.title,
        data: this.props.table.data,
      },
    });
  };

  createHeaderTable = () => {
    return (
      <table
        id='example'
        className='display nowrap'
        cellSpacing={0}
        style={{ width: "100%" }}>
        <thead>
          <tr>
            <th />
            {this.state.data.title.map((data, i) => (
              <th key={i}>{data}</th>
            ))}
          </tr>
        </thead>
        {/* <tfoot>
          <tr>
            <th />
            {this.state.data.title.map((data, i) => (
              <th key={i}>{data}</th>
            ))}
          </tr>
        </tfoot> */}
        <tbody>
          {this.state.data_jalur.map((data, i) => (
            <tr key={i}>
              <td />
              <td>{data.nama_jalur}</td>
              <td>{data.alamat}</td>
              <td>{data.nama_kec}</td>
              <td>{data.nama_desa}</td>
              <td>{data.lahir}</td>
              <td>
                <button className='btn btn-primaty btn-sm'>edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/dataJalur").then(async (res) => {
      const persons = await res.data;
      this.setState({ data_jalur: persons });
    });
    $(document).ready(function () {
      var table = $("#example").DataTable({
        responsive: {
          details: {
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                return col.hidden
                  ? '<tr data-dt-row="' +
                      col.rowIndex +
                      '" data-dt-column="' +
                      col.columnIndex +
                      '">' +
                      "<td>" +
                      col.title +
                      ":" +
                      "</td> " +
                      "<td>" +
                      col.data +
                      "</td>" +
                      "</tr>"
                  : "";
              }).join("");
              var extra = "'<tr>'+'<td>21</td> '+'<td>32</td>'+'</tr>'";
              return data ? $("<table/>").append(data).append(extra) : false;
            },
          },
        },
      }); // end of DataTable
    });
  }

  render() {
    return (
      <Card>
        <Card.Body className='ta-left'>{this.createHeaderTable()}</Card.Body>
      </Card>
    );
  }
}
