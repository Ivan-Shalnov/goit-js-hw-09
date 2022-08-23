const colorSwitcher={
    btnStartRef: document.querySelector('button[data-start]'),
    btnStopRef:document.querySelector('button[data-stop]'),
    intervalId: null,
    start(){
        this.btnStartRef.disabled=true;
        this.btnStopRef.disabled=false;

        this.intervalId = setInterval(this.changeBg,1000);
    },
    changeBg(){
        document.body.style.backgroundColor = getRandomHexColor();
    },
    stop(){
        this.btnStopRef.disabled = true;
        this.btnStartRef.disabled = false;
        clearInterval(this.intervalId);
    }
}
colorSwitcher.btnStartRef.addEventListener('click', colorSwitcher.start.bind(colorSwitcher));
colorSwitcher.btnStopRef.addEventListener('click',colorSwitcher.stop.bind(colorSwitcher));

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}