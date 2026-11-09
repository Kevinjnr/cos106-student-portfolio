/*
  =========================================================
  planner.js  -  the Academic Planner (only used on planner.html)

  How it works, in simple words:
    - All tasks are kept in an ARRAY called "tasks".
    - Each task is an object like:  { text: "Read chapter 3", done: false }
    - When you add, finish or delete a task, we change the array
      and then call showTasks() to redraw the list on the page.
    - saveTasks() keeps the tasks in the browser so they are still
      there when you refresh the page.

    - Add tasks                        -> addTask()
    - Mark tasks as completed          -> toggleTask() + the round button in showTasks()
    - Delete tasks                     -> deleteTask() + the "Delete" button in showTasks()
    - Interactive task management system -> this whole file
    - Arrays                           -> the "tasks" array, push(), splice(), filter(), forEach()
    - Functions                        -> saveTasks(), showTasks(), updateCount(), addTask(), toggleTask(), deleteTask()
    - Event handling                   -> form "submit" + button "click" events
    - DOM manipulation                 -> createElement(), appendChild(), classList, style.width
    - Dynamic content updates          -> task counter, progress bar and today's date
  =========================================================
*/


// ===================== GET THE HTML ELEMENTS =====================
//  DOM manipulation - grab the parts of planner.html we need to work with
const taskForm = document.getElementById("taskForm");         // the form
const taskInput = document.getElementById("taskInput");       // the text box
const taskList = document.getElementById("taskList");         // the <ul> where tasks go
const taskCount = document.getElementById("taskCount");       // the "You have X tasks" text
const taskError = document.getElementById("taskError");       // the error message
const progressBar = document.getElementById("progressBar");   // the green progress bar
const progressText = document.getElementById("progressText"); // the "40%" text
const todayDate = document.getElementById("todayDate");       // today's date in the dark panel


// ===================== THE TASKS ARRAY =====================
//  Arrays
// Load saved tasks from the browser. If there are none yet, start with an empty array [].
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ===================== SHOW TODAY'S DATE =====================
//  Dynamic content updates
// Writes something like "Wednesday, 21 October" in the summary panel
todayDate.textContent = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long"
});


// ===================== SAVE TASKS =====================
//  Functions
// Saves the tasks array in the browser (localStorage) so it survives a page refresh
function saveTasks() {
  // localStorage can only store text, so we turn the array into text first
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===================== SHOW TASKS ON THE PAGE =====================
//  DOM manipulation + Dynamic content updates
// This function clears the list and builds it again from the tasks array
function showTasks() {
  // Empty the list first so we don't show the same task twice
  taskList.innerHTML = "";

  // If there are no tasks, show a friendly message instead of an empty box
  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "task-empty";
    empty.textContent = "Nothing here yet. Add your first task above.";
    taskList.appendChild(empty);
  }

  // Go through every task in the array, one by one.
  // "task" is the task itself, "index" is its position (0, 1, 2 ...)
  tasks.forEach(function (task, index) {

    //  DOM manipulation - create a new <li> for this task
    const li = document.createElement("li");
    li.className = "task-item";

    // If the task is done, add the "completed" class (CSS puts a line through it)
    if (task.done) {
      li.classList.add("completed");
    }

    // Round "done" button on the left. The CSS shows the ✓ when the task is completed.
    const doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";
    doneBtn.textContent = "✓";
    // aria-label / title = the text screen readers read out, and the tooltip on hover
    doneBtn.setAttribute("aria-label", task.done ? "Mark as not done" : "Mark as done");
    doneBtn.title = task.done ? "Undo" : "Mark as done";

    //  Event handling + Mark tasks as completed - when the round button is clicked, mark this task as completed
    doneBtn.addEventListener("click", function () {
      toggleTask(index);
    });

    // Create a <span> to hold the task text
    const span = document.createElement("span");
    span.textContent = task.text;

    // "Delete" button on the right
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    //  Event handling + Delete tasks - when "Delete" is clicked, remove this task
    deleteBtn.addEventListener("click", function () {
      deleteTask(index);
    });

    // Put everything together:  <li> [✓] <span>text</span> [Delete] </li>
    li.appendChild(doneBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Finally, add the finished <li> to the list on the page
    taskList.appendChild(li);
  });

  // Update the counter text and the progress bar
  updateCount();
}


// ===================== UPDATE THE COUNTER + PROGRESS BAR =====================
//  Dynamic content updates
function updateCount() {
  // Count how many tasks are done using filter()
  const doneCount = tasks.filter(function (task) {
    return task.done;
  }).length;

  // "1 task" but "2 tasks"
  const word = tasks.length === 1 ? "task" : "tasks";

  // DOM MANIPULATION: change the text on the page
  taskCount.textContent =
    "You have " + tasks.length + " " + word + " (" + doneCount + " completed).";

  // Work out the percentage done. If there are no tasks, it's 0%.
  let percent = 0;
  if (tasks.length > 0) {
    percent = Math.round((doneCount / tasks.length) * 100);
  }

  // DOM MANIPULATION: change the width of the green bar and the % text
  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "%";
}


// ===================== ADD A TASK =====================
//  Add tasks
function addTask(text) {
  // push() adds the new task to the END of the array
  tasks.push({ text: text, done: false });
  saveTasks();   // save the change
  showTasks();   // redraw the list
}


// ===================== MARK TASK AS COMPLETED =====================
//  Mark tasks as completed
function toggleTask(index) {
  // Flip true -> false or false -> true
  tasks[index].done = !tasks[index].done;
  saveTasks();
  showTasks();
}


// ===================== DELETE A TASK =====================
//  Delete tasks
function deleteTask(index) {
  // splice(index, 1) removes 1 item from the array at that position
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}


// ===================== WHEN THE FORM IS SUBMITTED =====================
//  Event handling
taskForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing (that's what forms do by default)
  event.preventDefault();

  // Get what the user typed and remove extra spaces at the start/end
  const text = taskInput.value.trim();

  // If the box is empty, show an error and stop here
  if (text === "") {
    taskError.textContent = "Please type a task first.";
    return;
  }

  // Otherwise: clear the error, add the task, and empty the text box
  taskError.textContent = "";
  addTask(text);
  taskInput.value = "";
});


// ===================== START =====================
// Show any saved tasks as soon as the page loads
showTasks();
