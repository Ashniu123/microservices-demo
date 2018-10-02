import React from 'react';
import { ListGroupItem, Button, ButtonGroup } from 'reactstrap';

const TodoItem = ({ name, completed, ...props }) => (
  <ListGroupItem>
    <div className="todo__name">{name}</div>
    <ButtonGroup className="todo__completed">
      <Button
        onClick={props.handleUpdate}
        color={completed ? 'success' : 'danger'}
      >
        <i className="fas fa-check" />
      </Button>
      <Button onClick={props.handleDelete}>
        <i className="fas fa-times" />
      </Button>
    </ButtonGroup>
  </ListGroupItem>
);

export default TodoItem;
