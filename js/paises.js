// Criar variavel para empacotar todos os paises
let todosOsPaises = [];

// Função para empacotar todos os paises
function carregarPaises() {
    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all'
    }).done(function (dados) {
        todosOsPaises = dados; // armazenados todos os paises
        exibirPaises(todosOsPaises); // Usa a funcao exibir 
    });
}

// Função para exibir os países
function exibirPaises(paises) {
    $('.lista_paises').html(''); // limpa toda a lista 
    for (let i = 0; i < paises.length; i++) { // enquanto i for menor que o numero de paises recebidos por parametro
        $('.lista_paises').append(criarCard(paises[i])); // Adiciona o país à lista
    }
}

// Funcao usa o .ready do Jquery para carregar os paises assim que o documento for carregado
$(document).ready(function () {
    carregarPaises();
});


// Quando click no botao pesquisar
$('#btn').on('click', function () {
    var valorpesquisa = $('#titulo').val().toLowerCase(); // Obtém o valor da pesquisa em listras minusculas

    // Filtra os países com base na pesquisa
    var paisesFiltrados = [];
    for (var i = 0; i < todosOsPaises.length; i++) { // percorre desde a posicao 0 até o tamanho dos paises
            var pais = todosOsPaises[i]; 
        if (pais.name.common.toLowerCase().includes(valorpesquisa)) { // se o nome incluir o valor pesquisador pelo usuario
             paisesFiltrados.push(pais); // pais filtrados recebe o pais
        }
}

    // Exibe os países filtrados
    exibirPaises(paisesFiltrados); // usa a função exibir com o parametro de paises filtrados

    // Se não houver países correspondentes, exibe uma mensagem
    if (paisesFiltrados.length === 0) { 
        $('.lista_paises').append(pesquisainvalida(valorpesquisa));
    }
});

// Função para criar o card de um país
function criarCard(pais) {
    var capital = pais.capital ? pais.capital[0] : "N/A"; // Verifica se a capital existe se não retorna N/A
    var regiao = pais.region || "N/A";   // Guarda o continente ou se ele não existe guarda N/A
    var moeda = pais.currencies ? Object.keys(pais.currencies)[0] : "N/A"; // Verifica se currencies existe caso contrario Guarda N/A

    var cardHTML = `
        <div class="col-5 espaçamento card_paises">
            <div class="card">
                <img src="${pais.flags.png}" class="imagem" alt="Bandeira do País" style="width: 100%; height: auto;"/>
                <h5 class="titulo_card">${pais.name.common}</h5>
                <button type="button" class="btn btn-outline-primary" onclick='abrirModal(${JSON.stringify({ // guardamos os valores
        nome: pais.name.common,
        bandeira: pais.flags.png,
        capital: capital,
        regiao: regiao,
        moeda: moeda
    })})'>Abrir</button>
            </div>
        </div>
    `;

    return cardHTML;
}


function abrirModal(pais) {
    const modalBody = document.getElementById("modalBody");// pomos os detalhes dentro do modal
    modalBody.innerHTML = `
        <img src="${pais.bandeira}" class="imagem" alt="Bandeira do País" style="width: 100%; height: auto;"/>
        <h5 class="titulo_card">${pais.nome}</h5>
        <b class="capital">Capital: ${pais.capital}</b><br>
        <b class="regiao">Continente: ${pais.regiao}</b><br>
        <b class="moeda">Moeda: ${pais.moeda}</b><br>
        <div class="botao_adicionar_favoritos">
            <button type="button" class="btn btn-outline-primary" onclick='favoritos(${JSON.stringify(pais)})'>Adicionar favoritos</button>
        </div>
    `;

    // Exibir o modal
    const modal = new bootstrap.Modal(document.getElementById('modalCard')); // criamos um modal usando bootstrap
    modal.show(); // mostra na tela
    // Mover o foco para o modal
    document.getElementById('modalCard').setAttribute('aria-hidden', 'false'); // aria hidden defenimos como falso para mostrar ao leitor que esta vazio.. Estava a dar erro antes
    modalBody.querySelector('button').focus(); // Focar no botão do modal
}

// Função para fechar o modal
function fecharModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCard')); // get istance obtem o modal
    modal.hide(); // esconde
    document.getElementById('modalCard').setAttribute('aria-hidden', 'true'); // mudamos o aria para true
}

function favoritos(pais) {
    var arrayPaisesFavoritos;

    // Recupera a lista de países favoritos do localStorage
    if (localStorage.getItem("paises") === null) { // se for igual a nada cria um array
        arrayPaisesFavoritos = [];
    } else {
        arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paises"));
    }

    var paisExistente = false;

    for (var i = 0; i < arrayPaisesFavoritos.length; i++) {
        if (arrayPaisesFavoritos[i].nome === pais.nome) {
            paisExistente = true; // percorre as posicoes se existir algum fica verdadeiro
        }
    }
    if (paisExistente) {
        // Se já existir, remove o país usando o for for
        var novosFavoritos = []; // criamos um array auxiliar
        for (var i = 0; i < arrayPaisesFavoritos.length; i++) {
            if (arrayPaisesFavoritos[i].nome !== pais.nome) { // se o nome existente for diferente do selecionado
                novosFavoritos.push(arrayPaisesFavoritos[i]); // vai ser adicionado ao array auxiliar
            }
        }
        localStorage.setItem("paises", JSON.stringify(novosFavoritos));  // mandamos para a local storage o auxiliar
        console.log("País removido dos favoritos:", pais.nome);

    } else {
        // Se não existir, adiciona o país
        arrayPaisesFavoritos.push(pais);
        localStorage.setItem("paises", JSON.stringify(arrayPaisesFavoritos));
        console.log("País adicionado aos favoritos:", pais.nome);
    }
}


// Função para exibir mensagem de erro
function pesquisainvalida(valorpesquisa) {
    return `
        <div>
            <h1>ERRO: O ${valorpesquisa} não existe na API</h1>  
        </div>
    `;
}

