import React, { Component } from 'react';
import { Input } from 'reactstrap';

import _ from 'lodash';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.debouncedSearch = _.debounce(this.props.handleSubmit, 1200);
  }

  async handleChange(e) {
    this.setState({ text: e.target.value }, () => {
      this.debouncedSearch(this.state.text);
    });
  }

  render() {
    return (
      <Input
        placeholder="Search..."
        value={this.state.text}
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
