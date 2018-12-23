/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import uuid from "uuid";

const addTodo = todo => {
  let tmp_todo = { ...todo };
  tmp_todo.id = uuid();
  return {
    type: "ADD_TODO",
    todo: tmp_todo
  };
};

const resetTodo = () => {
  return {
    type: "RESET_TODO"
  };
};

const removeTodo = del_id => {
  return {
    type: "REMOVE_TODO",
    del_id: del_id
  };
};

const updateTodo = update_todo => {
  return {
    type: "UPDATE_TODO",
    update_todo
  };
};

class Todo extends React.Component {
  constructor(props) {
    super(props);
    // this.onChangeInput = this.onChangeInput.bind(this);
    this.state = {
      todo: {
        content: "",
        is_completed: "",
        id: "",
        isEditing: false
      },
      editing_todo: {}

      // dummyList: ["aaa", "bbb"]
    };
  }
  clickResetButton = e => {
    // alert("hey");
    this.props.resetTodo();
  };
  clickAddButton = e => {
    // alert("hey");
    this.props.addTodo(this.state.todo);

    //clear the Todo input field
    let tmp_todo = { ...this.state.todo };
    tmp_todo.content = "";
    this.setState({ todo: tmp_todo });
  };
  onChangeInput = e => {
    let tmp_todo = { ...this.state.todo };
    tmp_todo.content = e.target.value;
    // console.log("----");
    // console.log(tmp_todo);
    this.setState({ todo: tmp_todo });
    // this.setState({ todo: e.target.value });
  };
  onDelClick = e => {
    let clicked_index = e.target.parentNode.id;
    let del_id = this.props.todoState.todoList[clicked_index].id;
    // alert(del_id);
    this.props.removeTodo(del_id);
  };

  onEditClick = e => {
    let clicked_index = e.target.parentNode.id;
    let edit_todo = this.props.todoState.todoList[clicked_index];

    //alert(edit_todo.content);
    this.setState({ editing_todo: edit_todo });
    // edit_todo.isEditing = true;
    // this.setState({ todo: edit_todo });
  };

  onEditSaveClick = e => {
    //dispatch update
    let tmp_edit_todo = this.state.editing_todo;

    this.props.updateTodo(tmp_edit_todo);
    this.setState({ editing_todo: {} });
  };

  onEditCancelClick = e => {
    this.setState({ editing_todo: {} });
  };
  onChangeEditInput = e => {
    let tmp_todo = { ...this.state.editing_todo };
    tmp_todo.content = e.target.value;
    // console.log("----");
    // console.log(tmp_todo);
    this.setState({ editing_todo: tmp_todo });
  };
  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <div>
        New Todo
        <div id="form">
          <input
            type="text"
            value={this.state.todo.content}
            onChange={this.onChangeInput}
          />
          <button onClick={this.clickAddButton}>Add</button>
          <button onClick={this.clickResetButton}>Reset</button>
        </div>
        <div id="todo-list">
          <ul>
            {this.props.todoState.todoList.map((todo, index) => {
              if (todo.id === this.state.editing_todo.id) {
                return (
                  <li>
                    <div>
                      <input
                        type="text"
                        value={this.state.editing_todo.content}
                        onChange={this.onChangeEditInput}
                      />
                      <a
                        href="javascript:void(0);"
                        onClick={this.onEditSaveClick}
                      >
                        Save
                      </a>
                      &nbsp;|&nbsp;
                      <a
                        href="javascript:void(0);"
                        onClick={this.onEditCancelClick}
                      >
                        Cancel
                      </a>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={index} id={index}>
                    {todo.content} &emsp;&emsp;&emsp;&emsp;
                    <a href="javascript:void(0);" onClick={this.onEditClick}>
                      edit
                    </a>
                    &nbsp;|&nbsp;
                    <a href="javascript:void(0);" onClick={this.onDelClick}>
                      del
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoState: state.todo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    resetTodo: () => dispatch(resetTodo()),
    removeTodo: del_id => dispatch(removeTodo(del_id)),
    updateTodo: update_todo => dispatch(updateTodo(update_todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
