load:function(){
    sys.cabecario.setTitulo('Perimetria');
    sys.apiRequest(
        'perimetria/detalhepordata', { 'aluno': sys.getEntent('aluno').objeto.codigo },
        function(data) {
            if (data.result != true) {
                console.log('erro!');
                return;
            }

            sys.getEntent('aluno_perimetria').objeto.codigo = data.detalhe;

            document.querySelector('.layer .torax').innerHTML = data.detalhe.torax;
            document.querySelector('.layer .abdomen').innerHTML = data.detalhe.abdomen;
            document.querySelector('.layer .braco_direito').innerHTML = data.detalhe.braco_direito;
            document.querySelector('.layer .braco_esquerdo').innerHTML = data.detalhe.braco_esquerdo;
            document.querySelector('.layer .coxa_superior_direita').innerHTML = data.detalhe.coxa_superior_direita;
            document.querySelector('.layer .coxa_superior_esquerda').innerHTML = data.detalhe.coxa_superior_esquerda;
            document.querySelector('.layer .coxa_inferior_direita').innerHTML = data.detalhe.coxa_inferior_direita;
            document.querySelector('.layer .coxa_inferior_esquerda').innerHTML = data.detalhe.coxa_inferior_esquerda;
            //document.querySelector('.layer .cidade').innerHTML = data.detalhe.cidade;
            //document.querySelector('.layer .estado').innerHTML = data.detalhe.estado;

        }
    );
},
atualizar:function(){

},
registrar:function(){

},
registros:function(){
    
}