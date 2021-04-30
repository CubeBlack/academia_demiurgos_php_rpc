load: function(operacao) {
    this.operacao = (operacao == 'editar')?'editar':'novo';
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
                    sys.config.apiURL + 'exercicio/img/'+data.detalhe.codigo+'?rand=' + Math.floor( Math.random() * 99)
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
        self.salvar();
        return;
    }
    let reader = new FileReader();
    reader.onloadend = function () {
        self.imgBase64 = reader.result;

        //Enviar tudo
        sys.getView('exercicio-detalhe').salvar();
       
    };
    
    reader.readAsDataURL(img);	

},
salvar:function(){
    let nome = document.querySelector('.layer [name="nome"]').value;
    let descricao = document.querySelector('.layer [name="descricao"]').value;
    
    sys.apiRequest(
        'exercicio/atualizar',
        {
            'codigo':sys.getEntent('exercicio').objeto.codigo,
            'nome':nome,
            'descricao':descricao,
            'imagem':self.imgBase64
        },function(data){
            if(data.result != true){
                document.querySelector('.pagina_exercicio_detalhe .msg').innerHTML = data.msg;
                return;
            }
            sys.getView('exercicio-detalhe').detalhe();
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

