// document.addEventListener('DOMContentLoaded', function () {
//   //element references
//   const taskList = document.getElementById('task-list');
//   const newTaskInput = document.getElementById('new-task');
//   // const toggleShowHiddenButton = document.getElementById('toggle-show-hidden');

//   // Load tasks from storage and add them to task list
//   function loadTasks() {
//     chrome.storage.local.get(['tasks'], function (data) {
//       const tasks = data.tasks || [];
//       tasks.forEach(task => {
//         const div = createTaskElement(task);
//         taskList.appendChild(div);
//       });
//     });
//   }

//   // Save current tasks to storage
//   function saveTasks(tasks) {
//     chrome.storage.local.set({ tasks });
//   }

//   // Create task element with checkbox, edit icon and hide button with event listeners
//   function createTaskElement(task) {
//     const div = document.createElement('div');
//     div.classList.add('task-item');

//     // Checkbox
//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.addEventListener('change', function () {
//       if (checkbox.checked) {
//         span.style.textDecoration = 'line-through';
//         span.style.opacity = '0.5';
//         div.classList.add('completed');
//       } else {
//         span.style.textDecoration = 'none';
//         span.style.opacity = '1';
//         div.classList.remove('completed');
//       }
//       updateTaskList();
//     });

//     // Task text
//     const span = document.createElement('span');
//     span.textContent = task;
//     span.style.textAlign = 'left';

//     // Double-click to delete
//     div.addEventListener('dblclick', function () {
//       div.remove(); // Remove the task element from the DOM
//       removeTask(task); // Remove the task from storage
//     });

//     // Edit icon
//     const editIcon = document.createElement('i');
//     editIcon.classList.add('fas', 'fa-pencil-alt', 'edit-icon');
//     editIcon.title = 'Edit Task';
//     editIcon.addEventListener('click', function () {
//       const newTask = prompt('Edit task:', task);
//       if (newTask !== null && newTask.trim() !== '') {
//         span.textContent = newTask.trim();
//         updateTask(task, newTask.trim()); // Update the task in storage
//       }
//     });

//     // Hide button
//     const hideButton = document.createElement('button');
//     hideButton.textContent = 'Hide';
//     hideButton.addEventListener('click', function () {
//       div.style.display = 'none'; // Hide the task element
//       removeTask(task); // Remove the task from storage
//     });

//     // Append elements to task div
//     div.appendChild(checkbox);
//     div.appendChild(span);
//     div.appendChild(editIcon);
//     div.appendChild(hideButton);

//     return div;
//   }

//   // Update tasks in storage
//   function updateTaskList() {
//     saveTasks(getTasksFromList());
//   }

//   // Retrieve tasks from DOM
//   function getTasksFromList() {
//     return Array.from(taskList.children).map(div => div.querySelector('span').textContent);
//   }

//   // Remove task from storage
//   function removeTask(task) {
//     chrome.storage.local.get(['tasks'], function (data) {
//       let tasks = data.tasks || [];
//       tasks = tasks.filter(t => t !== task);
//       saveTasks(tasks);
//     });
//   }

//   // Update task in storage
//   function updateTask(oldTask, newTask) {
//     chrome.storage.local.get(['tasks'], function (data) {
//       let tasks = data.tasks || [];
//       const index = tasks.indexOf(oldTask);
//       if (index !== -1) {
//         tasks[index] = newTask;
//         saveTasks(tasks);
//       }
//     });
//   }

//   // Handle new task input when enter is pressed
//   newTaskInput.addEventListener('keypress', function (event) {
//     if (event.key === 'Enter') {
//       const newTask = newTaskInput.value.trim();
//       if (newTask !== '' && newTask !== null) {
//         chrome.storage.local.get(['tasks'], function (data) {
//           const tasks = data.tasks || [];
//           tasks.push(newTask);
//           saveTasks(tasks);
//           const div = createTaskElement(newTask);
//           taskList.appendChild(div);
//         });
//         newTaskInput.value = '';
//       } else {
//         alert('Task cannot be empty!');
//       }
//     }
//   });

