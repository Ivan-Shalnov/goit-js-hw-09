import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import '../css/timer.css';
const countdown = {
  btnRef: document.querySelector('[data-start]'),
  dataDaysRef: document.querySelector('[data-days]'),
  dataHoursRef: document.querySelector('[data-hours]'),
  dataMinutesRef: document.querySelector('[data-minutes]'),
  dataSecondsRef: document.querySelector('[data-seconds]'),
  date: null,
  intervalId:null,
  init(date) {
    if(this.intervalId)return
    if (!this.isFutureDate(date)) {
      Notify.warning('Please choose a date in the future');
      return;
    }
    this.date=date;
    this.enableBtn();
  },
  startCount(){
    this.intervalId = setInterval(this.count.bind(this), 1000);
    this.disableBtn();
  },
  stopCount(){
    clearInterval(this.intervalId)
  },
  count(){
    const delta = this.date.valueOf() - Date.now();
    if(delta<0){
      this.stopCount();
      return;
    }
    const deltaDHMS = convertMs(delta);
    this.render(deltaDHMS);
  },
  render({days,hours,minutes,seconds}){
    this.dataDaysRef.textContent = addLeadingZero(days);
    this.dataHoursRef.textContent = addLeadingZero(hours);
    this.dataMinutesRef.textContent = addLeadingZero(minutes);
    this.dataSecondsRef.textContent = addLeadingZero(seconds);
  },
  enableBtn() {
    this.btnRef.disabled = false;
  },
  disableBtn() {
    this.btnRef.disabled = true;
  },
  isFutureDate(date) {
    const delta = date.valueOf() - Date.now();
    return delta > 0;
  },
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate=selectedDates[0];
    countdown.init(selectedDate)
  },
};
function addLeadingZero(value){
  return value.toString().padStart(2,'0')
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
flatpickr('#datetime-picker', options);
countdown.disableBtn();
countdown.btnRef.addEventListener('click',countdown.startCount.bind(countdown))