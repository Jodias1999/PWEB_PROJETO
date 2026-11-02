$(document).ready(function() {
    // Recupera a lista de países favoritos do localStorage
    var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paises")) || [];

    // Verifica se há países favoritos
    if (arrayPaisesFavoritos.length === 0) {
        $('.lista_paises').append('<h5>Nenhum país favorito encontrado.</h5>');
    } else {
        // Cria cards para cada país favorito
        for (var i = 0; i < arrayPaisesFavoritos.length; i++) {
            if (Object.keys(arrayPaisesFavoritos[i].nome).length != 0) { // se o nome existente for diferente do selecionado
                $('.lista_paises').append(criarCard(arrayPaisesFavoritos[i]));; // vai ser adicionado ao array auxiliar
            }
        }
        
    }
});

// Função para criar o card de um país
function criarCard(pais) {
    var cardHTML = `
        <div class="col-5 espaçamento card_paises">
            <div class="card">
                <img src="${pais.bandeira}" class="imagem" alt="Bandeira do País"/>
                <div class="card_body">
                    <h5 class="titulo-card">${pais.nome}</h5>
                    <b class="capital">Capital: ${pais.capital}</b><br>
                    <b class="regiao">Continente: ${pais.regiao}</b><br>
                    <b class="moeda">Moeda: ${pais.moeda}</b><br>
                    <div class="botao_adicionar_favoritos">
                        <button type="button" class="btn btn-outline-primary" onclick='removerFavoritos("${pais.nome}")'>Remover favoritos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return cardHTML;
}


function removerFavoritos(pais) {
    var arrayPaisesFavoritos = JSON.parse(localStorage.getItem("paises")) || [];
    var novosFavoritos = arrayPaisesFavoritos.filter(function(item) {
        return item.nome !== pais; // Corrigido para comparar diretamente com pais
    });
    localStorage.setItem("paises", JSON.stringify(novosFavoritos));
    
    // Remover o card do DOM
    $(`.card_paises:has(.titulo-card:contains('${pais}'))`).remove();
}


