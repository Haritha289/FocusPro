let tasks = [];
let taskIdCounter = 0;
let focusInterval;
let focusTimeRemaining = 0;
let stats = {
    tasksCompleted: 0,
    focusSessions: 0,
    totalTasks: 0,
    completedTasks: 0,
    focusTime: 0
};

const motivationalMessages = [
    "🌟 Fantastic work! You're unstoppable!",
    "🚀 You're on fire! Keep that momentum going!",
    "💪 Another task conquered! You're amazing!",
    "🎯 Bullseye! You hit your target perfectly!",
    "⭐ Stellar performance! You're a productivity star!",
    "🏆 Champion move! You're winning at life!",
    "🌈 Brilliant! You're painting success with every task!",
    "⚡ Lightning fast! Your efficiency is incredible!",
    "🎨 Masterpiece! Another beautiful achievement!",
    "🔥 You're absolutely crushing your goals!"
];

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('currentTime').textContent = timeString;
}

function addTask() {
    const input = document.getElementById('newTaskInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        const task = {
            id: taskIdCounter++,
            text: taskText,
            completed: false,
            createdAt: new Date()
        };
        
        tasks.push(task);
        stats.totalTasks++;
        renderTasks();
        updateStats();
        input.value = '';
        
        setTimeout(() => {
            showMotivation("🎯 Great! New task added. You're planning for success!");
        }, 500);
    }
}

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
        task.completed = true;
        stats.tasksCompleted++;
        stats.completedTasks++;
        renderTasks();
        updateStats();

        const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        showMotivation(message);
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    updateStats();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="completeTask(${task.id})">✔</button>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;

        taskList.appendChild(li);
    });
}

function updateStats() {
    document.getElementById('totalTasks').textContent = stats.totalTasks;
    document.getElementById('completedTasks').textContent = stats.completedTasks;
    document.getElementById('focusSessions').textContent = stats.focusSessions;
    document.getElementById('focusTime').textContent = stats.focusTime + ' mins';
}

function startFocusSession(minutes) {
    focusTimeRemaining = minutes * 60;
    stats.focusSessions++;
    updateStats();

    focusInterval = setInterval(() => {
        if (focusTimeRemaining > 0) {
            focusTimeRemaining--;
            stats.focusTime = Math.floor((minutes * 60 - focusTimeRemaining) / 60);
            updateFocusDisplay();
        } else {
            clearInterval(focusInterval);
            showMotivation("⏳ Time's up! Amazing focus session!");
        }
    }, 1000);
}

function updateFocusDisplay() {
    const minutes = Math.floor(focusTimeRemaining / 60);
    const seconds = focusTimeRemaining % 60;
    document.getElementById('focusTimer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function showMotivation(message) {
    const motivationBox = document.getElementById('motivationBox');
    motivationBox.textContent = message;
    motivationBox.style.display = 'block';
    setTimeout(() => {
        motivationBox.style.display = 'none';
    }, 3000);
}

// Fullscreen toggle function
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
            .catch(err => {
                console.error(`Error attempting fullscreen: ${err.message} (${err.name})`);
            });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Update clock every second
setInterval(updateTime, 1000);
updateTime();
