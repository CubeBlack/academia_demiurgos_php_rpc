load: function() {
    sys.cabecario.setTitulo('Treinamento ...');

    sys.apiRequest(
        'treinamento/detalhe',
        {'codigo':sys.getEntent('treinamento').objeto.codigo},
        function(data){
           
            var treinamento = data.detalhe;
            sys.getEntent('treinamento').objeto = treinamento;

            sys.cabecario.setTitulo('Treinamento ' + treinamento.nome);
            
            document.querySelector('.layer .nome').innerHTML = treinamento.nome;
            document.querySelector('.layer .descricao').innerHTML = treinamento.descricao;
            document.querySelector('.layer .dias').innerHTML = treinamento.ciclo;
            document.querySelector('.layer .situacao').innerHTML = treinamento.situacao;
            
        }
    );

},
editar:function(){
    sys.layerLoadContent('conteudo','treinamento-formularioexercicio', 'editar');
}