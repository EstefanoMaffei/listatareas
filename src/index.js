import "./styles.css";

import { Todo, TodoList } from "./class";
import { crearTodoHTML } from "./js/componentes.js";

export const listatodo = new TodoList();

const tarea = new Todo();

listatodo.todos.forEach(crearTodoHTML);
