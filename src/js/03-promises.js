import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const formRef = document.querySelector('.form');
formRef.addEventListener('submit', formHandler);
function formHandler(event) {
  event.preventDefault();
  const formData = new FormData(this);
  let {delay,step,amount}=Object.fromEntries(formData);
  delay=+delay;
  step=+step;
  amount=+amount;
  for(let position=1; position<=amount; position+=1){
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`,
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `Rejected promise ${position} in ${delay}ms`,
        );
      });
    delay+=step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve,reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position,delay})
      } else {
        reject({position,delay})
      }
    }, delay);
  })
}
