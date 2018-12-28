import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import App from './App';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { TodoReducer } from "./TodoReducer";
import Todo from "./Todo";

const store = createStore(
  combineReducers({
    todo: TodoReducer    
  }),
  applyMiddleware(thunkMiddleware)
);
function App() {
  return (
    <div className="App">
      <h1>Welcome to Simple Todo App</h1>
      <h2>What are you going to do?</h2>
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
