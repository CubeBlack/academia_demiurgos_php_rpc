load:function(operacao){
    this.operacao = (operacao == 'editar')?'editar':'novo';

    //No caso de estar editando
    if(operacao == 'editar'){
        sys.cabecario.setTitulo('Editar Perimetria');
        sys.apiRequest(
            'perimetria/detalhepordata', { 
                'codigo': sys.getEntent('aluno').objeto.codigo,
                'data': sys.getEntent('aluno-perimetria').objeto.data 
            },
            function(data) {
                if (data.result != true) {
                    ePagina.error(
                        error.name,
                        error.message + "\n" + this.responseText
                    );
                }

                //sys.getEntent('aluno').objeto.codigo = data.detalhe;

                document.querySelector('.layer .data').innerHTML = data.detalhe.data;
                document.querySelector('.layer .torax').value = data.detalhe.torax;
                document.querySelector('.layer .abdome').value = data.detalhe.abdome;
                document.querySelector('.layer .quadril').value = data.detalhe.quadril;
                document.querySelector('.layer .braco_direito').value = data.detalhe.braco_direito;
                document.querySelector('.layer .braco_esquerdo').value = data.detalhe.braco_esquerdo;
                document.querySelector('.layer .coxa_superior_direita').value = data.detalhe.coxa_superior_direita;
                document.querySelector('.layer .coxa_superior_esquerda').value = data.detalhe.coxa_superior_esquerda;
                document.querySelector('.layer .coxa_inferior_direita').value = data.detalhe.coxa_inferior_direita;
                document.querySelector('.layer .coxa_inferior_esquerda').value = data.detalhe.coxa_inferior_esquerda;
                document.querySelector('.layer .perna_direita').value = data.detalhe.perna_direita;
                document.querySelector('.layer .perna_esquerda').value = data.detalhe.perna_esquerda;

            }
        );

        return;
    }

    //No caso de estar registrando
    sys.cabecario.setTitulo('Registrar Perimetria');
    var data = new Date();
    document.querySelector('.layer .data').innerHTML = data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear();
},
salvar:function(){
    var data = new Date();
    var strData = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate();
    sys.apiRequest(
        (this.operacao == 'editar')?'perimetria/atualizarpordata':'perimetria/registrar',
        { 
            "aluno"                 :sys.getEntent('aluno').objeto.codigo,
            "data"                  :strData,
            "torax"                 :document.querySelector('.layer .torax').value,
            "abdome"                :document.querySelector('.layer .abdome').value,
            "quadril"               :document.querySelector('.layer .quadril').value,
            "braco_direito"         :document.querySelector('.layer .braco_direito').value,
            "braco_esquerdo"        :document.querySelector('.layer .braco_esquerdo').value,
            "coxa_superior_direita" :document.querySelector('.layer .coxa_superior_direita').value,
            "coxa_superior_esquerda":document.querySelector('.layer .coxa_superior_esquerda').value,
            "coxa_inferior_direita" :document.querySelector('.layer .coxa_inferior_direita').value,
            "coxa_inferior_esquerda":document.querySelector('.layer .coxa_inferior_esquerda').value,
            "perna_direita"         :document.querySelector('.layer .perna_direita').value,
            "perna_esquerda"        :document.querySelector('.layer .perna_esquerda').value
        },
        function(resposta) {
            if(resposta.result != true){
                console.log('Erro!');
                return;
            }
            sys.getEntent('aluno-perimetria').detalhe(resposta.data);
        }
        
    );
}