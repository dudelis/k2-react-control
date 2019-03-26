import React from "react";
import Masonry from "react-masonry-component";
import xml2js from "xml2js";

const fileUrl =
  "/Designer/Runtime/File.ashx?_path=NOPATH&_controltype=image&X-K2-Token=&_filerequestdata=";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: []
    };
  }

  componentDidMount() {
    //1. Find the List Display Control Instance
    var controlName = "imagesContainer"; //give the name of the control you want to find
    var controlPath = `Controllers/Controller/Controls/Control[@Name='${controlName}']`;
    var cd = $xml(__runtimeControllersDefinition);
    var controlXml = $sn(cd, controlPath);
    var controlId = controlXml.getAttribute("ID");
    var controlObj = $("#" + controlId + "_ListDisplayHiddenDropDown");
    const options = $(controlObj).find("option");
    
    let parser = new xml2js.Parser();
    let newArray = [];
    //2. Parse the data in order to extract requestData values.
    for (var i = 0; i < options.length; i++) {
      const xml = $(options[i]).attr("value");
      parser.parseString(xml, (err, result) => {
        if (result) {
          newArray.push({
            name: result.collection.object[0].fields[0].field[0].value[0],
            requestData: result.collection.object[0].fields[0].field[2].value[0]
          });
        }
      });
    }
    //3. Save the requested 
    this.setState({ imageData: newArray });
  }
  render() {
    //1. Build image urls
    const childElements = this.state.imageData.map(function(element) {
      const url = SourceCode.Forms.XSRFHelper.appendAntiXSRFQueryStringParameter(
        fileUrl + element.requestData
      );
        
      return (
        <img
          src={url}
          alt={element.name}
          style={{ margin: "5px", width: "300px" }}
        />
      );
    });
    return (
      //2. Render Masonry Layout
      <Masonry
        elementType={"div"} // default 'div'
        options={{ transitionDuration: 0 }} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >
        {childElements}
      </Masonry>
    );
  }
}
