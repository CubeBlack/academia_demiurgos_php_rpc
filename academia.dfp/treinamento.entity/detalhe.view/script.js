load: function() {
    sys.cabecario.setTitulo('Treinamento ...');

    sys.apiRequest(
        'treinamento/detalhe',
        {'codigo':sys.getEntent('treinamento').objeto.codigo},
        function(data){
           
            var treinamento = data.detalhe;
            sys.getEntent('treinamento').objeto = treinamento;

            sys.cabecario.setTitulo('Treinamento ' + treinamento.nome);
           
            //Cabecario
            document.querySelector('.layer .nome').innerHTML = treinamento.nome;
            document.querySelector('.layer .descricao').innerHTML = treinamento.descricao;
            document.querySelector('.layer .dias').innerHTML = treinamento.ciclo;
            document.querySelector('.layer .situacao').innerHTML = treinamento.situacao;

            //Exercicios
            var lista = document.querySelector('.layer .exercicios');
            var t = document.querySelector('.layer .tem_exercicio');
            var tCiclo = document.querySelector('.layer .tem_ciclo');
            var tMsg = document.querySelector('.layer .tem_msg');

            for (let iCiclo = 0; iCiclo < Object.keys(treinamento.ciclos).length; iCiclo++) {
                //acicionar cabeçario
                var clon = tCiclo.content.cloneNode(true);
                clon.querySelector('.valor').innerHTML =  Object.keys(treinamento.ciclos)[iCiclo];
                lista.appendChild(clon);

                var ciclo = treinamento.ciclos[Object.keys(treinamento.ciclos)[iCiclo]];

                //Adicionar exercicios
                for (let iExercicio = 0; iExercicio < ciclo.length; iExercicio++) {
                    var exercicio = ciclo[iExercicio];

                    var clon = t.content.cloneNode(true);

                    clon.querySelector('.sequencia').innerHTML = exercicio.sequencia;
                    clon.querySelector('.exercicio_nome').innerHTML = exercicio.exercicio_nome;
                    clon.querySelector('.exercicio_descricao').innerHTML = exercicio.descricao;
                    clon.querySelector('.duracao').innerHTML = exercicio.duracao;
                    clon.querySelector('.duracao_tipo').innerHTML = exercicio.duracao_tipo;
                    
                
                    clon.querySelector('.editar').setAttribute(
                        'onclick',
                        "sys.getView('treinamento-detalhe').exercicioEditar("+exercicio.codigo+");"
                    );
                

                    lista.appendChild(clon);
                    
                }

                //Se não tiver exercicio nesse ciclo
                if ( ciclo.length < 1) {
                    var clon = tMsg.content.cloneNode(true);
                    clon.querySelector('.msg').innerHTML =  'Nenhum exercicio para esse dia';
                    lista.appendChild(clon);
                }

                
            }

            
        }
    );

},
editar:function(){
    sys.layerLoadContent('conteudo','treinamento-formularioexercicio', 'editar');
},

/* Exercicio */
exercicioEditar:function(codigo){
    sys.getEntent('treinamento').exercicio.codigo = codigo;
    sys.layerLoadContent('conteudo','treinamento-exercicioformulario', 'editar');
},
exercicioAdicionar:function(codigo){
    sys.layerLoadContent('conteudo','treinamento-exercicioformulario', 'novo');
}
