document.getElementById("questionario").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário
    const status = document.getElementById("status");

    // Pegando as respostas do formulário
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;

    if (!q1 || !q2) {
        status.innerText = "Por favor, responda todas as perguntas!";
        return;
    }

    // Enviando os dados para o Google Sheets via POST
    fetch("<URL_DO_SEU_GOOGLE_APPS_SCRIPT>", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ q1, q2 })
    })
    .then(response => response.text())
    .then(() => {
        status.innerText = "Enviado com sucesso!";
    })
    .catch(() => {
        status.innerText = "Erro no envio, tente novamente.";
    });
});
