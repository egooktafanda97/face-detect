import React from "react";
import css from "./_css.scss";
import $ from "jquery";
// import '@tensorflow/tfjs-node';
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
import ego from "../assets/img/ego.jpg";
import Vego from "../assets/video/mp_1.mp4";
import Vegi from "../assets/video/egi.mp4";
import ReactDom from "react-dom";
import Card from "react-bootstrap/Card";
var times = null;
export default class FaceVidio extends React.Component {
  constructor(props) {
    let IdisplaySize;
    super(props);
    this.state = {
      dataCenter: this.props.resultData,
      vd: null,
    };
  }
  hendlerDataUp = (newData) => {
    this.state.dataCenter.forEach((rowData, i) => {
      if (rowData.img == newData) {
        newData = rowData;
      }
    });
    this.props.result(newData);
  };

  hendlerPuhData = () => {
    this.setState({
      dataCenter: this.props.resultData,
    });
  };

  detect = async (video, displaySize, eV) => {
    const MODEL_URL = "models";
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    let canvas = $("#canvas").get(0);
    let ii = 1;
    times = setInterval(async () => {
      console.log(ii++);
      let fullFaceDescriptions = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();
      let canvas = $("#canvas").get(0);
      faceapi.matchDimensions(canvas, displaySize);

      const fullFaceDescription = faceapi.resizeResults(
        fullFaceDescriptions,
        displaySize
      );
      // faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
      console.log(this.state.dataCenter);
      let ar = [];
      this.state.dataCenter.map((aws, i) => {
        // console.log(aws);
        ar.push(aws.img);
      });
      // console.log(ar);
      const labels = ar;

      const labeledFaceDescriptors = await Promise.all(
        labels.map(async (label) => {
          // fetch image data from urls and convert blob to HTMLImage element
          const imgUrl = `/assets/img/${label}.JPG`;
          const img = await faceapi.fetchImage(imgUrl);
          // console.log(imgUrl);

          // detect the face with the highest score in the image and compute it's landmarks and face descriptor
          const fullFaceDescription = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!fullFaceDescription) {
            throw new Error(`no faces detected for ${label}`);
          }
          const faceDescriptors = [fullFaceDescription.descriptor];
          return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
        })
      );

      const maxDescriptorDistance = 0.5;
      const faceMatcher = new faceapi.FaceMatcher(
        labeledFaceDescriptors,
        maxDescriptorDistance
      );

      const results = fullFaceDescriptions.map((fd) =>
        faceMatcher.findBestMatch(fd.descriptor)
      );

      results.forEach((bestMatch, i) => {
        const box = fullFaceDescriptions[i].detection.box;
        const text = bestMatch.toString();
        const drawBox = new faceapi.draw.DrawBox(box, { label: text });
        if (bestMatch._label != "unknown") {
          this.hendlerDataUp(bestMatch._label);
          clearTimeout(times);
          eV.pause();
        }
        // drawBox.draw(canvas);
      });
    }, 300);
  };

  face = async (e) => {
    this.state.vd = e.target;
    let displaySize = {
      width: e.target.scrollWidth,
      height: e.target.scrollHeight,
    };
    let video = e.target;
    if (video.paused === false) {
      this.detect(video, displaySize, e);
    }
  };

  play = () => {
    console.log("tes")
    let el = this.state.vd;
    const e = $("#videoElement").get(0);
    let displaySize = {
      width: el.scrollWidth,
      height: el.scrollHeight,
    };
    if (e.paused === false) {
      clearTimeout(times);
      e.pause();
    } else {
      this.detect(el, displaySize, e);
      e.play();
    }
    return false;
  };
  cek = () => "data";
  render() {
    return (
      <div>
        <Card className='c-card mt-1' style={{ border: "none" }} value='ok'>
          <Card.Body>
            <video
              width='100%'
              height='auto'
              loop
              // autoplay='true'
              muted
              controls
              id='videoElement'
              onLoadedMetadata={this.face.bind()}
              src={Vego}></video>
            <canvas id='canvas' className='overlay' style={{ left: "0" }} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
