// lista de fontes
const listaFontes = ["Orbitron", "Arial", "Verdana", "Open Sans" , "Monoton"];
let indiceFontAtual = 0;

const elementoTimer = document.querySelector(".timer");
const botaoMudarFont = document.querySelector("#changeFont");
const elementoTitulo = document.querySelector(".container h1"); // Adicionado para selecionar o título


// Função para atualizar a fonte com base no índice atual
function atualizarFonte(){

    const fonteSelecionada = listaFontes[indiceFontAtual];
    elementoTimer.style.fontFamily = fonteSelecionada;
    elementoTitulo.style.fontFamily = fonteSelecionada;

    const elementoSeparator = document.querySelector(".separator");
    elementoSeparator.style.fontFamily = fonteSelecionada;

    // Atualize o texto da fonte selecionada
    const elementoFontSelecionada = document.getElementById("fonteAtual");
    elementoFontSelecionada.textContent = fonteSelecionada;
}

// Atualize a fonte inicialmente com base no índice atual
atualizarFonte();


botaoMudarFont.addEventListener("click", function(){
    // avança para a proxima fonte na lista
    indiceFontAtual = ( ++indiceFontAtual ) % listaFontes.length;

    atualizarFonte();
})







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

    // mostrar botões relevantes
    pegaPause.style.display = "block";
    pegaReset.style.display = "block";
    pegaStart.style.display = "block";
}

function pauseCountdown(){
    if (isRunning){
        clearInterval(interval);
        isRunning = false;
    }

    // Mostrar botão "resume" e ocultar botão "pause"
    pegaResume.style.display = "block";
    pegaPause.style.display = "block";
}

function resumeCountdown(){
    if (!isRunning && countdownValue > 0){
        startCountdown();   // Reutiliza a função startCountdown para retomar a contagem
    }
}


function resetCountdown(){
    clearInterval(interval);
    isRunning = false;
    countdownValue = 3600; // Redefine o valor inicial da contagem regressiva em segundos (1 hora)
    updateDisplay();


    // Ocultar os botões "pause", "resume" e "reset" e mostra o botão "play" novamente
    pegaPause.style.display = "none";
    pegaResume.style.display = "none";
    pegaReset.style.display = "none";
    pegaStart.style.display = "block";
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


