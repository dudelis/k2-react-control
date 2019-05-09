import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class DemoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: null
    };
  }
  componentDidMount() {
    //1. Make an OData call and get all the images
    const self = this;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/odata/v3/FileTests");
    SourceCode.Forms.XSRFHelper.setAntiXSRFHeader(xhr);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send();
    xhr.onload = function() {
      if (xhr.status != 200) {
        // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else {
        // show the result
        const json = JSON.parse(xhr.response);
        if (json.value) {
          const slides = json.value.map(function(element) {
            return (
              <div key={element.ID}>
                <img src={element["FileProperty@odata.mediaReadLink"]} />
                <p className="legend">{element.Name}</p>
              </div>
            );
          });
          self.setState({ slides });
        }
      }
    };
  }
  render() {
    console.log(this.state.slides);
    return (
      <div style={{width:'80%', margin: 'auto'}}>
        <Carousel transitionTime="500" dynamicHeight={true} emulateTouch={true}>{this.state.slides}</Carousel>
      </div>
    );
  }
}
