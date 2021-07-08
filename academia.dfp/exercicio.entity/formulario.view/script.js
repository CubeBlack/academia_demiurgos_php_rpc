load: function(operacao) {
    //Verificar a operação a ser feita pelo formulario
    this.operacao = (operacao == 'editar')?'editar':'novo';

    //Limpar a image, para  não colocar a imagem errada
    this.imgBase64 = null;

    //Carregar os dados do exercicio
    if(operacao == 'editar'){
        this.operacao = 'editar';
        sys.cabecario.setTitulo('Exercicio ...');
        //Pegar os dados do aluno e colocar no formulario
        sys.apiRequest(
            'exercicio/detalhe', { 'codigo': sys.getEntent('exercicio').objeto.codigo },
            function(data) {
                sys.getEntent('exercicio').objeto = data.detalhe;
                sys.cabecario.setTitulo('Exercicio '+data.detalhe.nome);
                
                document.querySelector('.layer [name="nome"]').value = data.detalhe.nome;
                document.querySelector('.layer [name="descricao"]').innerHTML = data.detalhe.descricao;
                document.querySelector('.layer img').setAttribute(
                    'src', 
                    sys.config.apiURL + 'exercicio/img/'+data.detalhe.codigo+'?u_' + sys.updatecount
                );
            }
            
        );
    }
},
imgBase64:null,
validar:function(){
    document.querySelector('.layer .msg').innerHTML = 'Salvando...';
    //Tratar imagem antes de enviar
    let input = document.querySelector('.layer input[type=file]');
    let img = input.files[0];

    //Se não tiver imagem para atualizar
    if (img == undefined){
        this.salvar();
        return;
    }

    //Ler a imagem antes de enviar
    //O melhor é ler a imagem quando for colocada, e usar o img
    //para visulizar a imagem
    let reader = new FileReader();
    reader.onloadend = function () {
        //Savlar a imagem carregada
        sys.getView('exercicio-formulario').imgBase64 = reader.result;

        //Salvar
        sys.getView('exercicio-formulario').salvar();
    };
    
    reader.readAsDataURL(img);	

},
salvar:function(){
    let nome = document.querySelector('.layer [name="nome"]').value;
    let descricao = document.querySelector('.layer [name="descricao"]').value;
    
    sys.apiRequest(
        (sys.getView('exercicio-formulario').operacao == 'editar')?'exercicio/atualizar':'exercicio/adicionar',
        {
            'codigo':sys.getEntent('exercicio').objeto.codigo,
            'nome':nome,
            'descricao':descricao,
            'imagem':this.imgBase64
        },function(data){
            sys.updatecount++;
            sys.getEntent('exercicio').detalhe(data.codigo);
        }
    );
},

cancelar:function(){
    if(this.operacao == 'editar'){
        sys.getEntent('exercicio').detalhe(
            sys.getEntent('exercicio').objeto.codigo
        );
        return;
    }

    sys.getEntent('exercicio').lista();

}

