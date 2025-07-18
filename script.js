let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval = null;
let laps = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('display');
const lapsDisplay = document.getElementById('laps');

// Event listeners
startBtn.addEventListener('click', handleStartResume);
stopBtn.addEventListener('click', handleStop);
lapBtn.addEventListener('click', handleLapReset);

function updateDisplay() {
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let ms = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    timeDisplay.textContent = `${m}:${s}:${ms}`;
}

function updateLaps() {
    lapsDisplay.innerHTML = laps.map((lap, i) => 
        `<div class="bg-white rounded shadow p-2 mb-2">Lap ${i + 1}: ${lap}</div>`
    ).join('');
}

function handleStartResume() {
    if (!interval) {
        startStopwatch();
        startBtn.textContent = "Stop";
        startBtn.classList.remove("btn-start");
        startBtn.classList.add("btn-stop");
        stopBtn.textContent = "Stop";
        stopBtn.classList.remove("btn-stop");
        stopBtn.classList.add("btn-stop");
        lapBtn.disabled = false;
        lapBtn.textContent = "Lap";
    } else {
        stopStopwatch();
        startBtn.textContent = "Resume";
        startBtn.classList.remove("btn-stop");
        startBtn.classList.add("btn-start");
        stopBtn.textContent = "Resume";
        stopBtn.classList.remove("btn-stop");
        stopBtn.classList.add("btn-start");
        lapBtn.textContent = "Reset";
    }
}

function handleStop() {
    if (interval) {
        stopStopwatch();
        startBtn.textContent = "Resume";
        startBtn.classList.remove("btn-stop");
        startBtn.classList.add("btn-start");
        stopBtn.textContent = "Resume";
        stopBtn.classList.remove("btn-stop");
        stopBtn.classList.add("btn-start");
        lapBtn.textContent = "Reset";
    } else {
        startStopwatch();
        startBtn.textContent = "Stop";
        startBtn.classList.remove("btn-start");
        startBtn.classList.add("btn-stop");
        stopBtn.textContent = "Stop";
        stopBtn.classList.remove("btn-start");
        stopBtn.classList.add("btn-stop");
        lapBtn.disabled = false;
        lapBtn.textContent = "Lap";
    }
}

function handleLapReset() {
    if (interval) {
        laps.push(timeDisplay.textContent);
        updateLaps();
    } else {
        resetStopwatch();
        laps = [];
        updateLaps();
        startBtn.textContent = "Start";
        startBtn.classList.remove("btn-stop");
        startBtn.classList.add("btn-start");
        stopBtn.textContent = "Stop";
        stopBtn.classList.remove("btn-start");
        stopBtn.classList.add("btn-stop");
        lapBtn.textContent = "Lap";
        lapBtn.disabled = true;
    }
}

function startStopwatch() {
    if (interval) return;
    interval = setInterval(() => {
        milliseconds += 1;
        if (milliseconds == 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
}

function stopStopwatch() {
    clearInterval(interval);
    interval = null;
}

function resetStopwatch() {
    stopStopwatch();
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
}

updateDisplay();
lapBtn.disabled = true;