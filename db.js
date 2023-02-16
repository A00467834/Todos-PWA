var db = new Dexie("todosDatabase");

db.version(1).stores({
    todosList: `
        id,
        taskName,
        dueDate,
        assignedTo`,
});

function getAllTodos() {
    if (db && db.todosList) {
        return db.todosList.toArray().then((data) => {
            return data
        })
    } else {
        return undefined
    }
}

function addTodoToDB(id, taskName, dueDate, assignedTo) {
    db.todosList.put({ id, taskName, dueDate, assignedTo })
        .then(() => true)
        .catch(err => {
            alert("Ouch... " + err);
        });
}

async function queryByName(taskName) {
    if (taskName === undefined) return 0
    return await db.todosList
        .filter((student) => {
            return student.taskName === taskName
        })
        .toArray()
}
