// lista de fontes
const listaFontes = ["Orbitron", "Handjet", "Verdana", 
                    "Open Sans" , "Monoton", "Rubik Iso", 
                    "Sedgwick Ave Display", "Tilt Prism", "Special Elite", 
                    "Fredericka the Great", "Rubik Moonrocks", "Bungee Shade", 
                    "Eater", "Faster One", "Monofett", 
                    "Nosifer", "Hanalei", "Bungee Spice", 
                    "Rubik Puddles", "Rubik Beastly", "Rubik Glitch", 
                    "Geostar Fill", "Nabla", "Arbutus", 
                    "Fascinate", "Ewert", "Plaster", 
                    "Jacques Francois Shadow", "Foldit", "Kumar One Outline",
                    "Ribeye Marrow", "Flavors" ];
let indiceFontAtual = 0;

const elementoTimer = document.querySelector(".timer");
const botaoMudarFont = document.querySelector("#changeFont");
const elementoTitulo = document.querySelector(".container h1"); // Adicionado para selecionar o título

const botaoEditarTitulo = document.querySelector("#edit");
const elementoCustomTitle = document.querySelector("#customTitle");
const botaoUpdateTitle  = document.querySelector("#updateTitle");

const LIMIT_CARACTERES = 30;

// função para esconder as funcionalidades de edição do título
botaoEditarTitulo.addEventListener("click", function () {
    elementoCustomTitle.style.display = "block";
    botaoUpdateTitle.style.display = "block";
});

// função para esconder tudo ao atualizar navamente
botaoUpdateTitle.addEventListener("click", function () {
    atualizarTitulo();
    elementoCustomTitle.style.display = "none";
    botaoUpdateTitle.style.display = "none";
});


// Função para atualizar o título com o texto inserido pelo usuário
function atualizarTitulo(){
    const novoTitulo = elementoCustomTitle.value;

    if (novoTitulo.length <= LIMIT_CARACTERES) {
        elementoTitulo.textContent = novoTitulo;
    } else {
        alert("Ultrapassou o limite de 30 caracteres.");
    }



}


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

const pegaMinutesInput = document.querySelector("#minutesInput"); // Para entrada personalizada
const pegaStartCountdownButton = document.querySelector("#startCountdown"); // Novo botão de início


let interval;
let countdownValue = 3600; // o valor inicial da contagem regressiva é definida em segundos (3600 = 1 hora)
let isRunning = false;



botaoUpdateTitle.addEventListener("click", atualizarTitulo); // ouvinte para atualizar título

pegaStart.addEventListener("click", startCountdown);
pegaPause.addEventListener("click", pauseCountdown);
pegaResume.addEventListener("click", resumeCountdown);
pegaReset.addEventListener("click", resetCountdown);
pegaStartCountdownButton.addEventListener("click", startCountdownFromInput);


function startCountdownFromInput() {
    const minutesInputValue = parseInt(pegaMinutesInput.value);
    if (!isNaN(minutesInputValue) && minutesInputValue > 0) {
        countdownValue = minutesInputValue * 60; // Converter minutos em segundos
        startCountdown();
    } else {
        alert("Insira um valor válido maior que 0.");
    }
}



function startCountdown(){
    if (!isRunning && countdownValue > 0){
        isRunning = true;

        interval = setInterval(()=>{
            countdownValue--;

            if (countdownValue <= 0){
                stopCountdown();
            } else {
                updateDisplay();
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
    const milliseconds = countdownValue * 10;

    pegaMinutes.textContent = formatTime(minutes);
    pegaSeconds.textContent = formatTime(seconds);
    pegaMilliseconds.textContent = formatMilliseconds(milliseconds);
}

function formatTime( getstime )
{
    return getstime < 10 ? `0${getstime}` : getstime;
}

function formatMilliseconds(milliseconds) {
    const formatteddMilliseconds = milliseconds.toString().slice(-3);

    return formatteddMilliseconds.padStart(3, "0");
}

updateDisplay();    // Chamada inicial para exibir o valor inicial


