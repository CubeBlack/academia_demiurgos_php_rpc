"sessao-login":{
	load:function(){
	    document.querySelector('.layer form').onsubmit = function(event) {
	        event.preventDefault();
	        sys.getView('sessao-login').logar();
	    };
	},
	logar:function(para_inicio){
	    document.querySelector('.layer .msg').innerHTML = 'Altenticando...';
	    sys.apiRequest(
	        'usuariosessao/adicionar', {
	            "usuario": document.querySelector(".layer .usuario").value,
	            "senha": document.querySelector(".layer .senha").value
	        },
	        function(data) {
	            if (data.result == true) {
	                sessionStorage.setItem(
	                    'sessao_objeto',
	                    JSON.stringify(data.detalhe)
	                );
	                sys.getEntent('sessao').objeto = data.detalhe;
	                document.querySelector('.layer .msg').innerHTML = 'Login efetuado com sucesso. Aguarde';
	                sys.layerLoadContent(
	                    "conteudo",
	                    sys.getEntent("sessao").paginaInicial["instrutor"]
	                );
	                sys.cabecario.show();
	            } else {
	                document.querySelector('.layer .msg').innerHTML = data.msg;
	
	            }
	        }
	    );
	}
},
"aluno-treinamento":{
	load:function(){
	    sys.cabecario.setTitulo('Aluno...');
	    sys.apiRequest(
	        'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
	        function(data) {
	            if (data.result != true) {
	                ePagina.error(
	                    error.name,
	                    error.message + "\n" + this.responseText
	                );
	            }
	
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
	}
},
"aluno-formulario":{
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
	            if (data.result != true) {
	
	            }
	
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
},
"aluno_anamnese-formulario":{
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
},
"aluno_anamnese-detalhe":{
	load:function(){
	    sys.cabecario.setTitulo('Aluno...');
	    sys.apiRequest(
	        'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
	        function(data) {
	            if (data.result != true) {
	                ePagina.error(
	                    error.name,
	                    error.message + "\n" + this.responseText
	                );
	            }
	
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
	}
},
"aluno-detalhe":{
	load:function(){
	    sys.cabecario.setTitulo('Aluno...');
	    sys.apiRequest(
	        'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
	        function(data) {
	            if (data.result != true) {
	                ePagina.error(
	                    error.name,
	                    error.message + "\n" + this.responseText
	                );
	            }
	
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
	}
},
"aluno-inicio":{
	load:function(){
	    sys.cabecario.setTitulo('Aluno...');
	    sys.apiRequest(
	        'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
	        function(data) {
	            if (data.result != true) {
	                ePagina.error(
	                    error.name,
	                    error.message + "\n" + this.responseText
	                );
	            }
	
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
	}
},
"aluno-perimetria":{
	load:function(){
	    sys.cabecario.setTitulo('Aluno...');
	    sys.apiRequest(
	        'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
	        function(data) {
	            if (data.result != true) {
	                ePagina.error(
	                    error.name,
	                    error.message + "\n" + this.responseText
	                );
	            }
	
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
	}
},
"aluno-lista":{
	load:function(){
	    console.log('aluno-listar');
	    sys.cabecario.setTitulo('Alunos');
	
	    document.querySelector('.layer [name="pesquisa"]').onkeyup = function(){
	        sys.getView('aluno-lista').listar();
	    };
	
	    document.querySelector('.layer form').onsubmit = function(event){
	        event.preventDefault();
	        sys.getView('aluno-lista').listar();
	    };
	
	    sys.getView('aluno-lista').listar();
	},
	
	listar:function(){
	    sys.apiRequest(
	        'aluno/listar', {
	            'pesquisa':document.querySelector('.layer [name="pesquisa"]').value
	        },
	        function(data) {
	
	            var lista = document.querySelector(".layer .alunos");
	            lista.innerHTML = '';
	
	            if (data.result != true) {
	                lista.innerHTML = data.msg;
	                return;
	            }
	
	            data.lista.forEach(function(aluno, i) {
	                var temp = document.querySelector(".layer .tem_aluno");
	                var clon = temp.content.cloneNode(true);
	
	                clon.querySelector('.codigo').innerHTML = aluno.codigo;
	                clon.querySelector('.nome').innerHTML = aluno.nome;
	                clon.querySelector('.telefone_a').innerHTML = aluno.telefone_a;
	                clon.querySelector('.telefone_b').innerHTML = aluno.telefone_b;
	
	
	                clon.querySelector('.aluno').setAttribute(
	                    'onclick',
	                    "sys.getEntent('aluno').detalhe(" + aluno.codigo + ");"
	                );
	
	                lista.appendChild(clon);
	            });
	        }
	    );
	}
	
},
"exercicio-formulario":{
	load: function(operacao) {
	    this.operacao = (operacao == 'editar')?'editar':'novo';
	    if(operacao == 'editar'){
	        this.operacao = 'editar';
	        sys.cabecario.setTitulo('Exercicio ...');
	        //Pegar os dados do aluno e colocar no formulario
	        sys.apiRequest(
	            'exercicio/detalhe', { 'codigo': sys.getEntent('exercicio').objeto.codigo },
	            function(data) {
	                sys.getEntent('aluno').objeto = data.detalhe;
	                sys.cabecario.setTitulo('Aluno '+data.detalhe.nome);
	                
	                document.querySelector('.layer [name="nome"]').value = exercicio.nome;
	                document.querySelector('.layer [name="descricao"]').innerHTML = exercicio.descricao;
	                document.querySelector('.layer img').setAttribute(
	                    'src', 
	                    sys.config.apiURL + 'exercicio/img/'+exercicio.codigo+'?rand=' + Math.floor( Math.random() * 99)
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
	}
	
	
},
"exercicio-detalhe":{
	load: function() {
	    sys.cabecario.setTitulo('Exercicio ...');
	
	    console.log(sys.getEntent('exercicio').objeto.codigo);
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
	                sys.config.apiURL + 'exercicio/img/'+exercicio.codigo+'?rand=' + Math.floor( Math.random() * 99)
	            );
	
	            
	        }
	    );
	
	}
},
"exercicio-lista":{
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
},
