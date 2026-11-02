function validateForm() {
    var mensagemErro = false;

    var nome = document.getElementById("Nome");
    if (nome.value.length < 2) { // se o tamanho de nome for menor que 2
        mensagemErro = "Por favor, insira o seu nome";
        showError("Nome", mensagemErro); // mostra a funcao showerro
    } else {
        hideError("Nome");
    }

    const mensageminput = document.getElementById("Mensagem");
    if (mensageminput.value.length < 6) {
        mensagemErro = "Por favor, insira a mensagem";
        showError("Mensagem", mensagemErro);
    } else {
        hideError("Mensagem");
    }

    var email = document.getElementById("email");
    if (!validateEmail(email.value)) {
        mensagemErro = "Preencha bem o seu email";
        showError("email", mensagemErro);
    } else {
        hideError("email");
    }

    // Se houver erro, não enviar o formulário
    return !mensagemErro; // Retorna true se não houver erro
}

function validateEmail(email) {
    var regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/;
    return regex.test(email);
}

function showError(campoID, mensagem) {
    var feedbackDiv = document.querySelector('#' + campoID + " ~ .Invalid");
    if (feedbackDiv != null) {
        feedbackDiv.textContent = mensagem;
        feedbackDiv.style.display = "block";
    }
}

function hideError(campoID) {
    var feedbackDiv = document.querySelector('#' + campoID + " ~ .Invalid");
    if (feedbackDiv != null) {
        feedbackDiv.textContent = "";
        feedbackDiv.style.display = "none";
    }
}

document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
        alert("Formulário enviado com sucesso!");
    }
});