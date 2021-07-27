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
	        sys.cabecario.setTitulo('Editar aluno');
	        //Pegar os dados do aluno e colocar no formulario
	        sys.apiRequest(
	            'aluno/detalhe', { 'codigo': sys.getEntent('aluno').objeto.codigo },
	            function(data) {
	                sys.getEntent('aluno').objeto = data.detalhe;
	                
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
	
	    //
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
"aluno_perimetria-formulario":{
	load:function(operacao){
	    this.operacao = (operacao == 'editar')?'editar':'novo';
	
	    //No caso de estar editando
	    if(operacao == 'editar'){
	        sys.cabecario.setTitulo('Editar Perimetria');
	        sys.apiRequest(
	            'perimetria/detalhepordata', { 
	                'codigo': sys.getEntent('aluno').objeto.codigo,
	                'data': sys.getEntent('aluno-perimetria').objeto.data 
	            },
	            function(data) {
	                if (data.result != true) {
	                    ePagina.error(
	                        error.name,
	                        error.message + "\n" + this.responseText
	                    );
	                }
	
	                //sys.getEntent('aluno').objeto.codigo = data.detalhe;
	
	                document.querySelector('.layer .data').innerHTML = data.detalhe.data;
	                document.querySelector('.layer .torax').value = data.detalhe.torax;
	                document.querySelector('.layer .abdome').value = data.detalhe.abdome;
	                document.querySelector('.layer .quadril').value = data.detalhe.quadril;
	                document.querySelector('.layer .braco_direito').value = data.detalhe.braco_direito;
	                document.querySelector('.layer .braco_esquerdo').value = data.detalhe.braco_esquerdo;
	                document.querySelector('.layer .coxa_superior_direita').value = data.detalhe.coxa_superior_direita;
	                document.querySelector('.layer .coxa_superior_esquerda').value = data.detalhe.coxa_superior_esquerda;
	                document.querySelector('.layer .coxa_inferior_direita').value = data.detalhe.coxa_inferior_direita;
	                document.querySelector('.layer .coxa_inferior_esquerda').value = data.detalhe.coxa_inferior_esquerda;
	                document.querySelector('.layer .perna_direita').value = data.detalhe.perna_direita;
	                document.querySelector('.layer .perna_esquerda').value = data.detalhe.perna_esquerda;
	
	            }
	        );
	
	        return;
	    }
	
	    //No caso de estar registrando
	    sys.cabecario.setTitulo('Registrar Perimetria');
	    var data = new Date();
	    document.querySelector('.layer .data').innerHTML = data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear();
	},
	salvar:function(){
	    var data = new Date();
	    var strData = data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate();
	    sys.apiRequest(
	        (this.operacao == 'editar')?'perimetria/atualizarpordata':'perimetria/registrar',
	        { 
	            "aluno"                 :sys.getEntent('aluno').objeto.codigo,
	            "data"                  :strData,
	            "torax"                 :document.querySelector('.layer .torax').value,
	            "abdome"                :document.querySelector('.layer .abdome').value,
	            "quadril"               :document.querySelector('.layer .quadril').value,
	            "braco_direito"         :document.querySelector('.layer .braco_direito').value,
	            "braco_esquerdo"        :document.querySelector('.layer .braco_esquerdo').value,
	            "coxa_superior_direita" :document.querySelector('.layer .coxa_superior_direita').value,
	            "coxa_superior_esquerda":document.querySelector('.layer .coxa_superior_esquerda').value,
	            "coxa_inferior_direita" :document.querySelector('.layer .coxa_inferior_direita').value,
	            "coxa_inferior_esquerda":document.querySelector('.layer .coxa_inferior_esquerda').value,
	            "perna_direita"         :document.querySelector('.layer .perna_direita').value,
	            "perna_esquerda"        :document.querySelector('.layer .perna_esquerda').value
	        },
	        function(resposta) {
	            if(resposta.result != true){
	                console.log('Erro!');
	                return;
	            }
	            sys.getEntent('aluno-perimetria').detalhe(resposta.data);
	        }
	        
	    );
	}
},
"aluno_perimetria-lista":{
	load:function(){
	    //
	    sys.cabecario.setTitulo('Registros de perimetria');
	
	    //Carregar aluno
	
	    //
	    this.listar();
	},
	
	listar:function(){
	    sys.apiRequest(
	        'perimetria/lista', {
	            'aluno':sys.getEntent('aluno').objeto.codigo
	        },
	        function(data) {
	            var lista = document.querySelector(".layer .lista");
	            if (data.result != true) {
	                lista.innerHTML = data.msg;
	                return;
	            }
	
	            
	            lista.innerHTML = '';
	
	            data.lista.forEach(function(registro, i) {
	                
	                var temp = document.querySelector(".layer .tem_item");
	                var clon = temp.content.cloneNode(true);
	
	                clon.querySelector('.perimetria').innerHTML = registro.data;
	
	                clon.querySelector('.perimetria').setAttribute(
	                    'onclick',
	                    "sys.getEntent('aluno_perimetria').detalhe(" + registro.data + ");"
	                );
	
	                lista.appendChild(clon);
	                
	            });
	        }
	    );
	}
	
},
"aluno_perimetria-detalhe":{
	load:function(aluno){
	    aluno = (aluno!= undefined)?aluno:sys.getEntent('aluno').objeto.codigo;
	    sys.cabecario.setTitulo('Perimetria');
	    sys.apiRequest(
	        'perimetria/detalhepordata', { 'aluno': aluno },
	        function(data) {
	            if (data.result != true) {
	                //Remover a data ateriormnete salva
	                sys.getEntent('aluno_perimetria').objeto = undefined;
	
	                //Mostrar mensagem da api
	                document.querySelector('.layer .data').innerHTML = data.msg;
	
	                //Ocultar botão de editar
	                document.querySelector('.layer .btn_editar').style.display = 'none';
	
	                //
	                return;
	            }
	
	            sys.getEntent('aluno_perimetria').objeto = data.detalhe;
	
	            document.querySelector('.layer .data').innerHTML = data.detalhe.data;
	            document.querySelector('.layer .torax').innerHTML = data.detalhe.torax;
	            document.querySelector('.layer .abdome').innerHTML = data.detalhe.abdome;
	            document.querySelector('.layer .quadril').innerHTML = data.detalhe.quadril;
	            document.querySelector('.layer .braco_direito').innerHTML = data.detalhe.braco_direito;
	            document.querySelector('.layer .braco_esquerdo').innerHTML = data.detalhe.braco_esquerdo;
	            document.querySelector('.layer .coxa_superior_direita').innerHTML = data.detalhe.coxa_superior_direita;
	            document.querySelector('.layer .coxa_superior_esquerda').innerHTML = data.detalhe.coxa_superior_esquerda;
	            document.querySelector('.layer .coxa_inferior_direita').innerHTML = data.detalhe.coxa_inferior_direita;
	            document.querySelector('.layer .coxa_inferior_esquerda').innerHTML = data.detalhe.coxa_inferior_esquerda;
	            document.querySelector('.layer .perna_direita').innerHTML = data.detalhe.perna_direita;
	            document.querySelector('.layer .perna_esquerda').innerHTML = data.detalhe.perna_esquerda;
	
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
"aluno_treinamento-exercicioformulario":{
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
"aluno_treinamento-detalhe":{
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
"exercicio-formulario":{
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
	
	
},
"exercicio-lista":{
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
},
"exercicio-detalhe":{
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
},
"treinamento-formulario":{
	operacao:'novo',
	load: function(operacao) {
	    //Limpar msg
	    document.querySelector('.layer .msg').innerHTML = '';
	
	    //Verificar a operação a ser feita pelo formulario
	    this.operacao = (operacao == 'editar')?'editar':'novo';
	
	    //Carregar os dados do trienamento
	    if(operacao == 'editar'){
	        this.operacao = 'editar';
	        sys.cabecario.setTitulo('Treinamento');
	        document.querySelector('.layer .msg').innerHTML = 'Carregando...';
	
	        //Pegar os dados do aluno e colocar no formulario
	        sys.apiRequest(
	            'treinamento/detalhe', { 'codigo': sys.getEntent('treinamento').objeto.codigo },
	            function(data) {
	                if(data.result != true){
	                    document.querySelector('.layer .msg').innerHTML = data.msg;
	                    return;
	                }
	                document.querySelector('.layer .msg').innerHTML = '';
	                
	
	                sys.getEntent('treinamento').objeto = data.detalhe;
	                sys.cabecario.setTitulo('Treinamento ' + data.detalhe.nome);
	                
	                document.querySelector('.layer [name="nome"]').value = data.detalhe.nome;
	                document.querySelector('.layer [name="dias"]').value = data.detalhe.ciclo;
	                document.querySelector('.layer [name="descricao"]').innerHTML = data.detalhe.descricao;
	            }
	            
	        );
	
	        
	        return;
	    }
	
	    //Apenas em caso de novo trienamento
	    sys.cabecario.setTitulo('Novo treinamento');
	},
	
	salvar:function(){
	    document.querySelector('.layer .msg').innerHTML = 'Salvando...';
	    sys.apiRequest(
	        (sys.getView('treinamento-formulario').operacao == 'editar')?'treinamento/atualizar':'treinamento/adicionar',
	        {
	            'codigo':sys.getEntent('treinamento').objeto.codigo,
	            'nome':document.querySelector('.layer [name="nome"]').value,
	            'descricao':document.querySelector('.layer [name="descricao"]').value,
	            'ciclo':document.querySelector('.layer [name="dias"]').value,
	            'situacao':document.querySelector('.layer [name="situacao"]').value
	        },function(data){
	            if(data.result != true){
	                document.querySelector('.layer .msg').innerHTML = data.msg;
	                return;
	            }
	            sys.getEntent('treinamento').detalhe(data.codigo);
	        }
	    );
	},
	
	cancelar:function(){
	    if(this.operacao == 'editar'){
	        sys.getEntent('treinamento').detalhe(
	            sys.getEntent('treinamento').objeto.codigo
	        );
	        return;
	    }
	
	    sys.getEntent('treinamento').lista();
	}
	
	
},
"treinamento-exercicioformulario":{
	load: function(operacao) {
	    sys.cabecario.setTitulo('Treinamento exercicio');
	    //Verificar a operação a ser feita pelo formulario
	    //this.operacao = (operacao == 'editar')?'editar':'novo';
	
	    //Carregar os dados do exercicio
	    if(operacao == 'editar'){
	        this.operacao = 'editar';
	        this.carregarBase();
	        return;
	    }
	
	    if(operacao == 'exerciciolista_retorno'){
	        //Se estiver editarndo um exercicio
	        if(sys.getEntent('treinamento').exercicio.codigo != null){
	            operacao='editar';
	            this.carregarBase();
	            this.carregarExtrangeiro();
	        }else{
	            operacao='novo';
	            this.carregarExtrangeiro();
	            document.querySelector('.layer .btnremover').style.display = 'none';
	        }
	        this.operacao = operacao;
	        return;
	    }
	
	    //Novo exercicio, caso nenhuma operação seja reconhecida
	    sys.getEntent('treinamento').exercicio.codigo = null;
	    document.querySelector('.layer .btnremover').style.display = 'none';
	    //...
	},
	salvar:function(){
	    if(!sys.getEntent('exercicio').objeto.codigo){
	        return;
	    }
	    sys.apiRequest(
	        'treinamentoexercicio/' + (this.operacao == 'editar'?'atualizar':'adicionar'),
	        {
	            'codigo':sys.getEntent('treinamento').exercicio.codigo,
	            'treinamento':sys.getEntent('treinamento').objeto.codigo,
	            'exercicio':sys.getEntent('exercicio').objeto.codigo,
	            'ciclo':document.querySelector('.layer [name="ciclo"]').value,
	            'sequencia':document.querySelector('.layer [name="ordem"]').value,
	            'duracao':document.querySelector('.layer [name="duracao"]').value,
	            'duracao_tipo':document.querySelector('.layer [name="duracao_tipo"]').value
	        },function(data){
	            sys.getEntent('treinamento').detalhe(sys.getEntent('treinamento').objeto.codigo);
	        }
	    );
	},
	
	cancelar:function(){
	    sys.getEntent('treinamento').detalhe(
	        sys.getEntent('treinamento').objeto.codigo
	    );
	},
	
	exercicioSelecionar: function(){
	    var data = new Object;
	    
	    data.acao = 'selecionar';
	    data.titulo = 'Selecionar exercicio do treinamento';
	    data.retorno = 'treinamento-exercicioformulario';
	    
	    sys.getEntent('exercicio').selecionar(data);
	},
	
	carregarBase:function(){
	    console.log('carregarBase');
	    sys.apiRequest(
	        'treinamentoexercicio/detalhe', { 'codigo': sys.getEntent('treinamento').exercicio.codigo },
	        function(data) {
	            sys.getEntent('treinamento').exercicio = data.detalhe;
	            sys.getEntent('exercicio').objeto.exercicio = data.detalhe.exercicio;
	            
	            //Dados do exercicio
	            document.querySelector('.layer .exercicio_nome').innerHTML = data.detalhe.exercicio_nome;
	            document.querySelector('.layer .exercicio_descricao').innerHTML = data.detalhe.exercicio_descricao;
	            
	            document.querySelector('.layer img').setAttribute(
	                'src', 
	                sys.config.apiURL + 'exercicio/img/'+data.detalhe.exercicio+'?u_' + sys.updatecount
	            );
	
	            //dados do treienamentoexercicio
	            document.querySelector('.layer [name="ciclo"').value = data.detalhe.ciclo;
	            document.querySelector('.layer [name="ordem"').value = data.detalhe.sequencia;
	            document.querySelector('.layer [name="duracao"').value = data.detalhe.duracao;
	            document.querySelector('.layer [name="duracao_tipo"').value = data.detalhe.duracao_tipo;
	
	        }
	        
	    );
	},
	carregarExtrangeiro:function(){
	    console.log('carregarExtrangeiro');
	    sys.apiRequest(
	        'exercicio/detalhe', { 'codigo': sys.getEntent('exercicio').objeto.codigo },
	        function(data) {
	          
	            //Dados do exercicio
	            document.querySelector('.layer .exercicio_nome').innerHTML = data.detalhe.nome;
	            document.querySelector('.layer .exercicio_descricao').innerHTML = data.detalhe.descricao;
	            
	            document.querySelector('.layer img').setAttribute(
	                'src', 
	                sys.config.apiURL + 'exercicio/img/'+data.detalhe.codigo+'?u_' + sys.updatecount
	            );
	        }
	        
	    );
	},
	remover:function(){
	    sys.apiRequest(
	        'treinamentoexercicio/remover',
	        {
	            'codigo':sys.getEntent('treinamento').exercicio.codigo,
	        },function(data){
	            sys.getEntent('treinamento').detalhe(
	                sys.getEntent('treinamento').objeto.codigo
	            );
	        }
	    );
	}
	
	
	
},
"treinamento-lista":{
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
},
"treinamento-detalhe":{
	load: function() {
	    sys.cabecario.setTitulo('Treinamento ...');
	
	    sys.apiRequest(
	        'treinamento/detalhe',
	        {'codigo':sys.getEntent('treinamento').objeto.codigo},
	        function(data){
	           
	            var treinamento = data.detalhe;
	            sys.getEntent('treinamento').objeto = treinamento;
	
	            sys.cabecario.setTitulo('Treinamento ' + treinamento.nome);
	           
	            //Cabecario
	            document.querySelector('.layer .nome').innerHTML = treinamento.nome;
	            document.querySelector('.layer .descricao').innerHTML = treinamento.descricao;
	            document.querySelector('.layer .dias').innerHTML = treinamento.ciclo;
	            document.querySelector('.layer .situacao').innerHTML = treinamento.situacao;
	
	            //Exercicios
	            var lista = document.querySelector('.layer .exercicios');
	            var t = document.querySelector('.layer .tem_exercicio');
	            var tCiclo = document.querySelector('.layer .tem_ciclo');
	            var tMsg = document.querySelector('.layer .tem_msg');
	
	            for (let iCiclo = 0; iCiclo < Object.keys(treinamento.ciclos).length; iCiclo++) {
	                //acicionar cabeçario
	                var clon = tCiclo.content.cloneNode(true);
	                clon.querySelector('.valor').innerHTML =  Object.keys(treinamento.ciclos)[iCiclo];
	                lista.appendChild(clon);
	
	                var ciclo = treinamento.ciclos[Object.keys(treinamento.ciclos)[iCiclo]];
	
	                //Adicionar exercicios
	                for (let iExercicio = 0; iExercicio < ciclo.length; iExercicio++) {
	                    var exercicio = ciclo[iExercicio];
	
	                    var clon = t.content.cloneNode(true);
	
	                    clon.querySelector('.sequencia').innerHTML = exercicio.sequencia;
	                    clon.querySelector('.exercicio_nome').innerHTML = exercicio.exercicio_nome;
	                    clon.querySelector('.exercicio_descricao').innerHTML = exercicio.descricao;
	                    clon.querySelector('.duracao').innerHTML = exercicio.duracao;
	                    clon.querySelector('.duracao_tipo').innerHTML = exercicio.duracao_tipo;
	                    
	                
	                    clon.querySelector('.editar').setAttribute(
	                        'onclick',
	                        "sys.getView('treinamento-detalhe').exercicioEditar("+exercicio.codigo+");"
	                    );
	                
	
	                    lista.appendChild(clon);
	                    
	                }
	
	                //Se não tiver exercicio nesse ciclo
	                if ( ciclo.length < 1) {
	                    var clon = tMsg.content.cloneNode(true);
	                    clon.querySelector('.msg').innerHTML =  'Nenhum exercicio para esse dia';
	                    lista.appendChild(clon);
	                }
	
	                
	            }
	
	            
	        }
	    );
	
	},
	editar:function(){
	    sys.layerLoadContent('conteudo','treinamento-formularioexercicio', 'editar');
	},
	
	/* Exercicio */
	exercicioEditar:function(codigo){
	    sys.getEntent('treinamento').exercicio.codigo = codigo;
	    sys.layerLoadContent('conteudo','treinamento-exercicioformulario', 'editar');
	},
	exercicioAdicionar:function(codigo){
	    sys.layerLoadContent('conteudo','treinamento-exercicioformulario', 'novo');
	}
	
},
"treinamento-formularioexercicio":{
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
	                    sys.config.apiURL + 'exercicio/img/'+data.detalhe.codigo+'?rand=' + Math.floor( Math.random() * 99)
	                );
	            }
	            
	        );
	    }
	},
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
	  
	    sys.apiRequest(
	        (sys.getView('exercicio-formulario').operacao == 'editar')?'exercicio/atualizar':'exercicio/adicionar',
	        {
	            'codigo':sys.getEntent('exercicio').objeto.codigo,
	            'nome':document.querySelector('.layer [name="nome"]').value,
	            'descricao':document.querySelector('.layer [name="nome"]').value,
	            'ciclo':document.querySelector('.layer [name="nome"]').value
	        },function(data){
	
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
	
	
},
