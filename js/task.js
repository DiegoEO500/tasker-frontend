//Here we make sure that addTaskButton is a variable for the submit button of the modal
var addTaskButton = document.getElementById("submit-button");

//Here we have our Task POST endpoint
const addTask = async (taskName, taskDesc) => {
    const response = await fetch('http://localhost:3000/add-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskName, description: taskDesc })
    });
    const data = await response.json();
    if (response.ok) getTask();
    return data;
};

//DELETE task
const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' });
        if (response.ok) getTask();
    } catch (err) {
        console.error('Failed to delete task:', err);
    }
};

//PATCH task done status
const updateTaskDone = async (taskId, done) => {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}/done`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done })
        });
        if (!response.ok) console.error('Failed to update task');
    } catch (err) {
        console.error('Failed to update task:', err);
    }
};

//Here we have our Task GET endpoint
const getTask = async () => {
    try {
        const response = await fetch('http://localhost:3000/get-tasks');
        const tasks = await response.json();
        
        const container = document.getElementById("task-container");
        container.innerHTML="";

        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "task-item";
            const checked = task.done ? ' checked' : '';
            taskElement.innerHTML = `
                <div class="task-data">
                    <h2>${task.task}</h2>
                    <p>${task.description}</p>
                </div>
                <div class="task-actions">
                    <input type="checkbox" class="task-checkbox" data-id="${task.id}"${checked}>
                    <button type="button" class="task-delete-btn">Delete</button>
                </div>
            `;
            const checkbox = taskElement.querySelector('.task-checkbox');
            checkbox.addEventListener('change', function() {
                updateTaskDone(task.id, this.checked);
            });
            const deleteBtn = taskElement.querySelector('.task-delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            container.appendChild(taskElement);
        });
    } catch (err) {
        console.error('Failed to fetch tasks:', err);
    }
}; 

//This allows our addTaskButton to trigger the POST endpoint in our backend
addTaskButton.onclick = async function(event){
    event.preventDefault();
    const taskName = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-desc').value;
    await addTask(taskName, taskDesc);
    document.getElementById("add-task-modal").style.display = "none";
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
}


getTask();
