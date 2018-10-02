import React, { Component } from 'react';
import { Row, Col, Input, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { headShake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import BooksItem from './BooksItem/BooksItem';
import './Books.css';

const animationStyle = StyleSheet.create({
  shakeAnimation: {
    animationName: headShake,
    animationDuration: '1s'
  }
});

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      author: '',
      imgUrl: '',
      shake: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleUrlChange(e) {
    this.setState({ imgUrl: e.target.value });
  }

  handleAddClick() {
    const { name, author, imgUrl } = this.state;
    if (
      name.length > 0 &&
      author.length > 0 &&
      (imgUrl.length === 0 || /\.jpg|\.png|\.webp|\.gif$/i.test(imgUrl))
    ) {
      this.props.handleSubmit.call(null, 'add', {
        name,
        author,
        imgUrl
      });
      this.setState({
        name: '',
        author: '',
        imgUrl: ''
      });
    } else {
      this.setState({ shake: true }, () => {
        setTimeout(() => this.setState({ shake: false }), 1000);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="text-center">
            <h4>My Books</h4>
          </Col>
        </Row>
        <ListGroup>
          {this.props.data
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(book => (
              <BooksItem
                {...book}
                key={book._id}
                handleDelete={this.props.handleSubmit.bind(null, 'delete', {
                  id: book._id
                })}
              />
            ))}
          <ListGroupItem
            className={
              this.state.shake ? css(animationStyle.shakeAnimation) : ''
            }
          >
            <Input
              placeholder="Name of book..."
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <Input
              placeholder="Author of book..."
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
            <Input
              placeholder="Image Link of book..."
              value={this.state.imgUrl}
              onChange={this.handleUrlChange}
            />
          </ListGroupItem>
          <Button onClick={this.handleAddClick} color="primary">
            Add
          </Button>
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Books;