//   // // Show hidden tasks button functionality
//   // toggleShowHiddenButton.addEventListener('click', function () {
//   //   const tasks = taskList.querySelectorAll('.task-item');
//   //   tasks.forEach(task => {
//   //     if (task.style.display === 'none') {
//   //       task.style.display = ''; // Show hidden task
//   //     }
//   //   });
//   // });

//   loadTasks(); // Load tasks on page load
  
//   hiddenButton.addEventListener('click', function() {
//     window.location.href = 'hidden.html';
//   });

//   archiveButton.addEventListener('click', function() {
//     window.location.href = 'archive.html';
//   });

//   // Function to move task to hidden page
//   function moveToHidden(task) {
//     chrome.storage.local.get(['hiddenTasks'], function (data) {
//       let hiddenTasks = data.hiddenTasks || [];
//       hiddenTasks.push(task);
//       chrome.storage.local.set({ hiddenTasks });
  
//       // Optionally, remove the task from tasks list
//       // This depends on your specific implementation
//       // You may want to keep the task in tasks list as well
  
//       // Inform user or perform any other action
//       alert(`Task "${task}" moved to hidden tasks.`);
//     });
//   }
// });


document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('task-list');
  const newTaskInput = document.getElementById('new-task');

  // Load tasks from storage and add them to task list
  function loadTasks() {
    chrome.storage.local.get(['tasks'], function (data) {
      (data.tasks || []).forEach(task => taskList.appendChild(createTaskElement(task)));
    });
  }

  // Save current tasks to storage
  function saveTasks(tasks) {
    chrome.storage.local.set({ tasks });
  }

  // Create task element with checkbox, edit icon and hide button with event listeners
  function createTaskElement(task) {
    const div = document.createElement('div');
    div.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
      const isChecked = checkbox.checked;
      span.style.textDecoration = isChecked ? 'line-through' : 'none';
      span.style.opacity = isChecked ? '0.5' : '1';
      div.classList.toggle('completed', isChecked);
      updateTaskList();
    });

    const span = document.createElement('span');
    span.textContent = task;

    div.addEventListener('dblclick', () => {
      div.remove();
      removeTask(task);
    });

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-pencil-alt', 'edit-icon');
    editIcon.title = 'Edit Task';
    editIcon.addEventListener('click', () => {
      const newTask = prompt('Edit task:', task)?.trim();
      if (newTask) {
        span.textContent = newTask;
        updateTask(task, newTask);
      }
    });

    const hideButton = document.createElement('button');
    hideButton.textContent = 'Hide';
    hideButton.addEventListener('click', () => {
      div.style.display = 'none';
      removeTask(task);
    });

    div.append(checkbox, span, editIcon, hideButton);
    return div;
  }

  // Update tasks in storage
  function updateTaskList() {
    saveTasks([...taskList.children].map(div => div.querySelector('span').textContent));
  }

  // Remove task from storage
  function removeTask(task) {
    chrome.storage.local.get(['tasks'], function (data) {
      saveTasks((data.tasks || []).filter(t => t !== task));
    });
  }

  // Update task in storage
  function updateTask(oldTask, newTask) {
    chrome.storage.local.get(['tasks'], function (data) {
      const tasks = data.tasks || [];
      const index = tasks.indexOf(oldTask);
      if (index !== -1) {
        tasks[index] = newTask;
        saveTasks(tasks);
      }
    });
  }

  // Handle new task input when Enter is pressed
  newTaskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const newTask = newTaskInput.value.trim();
      if (newTask) {
        chrome.storage.local.get(['tasks'], function (data) {
          const tasks = data.tasks || [];
          tasks.push(newTask);
          saveTasks(tasks);
          taskList.appendChild(createTaskElement(newTask));
        });
        newTaskInput.value = '';
      } else {
        alert('Task cannot be empty!');
      }
    }
  });

  loadTasks(); // Load tasks on page load

  document.getElementById('hiddenButton').addEventListener('click', () => window.location.href = 'hidden.html');
  document.getElementById('archiveButton').addEventListener('click', () => window.location.href = 'archive.html');


});
