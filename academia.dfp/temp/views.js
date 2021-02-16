"aluno-lista":{
	load:function(){
	    //sys.setTitulo('Alunos');
	
	    document.querySelector('.layer [name="pesquisa"]').onkeyup = function(){
	        sys.getView('aluno-lista').listar();
	    };
	
	    document.querySelector('.layer form').onsubmit = function(event){
	        event.preventDefault();
	        sys.getView('aluno-lista').listar();
	    };
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
	                    "eAluno.detalhe(" + aluno.codigo + ");"
	                );
	
	                lista.appendChild(clon);
	            });
	        }
	    );
	}
	
},
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
