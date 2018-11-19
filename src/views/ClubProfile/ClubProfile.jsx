import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { club_Array } from "variables/Variables.jsx";
import Timestamp from 'react-timestamp';
import Card from "components/Card/Card.jsx";

class ClubProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clubs: []
    };
  }

  componentDidMount() {
    fetch("https://wegoserver.herokuapp.com/wegoplay/api/club/getallclub")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            clubs: result.data
          });
          console.log('API - ', result)
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log('Header Response -', error.message)
        }
      )
  }

  render() {
    const { error, isLoaded, clubs } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    
    else {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Club Details"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {
                            club_Array.map((prop, key) => {
                            return <th className="text-center" key={key}>{prop}</th>;})
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {clubs.map(item => (
                          <tr key={item.club_id}>
                            <td className="text-center"> {item.club_id}</td>
                            <td className="text-center">{item.club_name}</td>
                            <td className="text-center">{<img src={item.club_image} />}</td>
                            <td className="text-center">{item.address}</td>                            
                            <td className="text-center">{item.postal_code}</td>
                            <td className="text-center">{item.number}</td>
                            <td className="text-center">{item.club_lat}</td>
                            <td className="text-center">{item.club_long}</td>
                            <td className="text-center">{item.name_holder}</td>
                            <td className="text-center">{item.account_to_receive_payments}</td>
                            <td className="text-center">{item.general_monthly_fee}</td>
                            <td className="text-center">{<Timestamp time={item.createdAt} format='full' />}</td>
                            <td className="text-center">{<Timestamp time={item.updatedAt} format='full' />}</td>
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

export default ClubProfile;
