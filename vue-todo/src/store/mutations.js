const addOneItem = (state, todoItem) => {
  const obj = { completed: false, item: todoItem };
  localStorage.setItem(todoItem, JSON.stringify(obj));
  state.todoItems.push(obj);
};

const removeOneItem = (state, payload) => {
  localStorage.removeItem(payload.item);
  state.todoItems.splice(payload, 1); //기존 배열 삭제
};

const toggleOneItem = (state, payload) => {
  state.todoItems[payload.index].completed =
    !state.todoItems[payload.index].completed;
  localStorage.removeItem(state.todoItems.item);
  localStorage.setItem(payload.item, JSON.stringify(payload));
};

const clearAllItem = (state) => {
  localStorage.clear();
  state.todoItems = [];
};

export { addOneItem, removeOneItem, toggleOneItem, clearAllItem };
