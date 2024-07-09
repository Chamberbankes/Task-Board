// Retrieve tasks and nextId from localStorage or initialize if empty
let taskList = JSON.parse(localStorage.getItem("tasks"))
let nextId = JSON.parse(localStorage.getItem("nextId"))
  
// Todo: create a function to generate a unique task id
function generateTaskId(){
let id = nextId;
nextId++;
return id;
}

// Todo: create a function to create a task card
function createTaskCard(task){
let card = `<div id="task-${task.id}" class="card task-card mb-3">
<div class="card-body">
<h5 class="card-title">${task.title}</h5>
<p class="card-text">${task.description}</p>
<p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
<button type="button" class="btn btn-warning btn-sm float-end delete-task-btn">Delete</button>
</div>
</div>`;
return card;
}
  
// Todo: create a function to render the task list and make cards draggable
function renderTaskList(){
$("#todo-cards, #in-progress-cards, #done-cards").empty();
taskList.forEach(task => {
let card = createTaskCard(task);
$(`#${task.status}-cards`).append(card);
});
$(".task-card").draggable({
revert: "invalid",
stack: ".task-card",
helper: "clone"
});
}
  
// Todo: create a function to handle adding a new task
function handleAddTask(event){
event.preventDefault();
let formData = new FormData(event.target);
let newTask = {
id: generateTaskId(),
title: formData.get("taskTitle"),
description: formData.get("taskDescription"),
dueDate: formData.get("taskDueDate"),
status: "todo"
};
taskList.push(newTask);
localStorage.setItem("tasks", JSON.stringify(taskList));
localStorage.setItem("nextId", nextId);
$("#formModal").modal("hide");
renderTaskList();
}
  
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});