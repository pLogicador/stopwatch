const pegaMinutes = document.querySelector("#minutes");
const pegaSeconds = document.querySelector("#seconds");
const pegaMilliseconds = document.querySelector("#milliseconds");
const pegaStart = document.querySelector("#start");
const pegaPause = document.querySelector("#pause");
const pegaResume = document.querySelector("#resume");
const pegaReset = document.querySelector("#reset");



let interval;
let countdownValue = 3600; // o valor inicial da contagem regressiva é definida em segundos (3600 = 1 hora)
let isRunning = false;

pegaStart.addEventListener("click", startCountdown);
pegaPause.addEventListener("click", pauseCountdown);
pegaResume.addEventListener("click", resumeCountdown);
pegaReset.addEventListener("click", resetCountdown);

function startCountdown(){
    if (!isRunning && countdownValue > 0){
        isRunning = true;
        interval = setInterval(()=>{
            countdownValue--;
            updateDisplay();

            if (countdownValue <= 0){
                stopCountdown();
            }
        }, 1000); // Executa a cada 1 segundo (1000 milissegundos)
    }
}

function pauseCountdown(){
    if (isRunning){
        clearInterval(interval);
        isRunning = false;
    }
}

function resumeCountdown(){
    if (!isRunning && countdownValue > 0){
        isRunning = true;
        interval = setInterval(()=>{
            countdownValue--;
            updateDisplay();

            if (countdownValue < 0){
                stopCountdown();
            }
        }, 1000);
    }
}




function resetCountdown(){
    clearInterval(interval);
    isRunning = false;
    countdownValue = 3600; // Redefine o valor inicial da contagem regressiva em segundos (1 hora)
    updateDisplay();
}

function updateDisplay(){
    const minutes = Math.floor(countdownValue / 60);
    const seconds = countdownValue % 60;

    pegaMinutes.textContent = formatTime(minutes);
    pegaSeconds.textContent = formatTime(seconds);
}

function formatTime( getstime )
{
    return getstime < 10 ? `0${getstime}` : getstime;
}

updateDisplay();    // Chamada inicial para exibir o valor inicial