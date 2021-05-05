load: function() {
    sys.cabecario.setTitulo('Treinamentos');

    document.querySelector('.layer .pesquisa').onkeyup = function(event) {
        sys.getView('treinamento-lista').listar();
    };

    document.querySelector('.layer form').onsubmit = function(event) {
        event.preventDefault();
        sys.getView('treinamento-lista').listar();
    };

    this.listar();

},
listar: function() {
    sys.apiRequest('treinamento/listar', {
            'pesquisa': document.querySelector('.layer .pesquisa').value,
            'filtro':{
                'situacao':{
                    'ativo':true,
                    'inativo':document.querySelector('.layer .inativos').checked
                }
            }
        },
        function(data) {
            var lista = document.querySelector('.layer .lista');
            lista.innerHTML = '';

            if (data.lista.length < 1) {
                lista.innerHTML = 'Nenhum exercicio encontrado';
            }

            for (var index = 0; index < data.lista.length; index++) {
                var treinamento = data.lista[index];
                var t = document.querySelector('.layer .tem_treinamento');
                var clon = t.content.cloneNode(true);

                clon.querySelector('.nome').innerHTML = treinamento.nome;

                clon.querySelector('.descricao').innerHTML = treinamento.descricao;
                
                clon.querySelector('.treinamento').setAttribute(
                    'onclick',
                    "sys.getEntent('treinamento').detalhe("+treinamento.codigo+");"
                );

                lista.appendChild(clon);
            }
        }
    );
}