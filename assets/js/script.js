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
const now = dayjs();
const taskDueDate = dayjs(task.dueDate, 'YYYY-MM-DD'); 
    
let cardClass = '';
if (now.isSame(taskDueDate, 'day')) {
cardClass = 'bg-warning text-white';
} else if (now.isAfter(taskDueDate)) {
cardClass = 'bg-danger text-white';
}

let card = $('<div>')
.attr('id', 'task-' + task.id)
.addClass('card task-card mb-3 ' + cardClass)
.append($('<div>').addClass('card-body')
.append($('<h5>').addClass('card-title').text(task.title))
.append($('<p>').addClass('card-text').text(task.description))
.append($('<p>').addClass('card-text').append($('<small>').addClass('text-muted').text('Due: ' + task.dueDate)))
.append($('<button>').addClass('btn btn-warning btn-sm float-end delete-task-btn').text('Delete'))
);
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
let taskId = $(event.target).closest(".task-card").attr("id").split("-")[1];
taskList = taskList.filter(task => task.id !== parseInt(taskId));
localStorage.setItem("tasks", JSON.stringify(taskList));
renderTaskList();
}
$(".container").on("click", ".delete-task-btn", handleDeleteTask);
    
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui){
let taskId = ui.draggable.attr("id").split("-")[1];
let newStatus = $(event.target).closest(".lane").attr("id");
taskList.forEach(task => {
if (task.id === parseInt(taskId)) {
task.status = newStatus;
}
});

localStorage.setItem("tasks", JSON.stringify(taskList));
renderTaskList();
}
    
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function (){   
$("#taskDueDate").datepicker({
format: 'yyyy-mm-dd',
autoclose: true,
todayHighlight: true
});
renderTaskList();
$("#taskForm").submit(handleAddTask);
$(".lane").droppable({
accept: ".task-card",
drop: handleDrop
});
var myModal = new bootstrap.Modal(document.getElementById('formModal'), {
keyboard: false
});
});
