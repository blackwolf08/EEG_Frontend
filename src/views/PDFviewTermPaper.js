import React from "react";
import { Col, Row } from "reactstrap";
import { chartData } from "variables/charts.js";
/*eslint-disable*/
import { WEBSOCKET_URI_LOCAL } from "../constants";

class PDFviewTermPaper extends React.Component {
  state = {
    data: chartData([]).data,
  };

  connectSocket = async () => {
    const socket = new WebSocket(WEBSOCKET_URI_LOCAL);

    socket.addEventListener("open", (event) => {
      console.log("Connected to the WS Server!");
    });

    socket.addEventListener("close", (event) => {
      console.log("Disconnected from the WS Server!");
    });

    socket.addEventListener("message", ({ data }) => {
      data = JSON.parse(data);
      let {
        eeg_signal_list,
        extra_data: { is_epilepsy_detected },
      } = data;
      this.setState({
        data: chartData(eeg_signal_list, is_epilepsy_detected).data,
      });
    });
  };

  async componentDidMount() {
    this.connectSocket();
  }
  render() {
    const iframe =
      '<iframe style="width:100%;" height="650"  title="fx." src="https://drive.google.com/file/d/1GZZ_-KcQe_M6SFBwhajXTK0vR6vjO9J3/preview?embed=true" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>';

    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <div
                style={{ height: "100%" }}
                dangerouslySetInnerHTML={{ __html: iframe }}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PDFviewTermPaper;
