load: function(operacao) {
    sys.cabecario.setTitulo('Treinamento exercicio');
    //Verificar a operação a ser feita pelo formulario
    //this.operacao = (operacao == 'editar')?'editar':'novo';

    //Carregar os dados do exercicio
    if(operacao == 'editar'){
        this.operacao = 'editar';
        this.carregarBase();
        return;
    }

    if(operacao == 'exerciciolista_retorno'){
        //Se estiver editarndo um exercicio
        if(sys.getEntent('treinamento').exercicio.codigo != null){
            operacao='editar';
            this.carregarBase();
            this.carregarExtrangeiro();
        }else{
            operacao='novo';
            this.carregarExtrangeiro();
            document.querySelector('.layer .btnremover').style.display = 'none';
        }
        this.operacao = operacao;
        return;
    }

    //Novo exercicio, caso nenhuma operação seja reconhecida
    sys.getEntent('treinamento').exercicio.codigo = null;
    document.querySelector('.layer .btnremover').style.display = 'none';
    //...
},
salvar:function(){
    if(!sys.getEntent('exercicio').objeto.codigo){
        return;
    }
    sys.apiRequest(
        'treinamentoexercicio/' + (this.operacao == 'editar'?'atualizar':'adicionar'),
        {
            'codigo':sys.getEntent('treinamento').exercicio.codigo,
            'treinamento':sys.getEntent('treinamento').objeto.codigo,
            'exercicio':sys.getEntent('exercicio').objeto.codigo,
            'ciclo':document.querySelector('.layer [name="ciclo"]').value,
            'sequencia':document.querySelector('.layer [name="ordem"]').value,
            'duracao':document.querySelector('.layer [name="duracao"]').value,
            'duracao_tipo':document.querySelector('.layer [name="duracao_tipo"]').value
        },function(data){
            sys.getEntent('treinamento').detalhe(sys.getEntent('treinamento').objeto.codigo);
        }
    );
},

cancelar:function(){
    sys.getEntent('treinamento').detalhe(
        sys.getEntent('treinamento').objeto.codigo
    );
},

exercicioSelecionar: function(){
    var data = new Object;
    
    data.acao = 'selecionar';
    data.titulo = 'Selecionar exercicio do treinamento';
    data.retorno = 'treinamento-exercicioformulario';
    
    sys.getEntent('exercicio').selecionar(data);
},

carregarBase:function(){
    console.log('carregarBase');
    sys.apiRequest(
        'treinamentoexercicio/detalhe', { 'codigo': sys.getEntent('treinamento').exercicio.codigo },
        function(data) {
            sys.getEntent('treinamento').exercicio = data.detalhe;
            sys.getEntent('exercicio').objeto.exercicio = data.detalhe.exercicio;
            
            //Dados do exercicio
            document.querySelector('.layer .exercicio_nome').innerHTML = data.detalhe.exercicio_nome;
            document.querySelector('.layer .exercicio_descricao').innerHTML = data.detalhe.exercicio_descricao;
            
            document.querySelector('.layer img').setAttribute(
                'src', 
                sys.config.apiURL + 'exercicio/img/'+data.detalhe.exercicio+'?u_' + sys.updatecount
            );

            //dados do treienamentoexercicio
            document.querySelector('.layer [name="ciclo"').value = data.detalhe.ciclo;
            document.querySelector('.layer [name="ordem"').value = data.detalhe.sequencia;
            document.querySelector('.layer [name="duracao"').value = data.detalhe.duracao;
            document.querySelector('.layer [name="duracao_tipo"').value = data.detalhe.duracao_tipo;

        }
        
    );
},
carregarExtrangeiro:function(){
    console.log('carregarExtrangeiro');
    sys.apiRequest(
        'exercicio/detalhe', { 'codigo': sys.getEntent('exercicio').objeto.codigo },
        function(data) {
          
            //Dados do exercicio
            document.querySelector('.layer .exercicio_nome').innerHTML = data.detalhe.nome;
            document.querySelector('.layer .exercicio_descricao').innerHTML = data.detalhe.descricao;
            
            document.querySelector('.layer img').setAttribute(
                'src', 
                sys.config.apiURL + 'exercicio/img/'+data.detalhe.codigo+'?u_' + sys.updatecount
            );
        }
        
    );
},
remover:function(){
    sys.apiRequest(
        'treinamentoexercicio/remover',
        {
            'codigo':sys.getEntent('treinamento').exercicio.codigo,
        },function(data){
            sys.getEntent('treinamento').detalhe(
                sys.getEntent('treinamento').objeto.codigo
            );
        }
    );
}


