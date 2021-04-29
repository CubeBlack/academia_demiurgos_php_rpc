load: function() {
    sys.cabecario.setTitulo('Exercicios');
    document.querySelector('.layer .pesquisa').onkeyup = function(event) {
        sys.getView('exercicio-lista').listar();
    };

    document.querySelector('.layer form').onsubmit = function(event) {
        event.preventDefault();
        sys.getView('exercicio-lista').listar();
    };

    sys.getView('exercicio-lista').listar();

},
listar: function() {
    sys.apiRequest('exercicio/lista', {
            'pesquisa': document.querySelector('.layer .pesquisa').value
        },
        function(data) {
            let lista = document.querySelector('.layer .lista');
            lista.innerHTML = '';
            if (data.lista.length < 1) {
                lista.innerHTML = 'Nenhum exercicio encontrado';
            }

            for (let index = 0; index < data.lista.length; index++) {
                let exercicio = data.lista[index];
                let t = document.querySelector('.layer .tem_exercicio');
                let clon = t.content.cloneNode(true);

                clon.querySelector('.nome').innerHTML = exercicio.nome;

                clon.querySelector('img').setAttribute(
                    'src', 
                    sys.config.apiURL + 'exercicio/img/'+exercicio.codigo+'?rand=' + Math.floor( Math.random() * 99)
                );

                clon.querySelector('.descricao').innerHTML = exercicio.descricao;
                
                clon.querySelector('.exercicio').setAttribute(
                    'onclick',
                    "sys.getEntent('exercicio').detalhe("+exercicio.codigo+");"
                );

                lista.appendChild(clon);
            }
        }
    );
}