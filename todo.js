// Array to store outstanding tasks
var outstandingtasks = [];

// Array to store finished tasks
var finishedtasks = [];

// Variable to track the maximum task ID
var maxtaskid = 0;

// Function to initialize the app
function bootstrap() {
    // Restore the values of variables from cookies when the app starts
    var storedOutstandingTasks = getCookie("outstandingtasks");
    var storedFinishedTasks = getCookie("finishedtasks");

    // Log stored tasks for debugging
    console.log("Stored Outstanding Tasks:", storedOutstandingTasks);
    console.log("Stored Finished Tasks:", storedFinishedTasks);

    // Parse stored tasks or initialize empty arrays
    if (storedOutstandingTasks) {
        outstandingtasks = JSON.parse(storedOutstandingTasks);
    } else {
        outstandingtasks = [];
    }
    
    if (storedFinishedTasks) {
        finishedtasks = JSON.parse(storedFinishedTasks);
    } else {
        finishedtasks = []; 
    }

    // Display tasks on the page
    displayfunction(); 
}

// Function to set a cookie
function setCookie(name, value) {
    document.cookie = name + "=" + JSON.stringify(value) + ";";
}

// Function to get a cookie
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";   
}

// Function to add a new task
function addfunction() {
    // Read task details from the form
    var description = document.getElementById("description").value;
    var priority = document.getElementById("priority").value;
    var deadline = document.getElementById("deadline").value;

    // Validate input fields
    if (description === "" || priority === "" || deadline === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!Number.isInteger(Number(priority)) || Number(priority) <= 0) {
        alert("Please enter a positive integer for priority.");
        return;
    }

    if (outstandingtasks.length >= 10) {
        alert("You already have too many tasks to handle!");
        return;
    }
  
    // Create a new task object
    var newTask = {
        id: ++maxtaskid,
        description: description,
        priority: priority,
        deadline: deadline
    };
    
    // Add the new task to the outstanding tasks array
    outstandingtasks.push(newTask);
    
    // Update the display
    displayfunction();
    
    // Save outstanding tasks to a cookie
    setCookie("outstandingtasks", outstandingtasks);
}

// Function to mark a task as finished
function finishfunction() {
    // Get the task ID from the user input
    var taskID = document.getElementById("taskID").value;
    var taskIndex = outstandingtasks.findIndex(task => task.id === parseInt(taskID));
    
    // If the task is found, move it to finished tasks
    if (taskIndex !== -1) {
        var finishedTask = outstandingtasks.splice(taskIndex, 1)[0];
        finishedtasks.push(finishedTask);
    } else {
        alert("Task not found!");
    }

    // Update the display
    displayfunction();

    // Save both outstanding and finished tasks to cookies
    setCookie("outstandingtasks", outstandingtasks);
    setCookie("finishedtasks", finishedtasks);
}

// Function to display tasks on the page
function displayfunction() {
    // Get the table elements for outstanding and completed tasks
    var displayOutstandingTable = document.getElementById("displayoutstanding");
    var displayCompletedTable = document.getElementById("displaycompleted");
    var outstandingTBody = displayOutstandingTable.querySelector('tbody');
    var completedTBody = displayCompletedTable.querySelector('tbody');

    // Clear existing table rows
    outstandingTBody.innerHTML = "";
    completedTBody.innerHTML = "";

    // Populate the outstanding tasks table
    outstandingtasks.forEach(task => {
        var row = outstandingTBody.insertRow();
        row.insertCell(0).textContent = task.id;
        row.insertCell(1).textContent = task.description;
        row.insertCell(2).textContent = task.priority;
        row.insertCell(3).textContent = task.deadline;
        row.insertCell(4).textContent = "Outstanding";
    });

    // Populate the completed tasks table
    finishedtasks.forEach(task => {
        var row = completedTBody.insertRow();
        row.insertCell(0).textContent = task.id;
        row.insertCell(1).textContent = task.description;
        row.insertCell(2).textContent = task.priority;
        row.insertCell(3).textContent = task.deadline;
        row.insertCell(4).textContent = "Completed";
    });
}

// Function to clear all outstanding tasks
function clearoutstandingtask() {
    outstandingtasks = [];
    setCookie("outstandingtasks", outstandingtasks);
    displayfunction();
}

// Function to clear all finished tasks
function clearfinishedtasks() {
    finishedtasks = [];
    setCookie("finishedtasks", finishedtasks);
    displayfunction();
}
