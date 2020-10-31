window.onload = function() {askNotificationPermission();}

const pomodoroTime = document.querySelector('#pomodoro-time');
const sBreak = document.querySelector('#sbreak');
const lBreak = document.querySelector('#lbreak');

pomodoroTime.value = "25:00";
sBreak.value = "05:00";
lBreak.value = "30:00";



const pomodoroButton = document.querySelector('.pomodoro-button');
const shortBreakButton = document.querySelector('.short-break-button');
const longBreakButton = document.querySelector('.long-break-button');
const timerContainer = document.querySelector('.timer');
const startButton = document.querySelector('.start-button');
const stopButton = document.querySelector('.stop-button');
const resetButton = document.querySelector('.reset-button');
const settingsButton = document.querySelector('.settings-button');
const header = document.querySelector('header');
const settingsPopup = document.querySelector('.settings-popup');
const saveButton = document.querySelector('.save-button');

let POMODORO;
let SHORT_BREAK;
let LONG_BREAK;
let currentTime;
renderTime();
 

let duration = null;
let minutes = null;
let seconds = null;

var timer = '';
function startTimer(duration) {

     timer = duration, minutes, seconds;
    window.intervalOne = setInterval(function () {

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerContainer.textContent = minutes + ":" + seconds;
/*
        if (--timer <= 0) {
            timer = '00:00';
            notifyMe();
            return;
        }
  */
  
  timer--;
  if (timer < 0) {
  clearInterval(intervalOne);
  notifyMe("Times Up");
  }
    }, 1000);
}

timerContainer.onload = function () {
    let duration = timerContainer.innerText.slice(0, 2) * 60;
    startTimer(duration);
};

startButton.addEventListener('click', function() {
	if (!window.intervalOne)
	startTimer(parseInt(timerContainer.innerText.slice(0, 2) * 60) + parseInt(timerContainer.innerText.slice(3)));
});

stopButton.addEventListener('click', function() {

	clearInterval(intervalOne);
  window.intervalOne = null;
})

resetButton.addEventListener('click', function() {

if(window.intervalOne)
	clearInterval(intervalOne);
  window.intervalOne = null;
	timerContainer.innerText = currentTime;
})

pomodoroButton.addEventListener('click', function() {
    
    	((currentTime === SHORT_BREAK) ? shortBreakButton : longBreakButton).classList.remove('btn-active');
	if(window.intervalOne)
	clearInterval(intervalOne);
	currentTime = POMODORO;
	timerContainer.innerText = currentTime;
	pomodoroButton.classList.add('btn-active');
  
});

shortBreakButton.addEventListener('click', function() {

	((currentTime === POMODORO) ? pomodoroButton : longBreakButton).classList.remove('btn-active');
	if(window.intervalOne)
	clearInterval(intervalOne);
	currentTime = SHORT_BREAK;
	timerContainer.innerText = currentTime;
	shortBreakButton.classList.add('btn-active');
})

longBreakButton.addEventListener('click', function() {

((currentTime === SHORT_BREAK) ? shortBreakButton : pomodoroButton).classList.remove('btn-active');
if(window.intervalOne)
clearInterval(intervalOne);
	currentTime = LONG_BREAK;
	timerContainer.innerText = currentTime;
	longBreakButton.classList.add('btn-active');
})

function notifyMe(message) {


if (Notification.permission === "granted") {

    var notification = new Notification(message);
  }
}

  let settingsClicked = false;
  settingsButton.addEventListener('click', function() {
    
      if (!settingsClicked) {
            

          settingsPopup.classList.remove('settings-popup-hidden');
          settingsPopup.classList.add('settings-popup-flex');
          settingsClicked = true;
      } else { 
          
          settingsPopup.classList.remove('settings-popup-flex');
          settingsPopup.classList.add('settings-popup-hidden');
          settingsClicked = false;
    }
  });
  
  
  saveButton.addEventListener('click', function() {
        
      settingsPopup.classList.remove('settings-popup-flex');
          settingsPopup.classList.add('settings-popup-hidden');
settingsClicked = false;
          renderTime();
  });
  
  function renderTime() {
    POMODORO = pomodoroTime.value;
    SHORT_BREAK = sBreak.value;
    LONG_BREAK = lBreak.value;  
       	((currentTime === SHORT_BREAK) ? shortBreakButton : longBreakButton).classList.remove('btn-active');
	if(window.intervalOne)
	clearInterval(intervalOne);
	currentTime = POMODORO;
	timerContainer.innerText = currentTime;
	pomodoroButton.classList.add('btn-active');
  
};

function askNotificationPermission() {
    
      if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
      }
     else if (Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}
