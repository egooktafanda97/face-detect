import React, { Component } from "react";
import $ from "jquery";
import swal from "sweetalert";
import axios from "axios";

export default function Delete(props) {
  const id = props.id;
  const title = props.Title;
  const text = props.Text;
  const text_true = props.msgTrue;
  const text_false = props.msgFalse;
  // console.log(props);
  return swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const data = {
        case: "delete",
        id: id,
      };
      axios
        .post(props.url, data)
        .then(async (res) => {
          const result = await res.data;
          console.log(result);
          if (result.status == "200") {
            swal({
              title: "Berhasil",
              text: props.msgTrue,
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
              text: props.msgFalse,
              icon: "error",
              button: "Ok",
            }).then((btn) => {
              if (btn) {
                window.location.reload();
              }
            });
          }
        });
    }
  });
}

// if (willDelete) {
//     let id = $(this).data("id");
//     $("#loadPage").show();
//     $.ajax({
//       type: "POST",
//       url: base_url + "/deleteItem",
//       data: {
//         id: id,
//         _token: "{{ csrf_token() }}",
//       },
//       dataType: "json",
//       success: function (response) {
//         $("#loadPage").hide();
//         console.log(response);
// if (response.status == "200") {
//   swal({
//     title: "Berhasil",
//     text: "Data tlah dihapus",
//     icon: "success",
//     button: "Ok",
//   }).then((btn) => {
//     if (btn) {
//       location.reload();
//     }
//   });
// } else {
//   swal({
//     title: "Ma'af",
//     text: "Data gagal dihapus",
//     icon: "error",
//     button: "Ok",
//   }).then((btn) => {
//     if (btn) {
//       location.reload();
//     }
//   });
// }
//       },
//     });
//   }
