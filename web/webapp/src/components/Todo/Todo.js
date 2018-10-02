import React, { Component } from 'react';
import { Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { headShake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

import TodoItem from './TodoItem/TodoItem';

import './Todo.css';

const animationStyle = StyleSheet.create({
  shakeAnimation: {
    animationName: headShake,
    animationDuration: '1s'
  }
});

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      shake: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ item: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const { item } = this.state;
      if (item.length > 0) {
        this.props.handleSubmit.call(null, 'add', {
          value: this.state.item
        });
        this.setState({ item: '' });
      } else {
        this.setState({ shake: true }, () => {
          setTimeout(() => {
            this.setState({ shake: false });
          }, 1000);
        });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="text-center">
            <h4>Todo List</h4>
          </Col>
        </Row>
        <ListGroup>
          {this.props.data
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(todo => (
              <TodoItem
                {...todo}
                key={todo._id}
                handleDelete={this.props.handleSubmit.bind(null, 'delete', {
                  id: todo._id
                })}
                handleUpdate={this.props.handleSubmit.bind(null, 'edit', {
                  id: todo._id
                })}
              />
            ))}
          <ListGroupItem>
            <Input
              placeholder="What to do?"
              value={this.state.item}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              className={
                this.state.shake ? css(animationStyle.shakeAnimation) : ''
              }
            />
          </ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Todo;
