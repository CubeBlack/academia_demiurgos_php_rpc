load:function(){
    document.querySelector('.layer form').onsubmit = function(event) {
        event.preventDefault();
        sys.getView('sessao-login').logar();
    };
},
logar:function(para_inicio){
    document.querySelector('.layer .msg').innerHTML = 'Altenticando...';
    sys.apiRequest(
        'usuariosessao/adicionar', {
            "usuario": document.querySelector(".layer .usuario").value,
            "senha": document.querySelector(".layer .senha").value
        },
        function(data) {
            if (data.result == true) {
                sessionStorage.setItem(
                    'sessao_objeto',
                    JSON.stringify(data.detalhe)
                );
                sys.getEntent('sessao').objeto = data.detalhe;
                document.querySelector('.layer .msg').innerHTML = 'Login efetuado com sucesso. Aguarde';
                sys.layerLoadContent(
                    "conteudo",
                    sys.getEntent("sessao").paginaInicial["instrutor"]
                );
                sys.cabecario.show();
            } else {
                document.querySelector('.layer .msg').innerHTML = data.msg;

            }
        }
    );
}