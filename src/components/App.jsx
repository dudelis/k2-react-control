import React from "react";
import Masonry from "react-masonry-component";
import xml2js from "xml2js";

const fileUrl =
  "/Designer/Runtime/File.ashx?_path=NOPATH&_controltype=image&X-K2-Token=&_filerequestdata=";

// const xmlArr = [
//   "<collection><object><fields><field name='FileName'><value>Add16.png</value></field><field name='FilePath'><value>NOPATH</value></field><field name='FileRequestData'><value>2kCPXE_qwoz_MKmFk6jZbwrxf958nVudvYxD6yj3KFbtLcVQNGw57orghQCT1XGswqKXBBYZsrnqyO-83movjwhGjbOhi71iPaF6BQkE-7yK4vY6k0feV_snrMiPJtS96jGN1NbwTNmaC2zxE-WppqsIoee-o5Obx-rwRpTNdm0OOE76TzRGhXIDVnuqQw_q39erFhJW-K_gySwfR9iQTfuyW8LBNjQQ5nI3UbuLGskfmSoHki7vDPPoRT-s9xdJduUwrcippTuGAtR_6MmrU46vx6CqxHPChy-i6_Khegc1</value></field></fields></object></collection>",
//   "<collection><object><fields><field name='FileName'><value>AddItem24Default@2x.png</value></field><field name='FilePath'><value>NOPATH</value></field><field name='FileRequestData'><value>zrBGeAbvriheEU-E9eYbvr5ejVDrAqw0sfInNwB1NjebpvFcR91b6tghZtHzSlro2hou6UIrKDz8ciJkQLO3hr5OsR_Mhyi1sx3BZVX40OaYqRZBPYv3FbC8NTdPX09VDboMHTNAHaUrtAYZHFGtebZ2zY2pmr8r0xDnRA-CeqmHxSy0MEGHqmrddUUk5hJiTwfga_J9ZUPET44iX23-Bvf5gpDEC3bGuFBy2q1Y8YiZAhGN0vJ-3eEcfeYCDjvJDmfSSpOZjyVauWswjYCz4EzpLhKW7FM0TQOjsCeC8xg1</value></field></fields></object></collection>"
// ];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: []
    };
  }

  componentDidMount() {
    const options = $('#00000000-0000-0000-0000-000000000000_1573299d-3741-bf0a-20bb-084d0426c9c7_ListDisplayHiddenDropDown').find('option');
    let parser = new xml2js.Parser();
    let newArray = [];
    for (var i = 0; i < options.length; i++) {
      const xml = $(options[i]).attr('value');
      parser.parseString(xml, (err, result) => {
        if (result) {
          console.log(result);
          newArray.push({
            name: result.collection.object[0].fields[0].field[0].value[0],
            requestData: result.collection.object[0].fields[0].field[2].value[0]
          });
        }
      });
    }
    this.setState({ imageData: newArray });
  }
  render() {
    const childElements = this.state.imageData.map(function(element) {
      const url = SourceCode.Forms.XSRFHelper.appendAntiXSRFQueryStringParameter(
        fileUrl + element.requestData
      );

      return <img src={url} alt={element.name} style={{margin:'5px', width : '300px'}}/>;
    });
    return (
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
