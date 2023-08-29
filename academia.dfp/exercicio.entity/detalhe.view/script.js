load: function() {
    sys.cabecario.setTitulo('Exercicio ...');

    //console.log(sys.getEntent('exercicio').objeto.codigo);
    sys.apiRequest(
        'exercicio/detalhe',
        {'codigo':sys.getEntent('exercicio').objeto.codigo},
        function(data){
           
            var exercicio = data.detalhe;
            sys.getEntent('exercicio').objeto = exercicio;

            sys.cabecario.setTitulo('Exercicio ' + exercicio.nome);
            
            document.querySelector('.layer .nome').innerHTML = exercicio.nome;
            document.querySelector('.layer .descricao').innerHTML = exercicio.descricao;
            document.querySelector('.layer img').setAttribute(
                'src', 
                sys.config.apiURL + 'exercicio/img/'+exercicio.codigo+'?u_' + sys.updatecount
            );

            
        }
    );

}