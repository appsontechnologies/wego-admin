import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { chat_Array } from "variables/Variables.jsx";
import Timestamp from 'react-timestamp';
import Card from "components/Card/Card.jsx";

class chatData extends Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        chats: []
      };
  }

 
  componentDidMount() {
      fetch("https://wegoserver.herokuapp.com/wegoplay/api/adminauth/getchatinfo")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              chats: result.data
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
    const { error, isLoaded, chats } = this.state;
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
                    title="Chat Details"
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <Table striped hover>
                          <thead>
                            <tr>
                              {
                                chat_Array.map((prop, key) => {
                                return <th className="text-center" key={key}>{prop}</th>;})
                              }
                            </tr>
                          </thead>
                          <tbody> {
                            chats.map(item => (
                            <tr key={item.chat_id}>
                            <td className="text-center"> {item.chat_id}</td>
                            <td className="text-center"> {item.sender}</td>
                            <td className="text-center">{item.receiver}</td>
                            <td className="text-center">{item.message}</td>
                            <td>
                            <div className="text-left">
                              <button type="button" className="fa fa-pencil-square-o" data-toggle="modal" data-target="#exampleModalCenter"> </button>}
                              <i className="fa fa-pencil-square-o" onClick={this.showModal}></i>}
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
export default chatData;
