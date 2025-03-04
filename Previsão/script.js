let chave = "cebcd482eda57fa9a6714c1c2ba91885";

// Selecionando os elementos do DOM
const cidadeElemento = document.querySelector(".cidade");
const tempElemento = document.querySelector(".temp");
const descricaoElemento = document.querySelector(".descricao");
const iconeElemento = document.querySelector(".icone");

// Função para exibir as informações na tela
function colocarNaTela(dados) {
    console.log(dados);
    cidadeElemento.innerHTML = `Tempo em ${dados.name}`;
    tempElemento.innerHTML = `${Math.floor(dados.main.temp)}°C`;

    let descricao = dados.weather[0].description;
    let icone = dados.weather[0].icon;
    let condicao = "";

    // Ajustando a condição com base no código do ícone
    if (icone.includes("01d") || icone.includes("01n")) {
        condicao = "☀ Ensolarado";
    } else if (icone.includes("02d") || icone.includes("02n")) {
        condicao = "🌤 Parcialmente Nublado";
    } else if (icone.includes("03d") || icone.includes("03n") || icone.includes("04d") || icone.includes("04n")) {
        condicao = "☁ Nublado";
    } else if (icone.includes("09d") || icone.includes("09n") || icone.includes("10d") || icone.includes("10n")) {
        condicao = "🌧 Chuva";
    } else if (icone.includes("11d") || icone.includes("11n")) {
        condicao = "⚡ Trovoada";
    } else if (icone.includes("13d") || icone.includes("13n")) {
        condicao = "❄ Neve";
    } else if (icone.includes("50d") || icone.includes("50n")) {
        condicao = "🌫 Nebuloso";
    }

    descricaoElemento.innerHTML = `${descricao}`;
    iconeElemento.src = `https://openweathermap.org/img/wn/${icone}.png`;
}

// Função assíncrona para buscar os dados da API
async function buscarCidade(cidade) {
    try {
        let resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
        );

        if (!resposta.ok) {
            throw new Error("Cidade não encontrada!");
        }

        let dados = await resposta.json();
        colocarNaTela(dados);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        cidadeElemento.innerHTML = "Cidade não encontrada";
        tempElemento.innerHTML = "";
        descricaoElemento.innerHTML = "";
        iconeElemento.src = "";
    }
}

// Função chamada ao clicar no botão
function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value.trim(); // Remove espaços extras

    if (cidade === "") {
        alert("Por favor, digite o nome de uma cidade!");
        return;
    }

    buscarCidade(cidade);
}

// Permitir que o usuário pressione Enter para buscar a cidade
document.querySelector(".input-cidade").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        cliqueiNoBotao();
    }
});