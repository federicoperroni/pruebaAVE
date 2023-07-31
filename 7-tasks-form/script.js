const taskForm = document.getElementById("taskForm");
const taskTableBody = document.getElementById("taskTableBody");

const tasks = [];
let editingIndex = -1; // Índice de la tarea que está siendo editada (-1 si no hay ninguna)

taskForm.addEventListener("submit", addTask);

function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskDescription = document.getElementById("taskDescription").value;

    const newTask = {
        name: taskName,
        date: taskDate,
        priority: taskPriority,
        description: taskDescription
    };

    if (editingIndex !== -1) {
        // Si hay una tarea en edición, reemplazamos su información en la lista
        tasks[editingIndex] = newTask;
        editingIndex = -1; // Reiniciamos el índice de edición
    } else {
        // Si no hay tarea en edición, agregamos la nueva tarea a la lista
        tasks.push(newTask);
    }

    renderTable();

    clearForm();
}

function renderTable() {
    taskTableBody.innerHTML = "";

    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    tasks.forEach((task, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td>${task.priority}</td>
      <td>${task.description}</td>
      <td>
        <button class="edit" onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
        <button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;

        taskTableBody.appendChild(newRow);
    });
}

function clearForm() {
    taskForm.reset();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskDescription").value = task.description;

    editingIndex = index; // Establecemos el índice de la tarea en edición
}

function deleteTask(index) {
    tasks.splice(index, 1);

    renderTable();
}
