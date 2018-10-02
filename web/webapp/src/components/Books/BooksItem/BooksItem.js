import React from 'react';
import { Row, Col, Button, ListGroupItem } from 'reactstrap';

const BooksItem = props => (
  <ListGroupItem>
    <Button
      color="danger"
      onClick={props.handleDelete}
      className="books__delete"
    >
      Delete
    </Button>
    <Row>
      <Col xs="3">
        <img
          src={props.imgUrl}
          alt={props.name + ' by ' + props.author}
          className="books__image"
        />
      </Col>
      <Col xs="9">
        <div>
          <b>Name:</b> {props.name}
        </div>
        <div>
          <b>Author:</b> {props.author}
        </div>
      </Col>
    </Row>
  </ListGroupItem>
);

export default BooksItem;
