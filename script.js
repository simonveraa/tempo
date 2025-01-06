let timers = [
  { element: document.getElementById('timer1'), seconds: 0, interval: null },
  { element: document.getElementById('timer2'), seconds: 0, interval: null },
  { element: document.getElementById('timer3'), seconds: 0, interval: null },
  { element: document.getElementById('timer4'), seconds: 0, interval: null }
];
let currentTimer = 0;

function updateDisplay(timer) {
  const minutes = Math.floor(timer.seconds / 60);
  const seconds = timer.seconds % 60;
  timer.element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setInitialTime() {
  const select = document.getElementById('minuteSelect');
  const selectedMinutes = select.value;
  const totalSeconds = parseInt(selectedMinutes) * 60;

  timers.forEach(timer => {
      timer.seconds = totalSeconds;
      updateDisplay(timer);
  });

  timers.forEach(timer => {
      if (timer.interval) {
          clearInterval(timer.interval);
          timer.interval = null;
      }
  });

  currentTimer = 0;
  enableAllTimers();
}

function startStopTimer(index) {
  if (timers[index].interval) {
      clearInterval(timers[index].interval);
      timers[index].interval = null;
      currentTimer = (index + 1) % timers.length;
      enableTimer(currentTimer);
      startTimer(currentTimer);
  } else {
      disableOtherTimers(index);
      startTimer(index);
  }
}

function startTimer(index) {
  timers[index].interval = setInterval(() => {
      if (timers[index].seconds > 0) {
          timers[index].seconds--;
          updateDisplay(timers[index]);
      } else {
          clearInterval(timers[index].interval);
          timers[index].interval = null;
          currentTimer = (index + 1) % timers.length;
          enableTimer(currentTimer);
          startTimer(currentTimer);
      }
  }, 1000);
}

function disableOtherTimers(activeIndex) {
  timers.forEach((timer, index) => {
      if (index !== activeIndex) {
          timer.element.classList.add('disabled');
      } else {
          timer.element.classList.remove('disabled');
      }
  });
}

function enableTimer(index) {
  timers.forEach((timer, i) => {
      if (i === index) {
          timer.element.classList.remove('disabled');
      } else {
          timer.element.classList.add('disabled');
      }
  });
}

function enableAllTimers() {
  timers.forEach(timer => {
      timer.element.classList.remove('disabled');
  });
}

timers.forEach(timer => updateDisplay(timer));