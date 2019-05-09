import React from "react";
import { Carousel } from "react-responsive-carousel";


export default class CarouselDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: []
    };
  }
  componentDidMount() {
    // //1. Make an OData call and get all the images
    // let xhr = new XMLHttpRequest();
    // xhr.open("GET", "https://k2.denallix.com/api/odata/v3/FileTests");
    // SourceCode.Forms.XSRFHelper.setAntiXSRFHeader(xhr);
    // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.send();
    // xhr.onload = function() {
    //   if (xhr.status != 200) {
    //     // analyze HTTP status of the response
    //     alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    //   } else {
    //     // show the result
    //     console.log(xhr.response);
    //     this.setState({ imageData: xhr.response.value });
    //   }
    // };
  }
  render() {
    //1. Getting custom elements
    const childImages = this.state.imageData.map(function(element) {
      return (
        <div>
          <img src={element["FileProperty@odata.mediaReadLink"]} />
          <p className="legend">{element.Name}</p>
        </div>
      );
    });
    console.log('This is child images: ' + childImages);

    return (
        <Carousel>
            {childImages}
        </Carousel>
    )
  }
}
