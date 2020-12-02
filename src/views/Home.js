import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { chartData } from "variables/charts.js";

class Home extends React.Component {
  state = {
    data: chartData([]).data,
  };

  connectSocket = async () => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.addEventListener("open", (event)=>  {
      console.log("Connected to the WS Server!");
    });

    socket.addEventListener("close", (event)=>  {
      console.log("Disconnected from the WS Server!");
    });

    socket.addEventListener("message",  ({data})=> {
      data = JSON.parse(data)
      let {eeg_signal_list} = data
      this.setState({
        data: chartData(eeg_signal_list).data
      })
    });
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Home;
