import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import Search from './Search/Search';
import Books from './Books/Books';
import Todo from './Todo/Todo';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: [],
      books: []
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleBooksSubmit = this.handleBooksSubmit.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSearchSubmit('');
  }

  handleBooksSubmit(type, data) {
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:8080/api/v1/books'
        : 'http://localhost:3001/api/v1/books';

    switch (type) {
      case 'add':
        axios
          .post(url, {
            name: data.name,
            author: data.author,
            imgUrl: data.imgUrl
          })
          .then(resp => {
            console.log(resp);
            const newBooksList = [...this.state.books, resp.data.data];
            this.setState({
              books: newBooksList
            });
          })
          .catch(console.error);
        break;
      case 'delete':
        const deleteUrl = url + '/' + data.id;
        axios
          .delete(deleteUrl)
          .then(resp => {
            console.log(resp);
            const newBooksList = this.state.books.filter(
              book => book._id !== data.id
            );
            this.setState({
              books: newBooksList
            });
          })
          .catch(console.error);
        break;
      default:
        console.log('Invalid type');
    }
  }

  handleTodoSubmit(type, data) {
    // const postUrl = window.location.origin + '/api/v1/todo';
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:8080/api/v1/todo'
        : 'http://localhost:3002/api/v1/todo';

    switch (type) {
      case 'add':
        axios
          .post(url, {
            name: data.value
          })
          .then(resp => {
            console.log(resp);
            const newTodoList = [...this.state.todo, resp.data.data];
            this.setState({
              todo: newTodoList
            });
          })
          .catch(console.error);
        break;
      case 'edit':
        const putUrl = url + '/' + data.id;
        axios
          .put(putUrl)
          .then(resp => {
            console.log(resp);
            const newTodoList = this.state.todo.map(item => {
              if (item._id === data.id) {
                item.completed = !item.completed;
              }
              return item;
            });
            this.setState({
              todo: newTodoList
            });
          })
          .catch(console.error);
        break;
      case 'delete':
        const deleteUrl = url + '/' + data.id;
        axios
          .delete(deleteUrl)
          .then(resp => {
            console.log(resp);
            const newTodoList = this.state.todo.filter(
              item => item._id !== data.id
            );
            this.setState({
              todo: newTodoList
            });
          })
          .catch(console.error);
        break;
      default:
        console.log('Invalid type');
    }
  }

  handleSearchSubmit(value) {
    const url =
      process.env.NODE_ENV === 'production'
        ? new URL('http://localhost:8080/api/v1/search')
        : new URL('http://localhost:3000/api/v1/search');

    url.searchParams.append('name', value);

    axios
      .get(url.href)
      .then(resp => {
        console.log(resp);
        const { todo, books } = resp.data;
        this.setState({
          todo,
          books
        });
      })
      .catch(console.error);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Microservices Demo</h1>
          </Col>
        </Row>

        <Row className="search">
          <Col>
            <Search handleSubmit={this.handleSearchSubmit} />
          </Col>
        </Row>

        <Row>
          <Col xs="6" className="books">
            <Books
              data={this.state.books}
              handleSubmit={this.handleBooksSubmit}
            />
          </Col>
          <Col xs="6" className="todo">
            <Todo data={this.state.todo} handleSubmit={this.handleTodoSubmit} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
