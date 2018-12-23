//Reducer
export const TodoReducer = (state = { todoList: [] }, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      // Newly added ToDo
      // const new_todo = action.todo;
      return {
        todoList: [...state.todoList, action.todo]
      };
    }
    case "RESET_TODO": {
      return {
        todoList: []
      };
    }
    case "REMOVE_TODO": {
      console.log(state.todoList);
      let new_todoList = state.todoList.filter(el => el.id !== action.del_id);
      console.log("new_todoList");
      console.log(new_todoList);

      return {
        todoList: new_todoList
      };
    }
    default:
      return state;
  }
};
