load:function(tipo){
    sys.cabecario.setTitulo('Anammnese ....');
    
    //Carregar formulario
    sys.apiRequest(
        'anammnese/questionario', {},
        function(data) {
            //
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

    //Carregar respostas
    
},
salvar:function (){
    sys.apiRequest(
        'aluno/adicionar', 
        { 
            'nome':document.querySelector('.layer .nome').value,

        },
        function(data) {
            sys.getEntent('aluno').objeto.codigo = data.detalhe;
            sys.cabecario.setTitulo('Aluno ' + data.detalhe.nome);

        }
        
    );
},
voltar:function(){
    sys.layerLoadContent("conteudo",'aluno-lista');
}