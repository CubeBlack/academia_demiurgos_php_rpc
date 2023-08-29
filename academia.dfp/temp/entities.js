
"sessao":{
	objeto:{"sessao_chave":""},
	paginaInicial:{
	    "suporte":"aluno-lista",
	    "aluno":"exercicio-hoje",
	    "instrutor":"aluno-lista"
	},
	logado:function(parainicio=false){
	    if(!sys.getEntent("sessao").objeto){
	        sys.layerLoadContent("conteudo","sessao-login");
	        sys.cabecario.hidden();
	        return;
	    }
	
	    sys.apiRequest(
	        "usuariosessao/detalhe",
	        {"sessao_chave":sys.getEntent("sessao").objeto.chave},
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
	},
	anterior:function(){
	    var sString = sessionStorage.getItem('sessao_objeto');
	    //console.log(sString);
	    if(typeof sString != 'string'){
	        //console.log('não é string');
	        return;
	    }
	
	    var sObjeto = JSON.parse(sString);
	    if(sObjeto == null){
	       // console.log('Sessao nula');
	        return;
	    }
	
	    sys.getEntent("sessao").objeto = sObjeto;
	
	    return;
	},
	sair:function(){
	    sessionStorage.setItem('sessao_objeto',null);
	    sys.getEntent("sessao").objeto = null;
	    this.logado(false);
	    sys.menu.hidden();
	}
},
"aluno_perimetria":{
	objeto:{"codigo":""},
	detalhe:function(data){
	    sys.layerLoadContent("conteudo",'aluno_perimetria-detalhe', data);
	},
	editar:function(){
	    sys.layerLoadContent("conteudo",'aluno_perimetria-formulario', 'editar');
	},
	registrar:function(){
	    sys.layerLoadContent("conteudo",'aluno_perimetria-formulario', 'novo');
	},
	listar:function(){
	    sys.layerLoadContent("conteudo",'aluno_perimetria-lista');
	}
},
"aluno":{
	objeto:{"codigo":""},
	lista:function(){
	    sys.layerLoadContent("conteudo",'aluno-lista');
	},
	detalhe:function(codigo){
	    this.objeto.codigo = codigo!=undefined?codigo:sys.getEntent('aluno').objeto.codigo;
	    sys.layerLoadContent("conteudo",'aluno-detalhe');
	},
	novo:function(){
	    sys.layerLoadContent("conteudo",'aluno-formulario', 'novo');
	},
	editar:function(){
	    sys.layerLoadContent("conteudo",'aluno-formulario', 'editar');
	},
	perimetria:function(){
	    sys.layerLoadContent("conteudo",'aluno_perimetria-detalhe');
	},
	treinamento:function(){
	    sys.layerLoadContent("conteudo",'aluno_treinamento-detalhe');
	},
	anamnese:function(){
	    sys.layerLoadContent("conteudo",'aluno_anamnese-detalhe');
	}
},
"aluno_anamnese":{
	objeto:{"sessao_chave":""}
},
"aluno_treinamento":{
	objeto:{"codigo":""}
},
"exercicio":{
	objeto:{codigo:null},
	load:function(){
	    
	},
	
	lista:function(){
	    sys.layerLoadContent('conteudo','exercicio-lista', 'listar');
	},
	selecionar:function(data){
	    data.acao = 'selecionar';
	    sys.layerLoadContent(
	        'conteudo',
	        'exercicio-lista', 
	        data
	    );
	},
	
	detalhe:function(codigo){
	    this.objeto.codigo = codigo;
	    sys.layerLoadContent('conteudo','exercicio-detalhe');
	},
	
	editar:function(){
	    sys.layerLoadContent('conteudo','exercicio-formulario', 'editar');
	},
	
	adicionar:function(){
	    sys.layerLoadContent('conteudo','exercicio-formulario', 'novo');
	}
	
},
"treinamento":{
	objeto:{codigo:null},
	exercicio:{codigo:null},
	
	
	load:function(){
	    
	},
	
	lista:function(){
	    sys.layerLoadContent('conteudo','treinamento-lista');
	},
	
	detalhe:function(codigo){
	    this.objeto.codigo = codigo;
	    sys.layerLoadContent('conteudo','treinamento-detalhe');
	},
	
	adicionar:function(){
	    sys.layerLoadContent('conteudo','treinamento-formulario', 'novo');
	},
	
	editar:function(){
	    sys.layerLoadContent('conteudo','treinamento-formulario', 'editar');
	}
	
},