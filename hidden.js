document.addEventListener('DOMContentLoaded', function() {
    const hiddenTaskList = document.getElementById('hidden-task-list'); // Assuming there is an element with this ID in your HTML
    const back = document.getElementById('back'); // Assuming there is a back button with this ID in your HTML

    // Function to load hidden tasks
    function loadHiddenTasks() {
        hiddenTaskList.innerHTML = '';
        chrome.storage.local.get({ hiddenTasks: [] }, function(result) {
            const hiddenTasks = result.hiddenTasks;
            hiddenTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task';
                taskItem.textContent = task;
                hiddenTaskList.appendChild(taskItem);
            });
        });
    }

    back.addEventListener('click', function() {
        window.location.href = 'popup.html';
    });

    loadHiddenTasks(); // Load hidden tasks on page load
});
