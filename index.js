
const audio = new Audio('sound.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

function applySettings() {
    const theme = localStorage.getItem('theme') || 'default';
    const timeFormat = localStorage.getItem('timeFormat') || '24';

    document.body.style.setProperty('--bg-color', theme === 'dark' ? 'black' : theme === 'light' ? 'white' : 'black');
    document.body.style.setProperty('--text-color', theme === 'light' ? 'black' : 'white');
    document.body.style.setProperty('--gradient-start', theme === 'dark' ? 'rgb(82, 126, 88)' : 'rgb(53, 81, 53)');
    document.body.style.setProperty('--gradient-end', theme === 'dark' ? 'rgb(146, 227, 136)' : 'rgb(53, 81, 53)');
    document.documentElement.style.setProperty('--navbar-color', theme === 'dark' ? 'green' : theme === 'light' ? 'grey' : 'green');
    document.documentElement.style.setProperty('--navbar-text-color', theme === 'light' ? 'black' : 'white');
    document.body.style.setProperty('--clock-text-color', theme === 'light' ? 'black' : 'green'); // Correct clock text color

}


function updateTime() {
    const display = document.getElementById('clock');
    if (!display) return; 

    const date = new Date();
    let hour = date.getHours();
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    const timeFormat = localStorage.getItem('timeFormat') || '24';

    if (timeFormat === '12') {
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        display.innerText = `${formatTime(hour)} : ${minutes} : ${seconds} ${ampm}`;
    } else {
        display.innerText = `${formatTime(hour)} : ${minutes} : ${seconds}`;
    }
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function setAlarmTime(value) {
    alarmTime = value;
}

function setAlarm() {
    if (alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);
        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
}

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm Cleared');
    }
}


function saveSettings() {
    const themeSelect = document.getElementById('theme');
    const timeFormatSelect = document.getElementById('time-format');

    if (themeSelect) {
        const theme = themeSelect.value;
        localStorage.setItem('theme', theme);
    }

    if (timeFormatSelect) {
        const timeFormat = timeFormatSelect.value;
        localStorage.setItem('timeFormat', timeFormat);
    }

    alert('Settings Saved!');
}


function init() {
    applySettings();

    const clockElement = document.getElementById('clock');
    if (clockElement) {
        setInterval(updateTime, 1000); 
    }
}

init();
