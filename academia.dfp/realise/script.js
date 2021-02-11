var sys = {
    config:{
        apiURL:"http://localhost/dannke/academia/api/"
    },
    apiRequest: function(endpoint, data, acao) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                acao(myArr);
            }
        };
        xmlhttp.open("POST", sys.config.apiURL + endpoint, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(
            JSON.stringify(data)
        );
    },
	layerLoadContent:function(strLayer, strView){
		let layer = document.querySelector('.layer.'+strLayer);
		let view = document.querySelector('.template.'+strView);
		//console.log('.view .'+strView);

		if(layer == undefined) {
			console.log("sys.loadContent eror: layer '"+strLayer+"' não encontrada");
			return false;
		}
			
		if(view == undefined) {
			console.log("sys.loadContent eror: view '"+strView+"' não encontrada");
			return false;
		}
		
		layer.innerHTML = view.innerHTML;
		//Executar load
		sys.getView(strView).load();
	},
	getEntent:function(chave){
		var entidade = sys.entities[chave];
		if(typeof(entidade) == "undefined"){
			console.log("sys.getEntent error: Entidade '"+chave+"' desconhecido");
			return false;
		}
		return entidade;
	},
	getView:function(chave){
		var entidade = sys.views[chave];
		if(typeof(entidade) == "undefined"){
			console.log("sys.getView error: View '"+chave+"' desconhecida");
			return false;
		}
		return entidade;
	},
	load:function(){
	    sys.getEntent('sessao').logado(true);
	},
	menu:{
	    is_show:true,
	    hidden:function(){
	        document.querySelector('.menu').style.display = "none";
	        document.querySelector('.menu_base').style.display = "none";
	    },
	    show:function(){
	        document.querySelector('.menu').style.display = "block";
	        document.querySelector('.menu_base').style.display = "block";
	
	        //Detalhe do ultimo aluno visualizado
	        console.log(sys.entidades["aluno"].objeto.nome);
	        if (typeof(sys.entidades["aluno"].objeto.nome) == 'undefined') {
	            document.querySelector('.menu .subitem_alunodetalhe').style.display = "none";
	            return;
	        }
	        document.querySelector('.menu .subitem_alunodetalhe').style.display = "block";
	        document.querySelector('.menu .subitem_alunodetalhe .aluno').innerHTML = eAluno.objeto.nome;
	    }
	},
	entities:{
		
		"exercicio":{
			objeto:{},
			load:function(){
			    
			}
		},
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
			                return;
			            };
			
			            if(parainicio){
			                sys.layerLoadContent(
			                    "conteudo",
			                    sys.getEntent("sessao").paginaInicial["instrutor"]
			                );
			            }  
			            
			        }
			    );
			}
		},
	},
	views:{
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
			            } else {
			                document.querySelector('.layer .msg').innerHTML = data.msg;
			
			            }
			        }
			    );
			}
		},
		
	}
};
sys.load();