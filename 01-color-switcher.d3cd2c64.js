const t={btnStartRef:document.querySelector("button[data-start]"),btnStopRef:document.querySelector("button[data-stop]"),intervalId:null,start(){this.btnStartRef.disabled=!0,this.btnStopRef.disabled=!1,this.intervalId=setInterval(this.changeBg,1e3)},changeBg(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`},stop(){this.btnStopRef.disabled=!0,this.btnStartRef.disabled=!1,clearInterval(this.intervalId)}};t.btnStartRef.addEventListener("click",t.start.bind(t)),t.btnStopRef.addEventListener("click",t.stop.bind(t));
//# sourceMappingURL=01-color-switcher.d3cd2c64.js.map