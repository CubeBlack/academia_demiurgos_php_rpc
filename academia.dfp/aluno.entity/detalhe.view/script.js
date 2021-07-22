load:function(){
    sys.cabecario.setTitulo('Aluno...');
    sys.apiRequest(
        'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
        function(data) {
            if (data.result != true) {
                console.log('erro!');
                return;
            }

            sys.getEntent('aluno').objeto = data.detalhe;
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
}