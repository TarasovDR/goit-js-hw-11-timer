import './styles.css';

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.startTimer();
    this.stopTimer();
    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  startTimer() {
    setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = this.targetDate - currentDate;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    const time = this.getTimeComponents(0);
    updateClockFace(time);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 31, 2021'),
  onTick: updateClockFace,
});

function updateClockFace({
  days = '00',
  hours = '00',
  mins = '00',
  secs = '00',
}) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
