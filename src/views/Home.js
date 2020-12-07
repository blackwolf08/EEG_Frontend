import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import Button from "reactstrap/lib/Button";
import { chartData } from "variables/charts.js";
import brainGif from "../assets/img/brain.gif";
/*eslint-disable*/
import { WEBSOCKET_URI, WEBSOCKET_URI_LOCAL } from "../constants";

const socket = new WebSocket(WEBSOCKET_URI_LOCAL);

class Home extends React.Component {
  state = {
    data: chartData([]).data,
  };

  connectSocket = async (person = "one") => {
    socket.addEventListener("open", (event) => {
      console.log("Connected to the WS Server!");
      socket.send(person);
    });

    socket.addEventListener("close", (event) => {
      console.log("Disconnected from the WS Server!");
    });
    socket.addEventListener("message", ({ data }) => {
      data = JSON.parse(data);
      let {
        eeg_signal_list,
        extra_data: { is_epilepsy_detected },
        person,
      } = data;
      let scale = person == 1 ? 100 : 800;

      this.setState({
        data: chartData(eeg_signal_list, is_epilepsy_detected, scale).data,
      });
    });
  };

  changePerson = (person) => {
    socket.send(person);
  };

  async componentDidMount() {
    this.connectSocket();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">EEG Signal</CardTitle>
                    </Col>
                    <Col sm="6"></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.state.data}
                      options={chartData().options}
                    />
                  </div>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => {
                          this.changePerson("one");
                        }}
                      >
                        Person 1
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => {
                          this.changePerson("two");
                        }}
                      >
                        Person 2
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Attention level : {Math.floor(Math.random() * 10 + 40)}
                    </Col>
                    <Col>
                      Meditation level : {Math.floor(Math.random() * 10 + 20)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Blink Strength : {Math.floor(Math.random() * 10 + 10)}
                    </Col>
                    <Col>Raw data : {Math.floor(Math.random() * 10 + 70)}</Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>What is EEG?</h2>
              <p></p>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={brainGif} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Col>
                <p
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Electroencephalography (EEG) is an electrophysiological
                  monitoring method to record electrical activity of the brain.
                  It is typically noninvasive, with the electrodes placed along
                  the scalp, although invasive electrodes are sometimes used, as
                  in electrocorticography, sometimes called intracranial EEG.
                </p>
                <p>
                  EEG measures voltage fluctuations resulting from ionic current
                  within the neurons of the brain. Clinically, EEG refers to the
                  recording of the brain's spontaneous electrical activity over
                  a period of time, as recorded from multiple electrodes placed
                  on the scalp. Diagnostic applications generally focus either
                  on event-related potentials or on the spectral content of EEG.
                  The former investigates potential fluctuations time locked to
                  an event, such as 'stimulus onset' or 'button press'. The
                  latter analyses the type of neural oscillations (popularly
                  called "brain waves") that can be observed in EEG signals in
                  the frequency domain.
                </p>
              </Col>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Home;
