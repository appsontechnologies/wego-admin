import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { user_Array } from "variables/Variables.jsx";
import Timestamp from 'react-timestamp';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user_list: []
    };
  }

  componentDidMount() {
    // let myheaders = {
    //   // "source": "android",
    //   // "deviceid" : 123
    // }

    fetch("https://wegoserver.herokuapp.com/wegoplay/api/users/getalluserdetails")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            user_list: result.data
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
    const { error, isLoaded, user_list } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (user_list.length <= 0) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="User List"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {user_Array.map((prop, key) => {
                            return <th className="text-center" key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                    </Table>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
    else {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="User List"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          {user_Array.map((prop, key) => {
                            return <th className="text-center" key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {user_list.map(list => (
                          <tr key={list.user_id}>
                            <td className="text-center"> {list.user_id}</td>
                            <td className="text-center">{list.user_name}</td>
                            <td className="text-center">{list.number}</td>
                            <td className="text-center">{list.email}</td>
                            <td className="text-center">{list.date_of_birth}</td>
                            <td className="text-center">{list.sex}</td>
                            <td className="text-center">{<img src={list.image_url} />}</td>
                            <td className="text-center">{list.city}</td>
                            <td className="text-center">{list.country}</td>
                            <td className="text-center">{list.postal_code}</td>
                            <td className="text-center">{list.credit_card_number}</td>
                            <td className="text-center">{list.name_appears_on_card}</td>
                            <td className="text-center">{<Timestamp time={list.expiration} format='date' />}</td>
                            <td className="text-center">{<Timestamp time={list.updatedAt} format='full' />}</td>
                            <td className="text-center">{<Timestamp time={list.createdAt} format='full' />}</td>
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

export default UserProfile;
