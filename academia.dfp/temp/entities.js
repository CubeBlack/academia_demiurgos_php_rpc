
"sessao":{
	objeto:{"sessao_chave":""},
	paginaInicial:{
	    "suporte":"aluno-lista",
	    "aluno":"exercicio-hoje",
	    "instrutor":"aluno-lista"
	},
	logado:function(parainicio=false){
	    sys.apiRequest(
	        "usuariosessao/detalhe",
	        {"sessao_chave":sys.getEntent("sessao").objeto.sessao_chave},
	        function(resultado){
	            
	            if(resultado.result != true){
	                sys.layerLoadContent("conteudo","sessao-login");
	                sys.cabecario.hidden();
	                return;
	            };
	
	            if(parainicio){
	                sys.layerLoadContent(
	                    "conteudo",
	                    sys.getEntent("sessao").paginaInicial["instrutor"]
	                );
	                sys.cabecario.show();
	            }  
	            
	        }
	    );
	}
},
"aluno_anamnese":{
	objeto:{"sessao_chave":""}
},
"aluno":{
	objeto:{"codigo":""},
	detalhe:function(codigo){
	    this.objeto.codigo = codigo;
	    sys.layerLoadContent("conteudo",'aluno-detalhe');
	},
	novo:function(){
	    sys.layerLoadContent("conteudo",'aluno-formulario', 'novo');
	},
	editar:function(){
	    sys.layerLoadContent("conteudo",'aluno-formulario', 'editar');
	},
	perimetria:function(){
	    sys.layerLoadContent("conteudo",'aluno-perimetria');
	},
	treinamento:function(){
	    sys.layerLoadContent("conteudo",'aluno-perimetria');
	},
	anamnese:function(){
	    sys.layerLoadContent("conteudo",'aluno_anamnese-detalhe');
	}
},
"exercicio":{
	objeto:{codigo:null},
	load:function(){
	    
	},
	
	detalhe:function(codigo){
	    this.objeto.codigo = codigo;
	    sys.layerLoadContent('conteudo','exercicio-detalhe');
	},
	
	editar:function(){
	    sys.layerLoadContent('conteudo','exercicio-formulario', 'editar');
	}
},