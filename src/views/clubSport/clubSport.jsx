import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { club_sports_Array } from "variables/Variables.jsx";
import Timestamp from 'react-timestamp';

class ClubSports extends Component { 
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        clubsports: []
      };
  }

  componentDidMount() {
    fetch("https://wegoserver.herokuapp.com/wegoplay/api/adminauth/clubsportsinfo")
    .then(res => res.json()).then(
      (result) => {
        this.setState({
          isLoaded: true,
          clubsports: result.data
        });
        console.log('API - ', result);
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
        const { error, isLoaded, clubsports} = this.state;
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
                        title="Club Sports Details"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        {
                                        club_sports_Array.map((prop, key) => {
                                        return <th className="text-center" key={key}>{prop}</th>;})
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {clubsports.map(item => (
                                        <tr key={item.club_sports_id}>
                                            <td className="text-center"> {item.club_sports_id}</td>
                                            <td className="text-center">{item.club_sports_name}</td>
                                            <td className="text-center">{item.sports_id}</td>                            
                                            <td className="text-center">{item.club_id}</td>
                                            <td className="text-center">{item.user_id}</td>
                                            <td className="text-center">{item.monthly_fee}</td>
                                            <td className="text-center">{item.sex}</td>
                                            <td className="text-center">{item.changing_room}</td>
                                            <td className="text-center">{item.value_per_hours}</td>
                                            <td>
                                                <div className="text-left">
                                                <i className="fa fa-pencil-square-o"></i>
                                                <i className="fa fa-trash"></i>
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
export default ClubSports;