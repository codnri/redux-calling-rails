// export const FETCH_TODOS = 'FETCH_TODOS'
// export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
import axios from 'axios'

function requestTodos() {
  return {
    type: 'FETCH_TODOS'
  }
}

function receiveTodos(json) {
  // console.log("receiveTodos")
  console.log("json" )
  console.log(json.map((el)=>( {id:el.id,content:el.subject} ) ))
  let todos = json.map((el)=>( {id:el.id,content:el.subject} ) )
  return {
    type: 'FETCH_TODOS_SUCCESS',
    todos: todos
  }
}

// メッセージ取得

export function fetchTodos() {
  return dispatch => {
    
    dispatch(requestTodos())
    // console.log('ddd')    
    return axios.get('http://localhost:3001/todos').then((response) => { //http://10.0.2.15:3000/
      
      dispatch(receiveTodos(response.data))
        
      }).catch((response) => {
        console.log("error during API calling")
        console.log(response)
      })
  }
}