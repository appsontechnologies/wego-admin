import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { thArray } from "variables/Variables.jsx";
import Timestamp from 'react-timestamp';

class SportsProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sports: []
    };
  }

  componentDidMount() {
    let myheaders = {
      "source": "android",
      // "deviceid" : 123
    }

    fetch("https://wegoserver.herokuapp.com/wegoplay/api/sports/getallsports", {
      method: "GET",
      headers: myheaders
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sports: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, sports } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Sports List"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th className="text-center" key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {sports.map(item => (
                          <tr key={item.sports_id}>
                            <td className="text-center"> {item.sports_id}</td>
                            <td className="text-center">{item.sports_name}</td>
                            <td className="text-center">{<img src={item.sports_image} />}</td>
                            <td>
                                <div className="text-left">
                                  <i className="fa fa-pencil-square-o" onClick={this.showModal}></i>
                                  <i className="fa fa-trash" onClick={this.showModal}></i>
                                </div>
                            </td>
                           
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  }
                />
              </Col>

            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default SportsProfile;
