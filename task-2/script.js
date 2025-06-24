document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const todoInput = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Render initial todos
  renderTodos();

  // Add event listener for adding new todos
  addButton.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // Function to add a new todo
  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }

  // Function to delete a todo
  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
  }

  // Function to toggle todo completion status
  function toggleTodo(id) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    saveTodos();
    renderTodos();
  }

  // Function to edit a todo
  function editTodo(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    const li = document.querySelector(`[data-id="${id}"]`);
    li.innerHTML = '';

    const editContainer = document.createElement('div');
    editContainer.className = 'edit-mode';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = todoToEdit.text;

    const saveButton = document.createElement('button');
    saveButton.className = 'save-btn';
    saveButton.textContent = 'Save';

    saveButton.addEventListener('click', function () {
      const newText = editInput.value.trim();
      if (newText === '') return;

      todos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      });

      saveTodos();
      renderTodos();
    });

    editInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        saveButton.click();
      }
    });

    editContainer.appendChild(editInput);
    editContainer.appendChild(saveButton);
    li.appendChild(editContainer);

    editInput.focus();
  }

  // Function to save todos to localStorage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Function to render todos
  function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.dataset.id = todo.id;
      if (todo.completed) {
        li.classList.add('completed');
      }

      const todoText = document.createElement('span');
      todoText.className = 'todo-text';
      todoText.textContent = todo.text;
      todoText.addEventListener('click', function () {
        toggleTodo(todo.id);
      });

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'todo-actions';

      const editButton = document.createElement('button');
      editButton.className = 'edit-btn';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
        editTodo(todo.id);
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteTodo(todo.id);
      });

      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);

      li.appendChild(todoText);
      li.appendChild(actionsDiv);
      todoList.appendChild(li);
    });
  }
});
