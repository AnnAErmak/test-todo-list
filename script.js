let todos =[]

(function (){
    if (localStorage.getItem('todos') === null) return
    let storageTodos = JSON.parse(localStorage.getItem('todos'))
    todos = storageTodos
    renderTodos(storageTodos)
})()

const newTask = document.querySelector('#taskInput')
const btnAddTask = document.querySelector('#addTask')
const btnDeleteLastTodo = document.querySelector('#deleteLast')
const btnDeleteFirstTodo = document.querySelector('#deleteFirst')
const btnEvenTasks = document.querySelector('#evenTasks')
const btnOddTasks = document.querySelector('#oddTasks')

btnAddTask.addEventListener('click', (e) =>{
    e.preventDefault()
    const task = newTask.value.trim()
    if (task === '') return
    const newTodo = {
        text: task,
        isCompleted: false,
        id: Math.random(),
    }
    todos = [newTodo, ...todos]
    renderTodos(todos)
})

btnDeleteLastTodo.addEventListener('click', (e) =>{
    e.preventDefault()
    deleteLastTodo(todos)
})
btnDeleteFirstTodo.addEventListener('click', (e) =>{
    e.preventDefault()
    deleteFirstTodo(todos)
})
btnEvenTasks.addEventListener('click', (e) =>{
    e.preventDefault()
    const todoList = document.querySelector('#todoList')
    todoList.classList.toggle('even')
})
btnOddTasks.addEventListener('click', (e) =>{
    e.preventDefault()
    const todoList = document.querySelector('#todoList')
    todoList.classList.toggle('odd')
})

function deleteLastTodo(t){
    todos = t.slice(0,-1);
    renderTodos(todos)
}
function deleteFirstTodo(t){
    todos = t.slice(1, t.length);
    renderTodos(todos)
}

function completedTodo(id){
    todos = todos.map(todo => todo.id === +id
        ? {...todo, isCompleted: !todo.isCompleted}
        : {...todo})
    renderTodos(todos)
}
function deleteTodo(id){
    todos = todos.filter((todo) => todo.id !== +id)
    renderTodos(todos)
}

function preparationTodos(todos){
    todos.forEach(el => {
        const ul = document.querySelector('#todoList')

        const div = document.createElement('div')
        const li = document.createElement('li')
        const btnComplete = document.createElement('button')
        const btnDelete = document.createElement('button')
        const imgComplete = document.createElement('img')
        const imgDelete = document.createElement('img')

        div.classList.add('todo-actions')

        imgComplete.setAttribute('src', 'images/Tick_Mark.svg')
        imgDelete.setAttribute('src', 'images/delete.svg')

        if(el.isCompleted) li.classList.add('completed')
        li.classList.add('todo')

        btnComplete.append(imgComplete)
        btnDelete.append(imgDelete)
        btnComplete.setAttribute('data-id', el.id)
        btnComplete.addEventListener('click', (e) =>completedTodo(e.currentTarget.dataset.id))
        btnDelete.setAttribute('data-id', el.id)
        btnDelete.addEventListener('click', (e) =>deleteTodo(e.currentTarget.dataset.id))

        div.append(btnComplete)
        div.append(btnDelete)

        li.innerText = el.text
        li.append(div)

        ul.append(li)

    })
}

function renderTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
    const todoList = document.querySelector('#todoList')
    todoList.innerHTML = ''
    preparationTodos(todos)
}
