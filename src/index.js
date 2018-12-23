import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import App from './App';
import { createStore, combineReducers } from "redux";
import { TodoReducer } from "./TodoReducer";
import Todo from "./Todo";

const store = createStore(
  combineReducers({
    todo: TodoReducer
  })
);
function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
