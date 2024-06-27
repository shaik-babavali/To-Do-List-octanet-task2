document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

document.addEventListener('keydown', function(event) {
    const selectedTask = document.querySelector('li.selected');
    const taskList = document.getElementById('taskList');
    let newSelectedTask;

    switch (event.key) {
        case 'ArrowUp':
            if (selectedTask) {
                newSelectedTask = selectedTask.previousElementSibling;
            } else {
                newSelectedTask = taskList.lastElementChild;
            }
            selectTask(newSelectedTask);
            break;
        case 'ArrowDown':
            if (selectedTask) {
                newSelectedTask = selectedTask.nextElementSibling;
            } else {
                newSelectedTask = taskList.firstElementChild;
            }
            selectTask(newSelectedTask);
            break;
        case 'Delete':
            if (selectedTask) {
                taskList.removeChild(selectedTask);
            }
            break;
        case 'Enter':
            if (selectedTask) {
                selectedTask.querySelector('.complete').click();
            }
            break;
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskInput.value;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completed';
        completeButton.classList.add('complete');
        completeButton.addEventListener('click', function() {
            span.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskInput.value = '';
        taskInput.focus(); // Set focus back to the input field
    }
}

function selectTask(task) {
    const selectedTask = document.querySelector('li.selected');
    if (selectedTask) {
        selectedTask.classList.remove('selected');
    }
    if (task) {
        task.classList.add('selected');
    }
}