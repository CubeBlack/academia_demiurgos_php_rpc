acao:'',
titulo:'',
retorno:'',
load: function(data) {

    //Tratar parametros
    data         = typeof data         == 'undefined'?{}       : data;
    this.acao    = typeof data.acao    == 'string'?data.acao   : 'listar';
    this.titulo  = typeof data.titulo  == 'string'?data.titulo : 'Exercicios';
    this.retorno = typeof data.retorno == 'string'?data.retorno: '';

    //Exibir titulo
    sys.cabecario.setTitulo(this.titulo);
    
    //Caso não seja uma lista
    if(this.acao=='listar'){
        
    }else if(this.acao == 'selecionar'){
        //Ocultar botão de acicionar
        document.querySelector('.layer .btnadicionar').style.display = 'none';
    }

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

            var retorno = sys.getView('exercicio-lista').retorno;
            var acao = sys.getView('exercicio-lista').acao;

            for (let index = 0; index < data.lista.length; index++) {
                let exercicio = data.lista[index];
                let t = document.querySelector('.layer .tem_exercicio');
                let clon = t.content.cloneNode(true);

                clon.querySelector('.nome').innerHTML = exercicio.nome;

                clon.querySelector('img').setAttribute(
                    'src', 
                    sys.config.apiURL + 'exercicio/img/'+exercicio.codigo+'?u_' + sys.updatecount
                );

                clon.querySelector('.descricao').innerHTML = exercicio.descricao;
                
                //Se a ação for selecionar
                if(acao == 'selecionar'){
                    clon.querySelector('.exercicio .acao').innerHTML = 'Selecionar';
                    clon.querySelector('.exercicio .acao').setAttribute(
                        'onclick',
                        "sys.getEntent('exercicio').objeto.codigo = "+exercicio.codigo+";"
                        +"sys.layerLoadContent('conteudo','"+retorno+"', 'exerciciolista_retorno');"
                    );
                    lista.appendChild(clon);
                    continue;
                }

                //Caso não seja nenhuma ação anterior
                clon.querySelector('.exercicio .acao').innerHTML = 'Detalhe';
                clon.querySelector('.exercicio .acao').setAttribute(
                    'onclick',
                    "sys.getEntent('exercicio').detalhe("+exercicio.codigo+");"
                );
                lista.appendChild(clon);
            }
        }
    );
}