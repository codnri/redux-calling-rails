import {fetchTodos} from './GetRequestActions'
import axios from 'axios'

function addNewTodo() {
    return {
      type: 'ADD_NEW_TODO',
    };
  }
  function addNewTodoSuccess() {
    return {
      type: 'ADD_TODO_SUCCESS',
    };
  }
  // メッセージ送信
  export function postTodo(todoBody) {
    let sendBody = {"subject":todoBody.content}
    return dispatch => {
      dispatch(addNewTodo())
      return axios.post('http://localhost:3001/todos',
        {
          todo: {...sendBody}
        },{withCredentials:false}
      ).then((response) => {
          dispatch(fetchTodos())
          dispatch(addNewTodoSuccess())
        }).catch((response) => {
          console.log(response)
        })
    }
  }