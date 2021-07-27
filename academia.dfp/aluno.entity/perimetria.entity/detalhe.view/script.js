load:function(aluno){
    aluno = (aluno!= undefined)?aluno:sys.getEntent('aluno').objeto.codigo;
    sys.cabecario.setTitulo('Perimetria');
    sys.apiRequest(
        'perimetria/detalhepordata', { 'aluno': aluno },
        function(data) {
            if (data.result != true) {
                //Remover a data ateriormnete salva
                sys.getEntent('aluno_perimetria').objeto = undefined;

                //Mostrar mensagem da api
                document.querySelector('.layer .data').innerHTML = data.msg;

                //Ocultar botão de editar
                document.querySelector('.layer .btn_editar').style.display = 'none';

                //
                return;
            }

            sys.getEntent('aluno_perimetria').objeto = data.detalhe;

            document.querySelector('.layer .data').innerHTML = data.detalhe.data;
            document.querySelector('.layer .torax').innerHTML = data.detalhe.torax;
            document.querySelector('.layer .abdome').innerHTML = data.detalhe.abdome;
            document.querySelector('.layer .quadril').innerHTML = data.detalhe.quadril;
            document.querySelector('.layer .braco_direito').innerHTML = data.detalhe.braco_direito;
            document.querySelector('.layer .braco_esquerdo').innerHTML = data.detalhe.braco_esquerdo;
            document.querySelector('.layer .coxa_superior_direita').innerHTML = data.detalhe.coxa_superior_direita;
            document.querySelector('.layer .coxa_superior_esquerda').innerHTML = data.detalhe.coxa_superior_esquerda;
            document.querySelector('.layer .coxa_inferior_direita').innerHTML = data.detalhe.coxa_inferior_direita;
            document.querySelector('.layer .coxa_inferior_esquerda').innerHTML = data.detalhe.coxa_inferior_esquerda;
            document.querySelector('.layer .perna_direita').innerHTML = data.detalhe.perna_direita;
            document.querySelector('.layer .perna_esquerda').innerHTML = data.detalhe.perna_esquerda;

        }
    );
}