import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          // this.todoItems.push(localStorage.key(i))
        }
      }
    }
    return arr;
  },
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch(),
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    },
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.item);
      state.todoItems.splice(payload, 1); //기존 배열 삭제
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed =
        !state.todoItems[payload.index].completed;
      localStorage.removeItem(state.todoItems.item);
      localStorage.setItem(payload.item, JSON.stringify(payload));
    },
    clearAllItem(state) {
      localStorage.clear();
      state.todoItems = [];
    },
  },
});
