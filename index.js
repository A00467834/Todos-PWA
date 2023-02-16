async function registerServiceWorker() {
    // Register service worker
    if ('serviceWorker' in navigator) { // checking if the browser supports service workers
        window.addEventListener('load', function () { // when app loads, fire callback
            navigator.serviceWorker.register('/sw.js').then(function () { // register sw
                console.log('ServiceWorker registration successful');  // registration was successful
            }, function (err) {
                console.log('ServiceWorker registration failed', err); // registration failed
            });
        });
    }
}

async function main() {
    const form = document.querySelector('form');
    const taskName_input = document.querySelector("[name='taskName']");
    const dueDate_input = document.querySelector("[name='dueDate']");
    const assignedTo_input = document.querySelector("[name='assignedTo']");
    const taskList = document.getElementById('taskList');

    const existingTodos = await getAllTodos()

    const todos = [];

    if (existingTodos) {
        existingTodos.forEach(todo => {
            addToDom(todo.taskName, todo.dueDate, todo.assignedTo);
        });
    }

    function addToDom(taskName, dueDate, assignedTo) {
        const div = document.createElement('div')
        div.classList.add('todoItem')
        const h1 = document.createElement('h1')
        h1.innerHTML = taskName;
        const h2 = document.createElement('h2')
        h2.innerHTML = dueDate;
        const p = document.createElement('p')
        p.innerHTML = assignedTo;

        todos.push({ taskName, dueDate, assignedTo });

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(p)
        taskList.appendChild(div)
    }

    function addTodo(taskName, dueDate, assignedTo) {
        addToDom(taskName, dueDate, assignedTo)
        addTodoToDB(todos.length, taskName, dueDate, assignedTo)
        taskName_input.value = ''
        dueDate_input.value = ''
        assignedTo_input.value = ''
    }

    form.onsubmit = (event) => {
        event.preventDefault();
        addTodo(taskName_input.value, dueDate_input.value, assignedTo_input.value);
    }
}

registerServiceWorker()
main()