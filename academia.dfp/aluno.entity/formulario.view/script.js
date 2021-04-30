load:function(operacao){
    this.operacao = (operacao == 'editar')?'editar':'novo';
    if(operacao == 'editar'){
        this.operacao = 'editar';
        sys.cabecario.setTitulo('Aluno ...');
        //Pegar os dados do aluno e colocar no formulario
        sys.apiRequest(
            'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
            function(data) {
                sys.getEntent('aluno').objeto = data.detalhe;
                sys.cabecario.setTitulo('Aluno '+data.detalhe.nome);
                
                document.querySelector('.layer .nome').value = data.detalhe.nome;
                document.querySelector('.layer .codigo').value = data.detalhe.codigo;
                document.querySelector('.layer .cadastro').value = data.detalhe.cadastro;
                document.querySelector('.layer .cpf').value = data.detalhe.cpf;
                document.querySelector('.layer .genero').value = data.detalhe.genero;
                document.querySelector('.layer .endereco').value = data.detalhe.endereco;
                document.querySelector('.layer .numero').value = data.detalhe.numero;
                document.querySelector('.layer .bairro').value = data.detalhe.bairro;
                document.querySelector('.layer .cidade').value = data.detalhe.cidade;
                document.querySelector('.layer .estado').value = data.detalhe.estado;
                document.querySelector('.layer .telefone_a').value = data.detalhe.telefone_a;
                document.querySelector('.layer .telefone_b').value = data.detalhe.telefone_b;
                document.querySelector('.layer .email').value = data.detalhe.email;
                document.querySelector('.layer .senha').value = data.detalhe.senha;
    
            }
            
        );

        //
        return;
    }
    this.operacao = 'novo';
    sys.cabecario.setTitulo('Novo aluno');
},
salvar:function (){
    sys.apiRequest(
        (operacao == 'editar')?'aluno/atualizar':'aluno/adicionar',
        { 
            'nome':document.querySelector('.layer .nome').value,
            'cpf':document.querySelector('.layer .cpf').value,
            'genero':document.querySelector('.layer .genero').value,
            'endereco':document.querySelector('.layer .endereco').value,
            'numero':document.querySelector('.layer .numero').value,
            'bairro':document.querySelector('.layer .bairro').value,
            'cidade':document.querySelector('.layer .cidade').value,
            'estado':document.querySelector('.layer .estado').value,
            'telefone_a':document.querySelector('.layer .telefone_a').value,
            'telefone_b':document.querySelector('.layer .telefone_b').value,
            'email':document.querySelector('.layer .email').value,
            'senha':document.querySelector('.layer .senha').value,
            'senha':document.querySelector('.layer .senha').value
        },
        function(data) {
            sys.getEntent('aluno').objeto.codigo = data.detalhe;
            sys.cabecario.setTitulo('Aluno ' + data.detalhe.nome);
            document.querySelector('.layer .nome').innerHTML = data.detalhe.nome;
            document.querySelector('.layer .codigo').innerHTML = data.detalhe.codigo;
            document.querySelector('.layer .cadastro').innerHTML = data.detalhe.cadastro;
            document.querySelector('.layer .cpf').innerHTML = data.detalhe.cpf;
            document.querySelector('.layer .genero').innerHTML = data.detalhe.genero;
            document.querySelector('.layer .endereco').innerHTML = data.detalhe.endereco;
            document.querySelector('.layer .numero').innerHTML = data.detalhe.numero;
            document.querySelector('.layer .bairro').innerHTML = data.detalhe.bairro;
            document.querySelector('.layer .cidade').innerHTML = data.detalhe.cidade;
            document.querySelector('.layer .estado').innerHTML = data.detalhe.estado;
            document.querySelector('.layer .telefone_a').innerHTML = data.detalhe.telefone_a;
            document.querySelector('.layer .telefone_b').innerHTML = data.detalhe.telefone_b;
            document.querySelector('.layer .email').innerHTML = data.detalhe.email;
            document.querySelector('.layer .senha').innerHTML = data.detalhe.senha;

        }
        
    );
},
voltar:function(){
    sys.layerLoadContent("conteudo",'aluno-lista');
}