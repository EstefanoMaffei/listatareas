// ref HTML

import { Todo, TodoList } from "../class";

import { listatodo } from "../index";

const dvTodoList = document.querySelector(".todo-list"),
  txtInput = document.querySelector(".new-todo"),
  btnBorrar = document.querySelector(".clear-completed"),
  bntFiltar = document.querySelector(".filters"),
  filtrosAnchor = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {
  const htmlTodo = `
  <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
  <div class="view">
    <input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
    <label>${todo.tarea}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template">
  </li> `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  dvTodoList.append(div.firstElementChild);

  return div;
};

// eventos

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const nuevoTodo = new Todo(txtInput.value);
    listatodo.nuevoTodo(nuevoTodo);

    crearTodoHTML(nuevoTodo);
    txtInput.value = "";
  }
});

dvTodoList.addEventListener("click", (event) => {
  const nombreElemento = event.target.localName;

  const todoElemento = event.target.parentElement.parentElement;

  const todoId = todoElemento.getAttribute("data-id");

  if (nombreElemento.includes("input")) {
    listatodo.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    listatodo.eliminarTodo(todoId);
    dvTodoList.removeChild(todoElemento);
  }
});

btnBorrar.addEventListener("click", () => {
  listatodo.borraTodoCompletado();

  for (let i = dvTodoList.children.length - 1; i >= 0; i--) {
    const elemento = dvTodoList.children[i];

    if (elemento.classList.contains("completed")) {
      dvTodoList.removeChild(elemento);
    }
  }
});

bntFiltar.addEventListener("click", (event) => {
  const filtro = event.target.text;
  if (!filtro) {
    return;
  }

  filtrosAnchor.forEach(elem => elem.classList.remove('selected'));
  event.target.classList.add('selected');

  for (const elemento of dvTodoList.children) {
    elemento.classList.remove('hidden');
    const completada = elemento.classList.contains('completed');

    switch(filtro){
      case 'Pendientes':
        if(  completada ){
          elemento.classList.add('hidden');
        }
      break;

      case 'Completados':
        if(!completada){
          elemento.classList.add('hidden');
        }
      break
    }
  }
});
