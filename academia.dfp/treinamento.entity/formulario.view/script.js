operacao:'novo',
load: function(operacao) {
    //Limpar msg
    document.querySelector('.layer .msg').innerHTML = '';

    //Verificar a operação a ser feita pelo formulario
    this.operacao = (operacao == 'editar')?'editar':'novo';

    //Carregar os dados do trienamento
    if(operacao == 'editar'){
        this.operacao = 'editar';
        sys.cabecario.setTitulo('Treinamento ...');
        document.querySelector('.layer .msg').innerHTML = 'Carregando...';

        //Pegar os dados do aluno e colocar no formulario
        sys.apiRequest(
            'treinamento/detalhe', { 'codigo': sys.getEntent('treinamento').objeto.codigo },
            function(data) {
                if(data.result != true){
                    document.querySelector('.layer .msg').innerHTML = data.msg;
                    return;
                }
                document.querySelector('.layer .msg').innerHTML = '';
                

                sys.getEntent('treinamento').objeto = data.detalhe;
                sys.cabecario.setTitulo('Treinamento ' + data.detalhe.nome);
                
                document.querySelector('.layer [name="nome"]').value = data.detalhe.nome;
                document.querySelector('.layer [name="dias"]').value = data.detalhe.ciclo;
                document.querySelector('.layer [name="descricao"]').innerHTML = data.detalhe.descricao;
            }
            
        );
    }
},

salvar:function(){
    document.querySelector('.layer .msg').innerHTML = 'Salvando...';
    sys.apiRequest(
        (sys.getView('treinamento-formulario').operacao == 'editar')?'treinamento/atualizar':'treinamento/adicionar',
        {
            'codigo':sys.getEntent('treinamento').objeto.codigo,
            'nome':document.querySelector('.layer [name="nome"]').value,
            'descricao':document.querySelector('.layer [name="descricao"]').value,
            'ciclo':document.querySelector('.layer [name="dias"]').value,
            'situacao':document.querySelector('.layer [name="situacao"]').value
        },function(data){
            if(data.result != true){
                document.querySelector('.layer .msg').innerHTML = data.msg;
                return;
            }
            sys.getEntent('treinamento').detalhe(data.codigo);
        }
    );
},

cancelar:function(){
    if(this.operacao == 'editar'){
        sys.getEntent('treinamento').detalhe(
            sys.getEntent('treinamento').objeto.codigo
        );
        return;
    }

    sys.getEntent('treinamento').lista();
}

