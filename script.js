let startTime, updatedTime, difference, interval;
let isRunning = false;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 1000 / 60); // Update every 60th of a second
        isRunning = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);

    const minutes = ('0' + time.getMinutes()).slice(-2);
    const seconds = ('0' + time.getSeconds()).slice(-2);
    const milliseconds = ('0' + Math.floor(time.getMilliseconds() / 10)).slice(-2);

    timeDisplay.innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function pauseStopwatch() {
    clearInterval(interval);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(interval);
    difference = 0;
    isRunning = false;
    timeDisplay.innerText = '00:00:00';
    lapsList.innerHTML = '';
    laps = [];
}

function recordLap() {
    if (isRunning) {
        const lapTime = timeDisplay.innerText;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${laps.length}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
