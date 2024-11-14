$(document).ready(function() {
    $("#questionario").on("submit", function(event) {
        event.preventDefault(); // Impede o envio tradicional do formulário
        
        const status = $("#status"); // Elemento para mostrar o status de envio
        
        // Verificar se todas as questões foram respondidas
        const q1 = $('input[name="q1"]:checked'); // Pegando a opção marcada da questão 1
        const q2 = $('input[name="q2"]:checked'); // Pegando a opção marcada da questão 2

        // Verifica se nenhuma opção foi selecionada
        if (q1.length === 0) {
            status.text("Por favor, selecione uma resposta para a Questão 1!");
            return; // Interrompe o envio
        }
        if (q2.length === 0) {
            status.text("Por favor, selecione uma resposta para a Questão 2!");
            return; // Interrompe o envio
        }

        // Coleta as respostas
        const respostaQ1 = q1.val();
        const respostaQ2 = q2.val();

        // Enviar os dados para o Google Sheets via POST
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxecbJPzWGeOUqIg_jGh3QjPV73HsAgo_qPMIXjMt2SvjIGoohxc-nFSxyvBDrLgdbQ/exec",  // Substitua pela URL do seu Web App
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ q1: respostaQ1, q2: respostaQ2 }),
            success: function(response) {
                status.text("Enviado com sucesso!");
            },
            error: function(error) {
                status.text("Erro no envio, tente novamente.");
            }
        });
    });
});
