var config = {
    api_url: window.location.protocol + '//' + window.location.hostname + "/dannke/academia/api/",
    pagina_inicio: 'treinamento/hoje'
}

//console.log(config.api_url);

function apiRequest(endpoint, data, acao) {
    let xhr = new XMLHttpRequest();
    //Enviar credenciais??
    //xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            //console.log(this.responseText);
            //alert(this.responseText);
            //action(this.responseText);
            try {
                acao(JSON.parse(this.responseText));
            } catch (error) {
                //action(http.responseText);
                ePagina.error(
                    error.name,
                    error.message + "\n" + this.responseText
                );
            }
        }
    });

    xhr.open("POST", config.api_url + endpoint);
    xhr.setRequestHeader("Content-Type", "text/plain");
    data.sessao_chave = eSessao.objeto.chave;

    xhr.send(JSON.stringify(data));
}

var ePagina = {
    time_sys: null,
    time_page: null,
    para: function(paginaNome, menu = true) {
        //console.log(paginaNome);
        var paginas = document.querySelectorAll(".pagina");
        ePagina.menuHidden();
        ePagina.setTitulo(paginaNome);

        for (var i = 0; i < paginas.length; i++) {
            paginas[i].style.display = "none";
        }

        var pagina = document.querySelector(".pagina_" + paginaNome);

        if (pagina == null) {
            ePagina.error(
                'Pagina"' + paginaNome + '"',
                'Pagina não encontrada'
            )
            return;
        }

        //Mudar a url
        //window.location.href = window.location.href + paginaNome;

        document.querySelector(".pagina_" + paginaNome).style.display = "block";

        if (!menu) {
            //document.querySelector('.menu').style.display = "none";
            document.querySelector('.conteudo > .header').style.display = "none";
        } else {
            //document.querySelector('.menu').style.display = "block";
            document.querySelector('.conteudo > .header').style.display = "block";
        }
    },
    url: function(url) {
        //tratar inicio
        if (url == 'inicio') {
            url = config.pagina_inicio;
        }


        //Tratar partes
        var partes = url.split('/');
        if (partes.length != 2) {
            console.log(
                'ePagina.url',
                'url com quantidade indevida de partes',
                'url:"' + url + '" ,quantidade:' + partes.length
            );
        }

        //Tratar objeto
        var objetoNome = partes[0];
        objetoNome = 'e' + objetoNome[0].toUpperCase() + objetoNome.substr(1);
        var objeto = window[objetoNome];

        if (objeto == undefined) {
            /*
            console.log(
                'ePagina.url',
                'Objeto desconhecido',
                'objetoNome:"' + objetoNome + '" ,quantidade:' + partes.length
            );
            */
            ePagina.error(
                '404',
                'A nó da url "' + url + '" não encontrado.'
            );
            return;
        }

        //Tratar função
        var funcaoNome = partes[1];
        funcaoNome = 'p' + funcaoNome[0].toUpperCase() + funcaoNome.substr(1);
        var funcao = objeto[funcaoNome];

        if (typeof(funcao) != 'function') {
            /*
            console.log(
                'ePagina.url',
                'Funcao desconhecida:',
                'objetoNome: "' + objetoNome + '", ' +
                'funcaoNome: "' + funcaoNome + '"'
            );
            */
            ePagina.error(
                '404',
                'A pagina "' + url + '" não encontrada'
            );
            return;
        }

        funcao();

    },
    inicio: function() {
        if (ePagina.time_sys == null)
            ePagina.time_sys = window.setInterval(ePagina.time_sys_acao, 2000);

        ePagina.url(eSys.pagina_inicio);
        /*
        if (eSessao.objeto.tipo == 'aluno') {
            eTreinamento.hoje();
        } else if (data.detalhe.tipo == 'instrutor') {
            eUsuario.alunos();
        } else {

        }
        */
    },
    error: function(titulo, msg = "") {
        ePagina.para('error');
        document.querySelector('.pagina_error .titulo').innerHTML = titulo;
        document.querySelector('.pagina_error .msg').innerHTML = msg;
    },
    menuShow: function() {
        document.querySelector('.menu').style.display = "block";
        document.querySelector('.menu_base').style.display = "block";

        //Detalhe do ultimo aluno visualizado
        console.log(eAluno.objeto.nome);
        if (typeof(eAluno.objeto.nome) == 'undefined') {
            document.querySelector('.menu .subitem_alunodetalhe').style.display = "none";
            return;

        }
        document.querySelector('.menu .subitem_alunodetalhe').style.display = "block";
        document.querySelector('.menu .subitem_alunodetalhe .aluno').innerHTML = eAluno.objeto.nome;
    },
    menuHidden: function() {
        document.querySelector('.menu').style.display = "none";
        document.querySelector('.menu_base').style.display = "none";
    },
    time_sys_acao: function() {
        eSessao.verificar();
    },
    setTitulo: function(titulo) {
        document.querySelector('.header .titulo').innerHTML = titulo.substr(0, 29);
    }
}

var eSys = {
    error: function(titulo, msg = "") {
        ePagina.para('error');
        document.querySelector('.pagina_error .titulo').innerHTML = titulo;
        document.querySelector('.pagina_error .msg').innerHTML = msg;
    }
};

var eSessao = {
    objeto: { result: false },
    pLogin: function() {
        //Lipar para não ficar verificando o login
        clearTimeout(ePagina.time_sys);

        ePagina.para('login', false);

        document.querySelector('.pagina_login form').addEventListener('submit', function(event) {
            event.preventDefault();
            eSessao.logar();
        });
    },
    logar: function() {
        document.querySelector('.pagina_login .msg').innerHTML = 'Altenticando...';
        apiRequest(
            'usuariosessao/adicionar', {
                "usuario": document.querySelector(".pagina_login .usuario").value,
                "senha": document.querySelector(".pagina_login .senha").value
            },
            function(data) {
                if (data.result == true) {
                    sessionStorage.setItem(
                        'sessao_objeto',
                        JSON.stringify(data.detalhe)
                    );
                    eSessao.objeto = data.detalhe;
                    document.querySelector('.pagina_login .msg').innerHTML = 'Login efetuado com sucesso. Aguarde';
                    document.querySelector('.menu .' + data.detalhe.tipo).style.display = 'block';
                    ePagina.inicio();

                } else {
                    document.querySelector('.pagina_login .msg').innerHTML = data.msg;

                }
            }
        );
    },
    verificar: function() {
        apiRequest(
            'usuariosessao/detalhe', {},
            function(data) {
                if (data.result == true) {
                    //faz nada, ou atualiza permicões
                } else {
                    eSessao.login();
                }
            }
        );
    },
    sair: function() {
        apiRequest(
            'usuariosessao/sair', {},
            function() {
                eSessao.objeto = null;
                sessionStorage.clear();
                eSessao.login();
            }
        );

    }
}

var eTreinamento = {
	objeto:{},
	/*
    pHoje: function() {
        ePagina.para('treinamento_hoje');
        ePagina.setTitulo('Treinamento de hoje');
        apiRequest(
            'treinamento/hoje', {},
            function(data) {
                var lista = document.querySelector(".pagina_treinamento_hoje .lista_execicios");
                if (data.result != true) {
                    lista.innerHTML = data.msg;

                    return;
                }
                //console.log(data.detalhe.exercios);

                var temp = document.querySelector(".pagina_treinamento_hoje .tem_exercicio");


                data.detalhe.exercios.forEach(function(exercicio, i) {
                    var clon = temp.content.cloneNode(true);
                    clon.querySelector('.nome').innerHTML = exercicio.nome;
                    clon.querySelector('.execucao').innerHTML = exercicio.execucao;
                    clon.querySelector('.execucao_tipo').innerHTML = exercicio.execucao_tipo;

                    clon.querySelector('.exercicio_compacto')
                        .setAttribute('codigo', exercicio.codigo);

                    clon.querySelector('.exercicio')
                        .setAttribute('codigo', exercicio.codigo);

                    clon.querySelector('.detalhe').setAttribute(
                        'onclick',
                        "eTreinamento.exercicioDetalhe(" + exercicio.codigo + ");"
                    );

                    clon.querySelector('.compactar').setAttribute(
                        'onclick',
                        "eTreinamento.exercicioCompacto(" + exercicio.codigo + ");"
                    );

                    lista.appendChild(clon);

                    if (i == 0) {
                        eTreinamento.exercicioDetalhe(data.detalhe.exercios[0].codigo);
                    }
                });




            });
        //lista.appendChild(clon);
    },

    exercicioDetalhe: function(codigo) {
		
        document.querySelector('.pagina_treinamento_hoje .exercicio[codigo="' + codigo + '"]')
            .style.display = 'block';

        document.querySelector('.pagina_treinamento_hoje .exercicio_compacto[codigo="' + codigo + '"] ')
            .style.display = 'none';
    },
    exercicioCompacto: function(codigo) {
        document.querySelector('.pagina_treinamento_hoje .exercicio[codigo="' + codigo + '"]')
            .style.display = 'none';

        document.querySelector('.pagina_treinamento_hoje .exercicio_compacto[codigo="' + codigo + '"]')
            .style.display = 'grid';
    },
    
*/
    pDetalhe: function() {
        ePagina.setTitulo('Treinamento ...');
        document.querySelector('.pagina_treinamento_detalhe .msg').innerHTML = '';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_detalhe').style.display = 'block';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_form').style.display = 'none';
		
		//Limpar view
        document.querySelector('.pagina_treinamento_detalhe .cabecario_detalhe .dias').innerHTML = '...';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_detalhe .nome').innerHTML = '...';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_detalhe .descricao').innerHTML = '...';

		ePagina.para('treinamento_detalhe');

        apiRequest(
            'treinamento/detalhe', { 'codigo': eTreinamento.objeto.codigo },
            function(data) {
                var pg = document.querySelector('.pagina_treinamento_detalhe');

                if (data.result != true) {
                    ePagina.error(
                        'Treinamento detalhe',
                        data.msg
                    );
					return;
                }
				//
				ePagina.setTitulo('Treinamento ' + data.detalhe.nome);				

                //Tratar cabecario
                pg.querySelector('.cabecario_detalhe').style.display = 'block';
                pg.querySelector('.exercicios').style.display = 'block';

                pg.querySelector('.cabecario_detalhe .dias').innerHTML = data.detalhe.ciclo;
                pg.querySelector('.cabecario_detalhe .nome').innerHTML = data.detalhe.nome;
                pg.querySelector('.cabecario_detalhe .descricao').innerHTML = data.detalhe.descricao;

				pg.querySelector('.cabecario_form [name="nome"]').value = data.detalhe.nome;
				pg.querySelector('.cabecario_form [name="dias"]').value = data.detalhe.ciclo;
				pg.querySelector('.cabecario_form [name="descricao"]').value = data.detalhe.descricao;
								

                //Listar exercicios
                document.querySelector(".pagina_treinamento_detalhe .exercicios").innerHTML = '';
                let diaAnterior = '';

				if(data.detalhe.exercicios.length < 1){
					document.querySelector(".pagina_treinamento_detalhe .exercicios").innerHTML = 'Nenum Exercicio encontrado';
					return;
				}

                data.detalhe.exercicios.forEach(function(exercicio, i) {
					
                    //Colocar linha de dia
                    if (diaAnterior != exercicio.ciclo) {
                        var temp = document.querySelector(".pagina_treinamento_detalhe .tem_dia");
                        var clon = temp.content.cloneNode(true);
                        clon.querySelector('.dia .dia').innerHTML = exercicio.ciclo;
                        document.querySelector(".pagina_treinamento_detalhe .exercicios").appendChild(clon);
                    }
					

                    diaAnterior = exercicio.ciclo;

                    var temp = document.querySelector(".pagina_treinamento_detalhe .tem_exercicio");
                    var clon = temp.content.cloneNode(true);

                    //Editar
                    //clon.querySelector('.edit [name="nome"]').innerHTML = exercicio.nome;
					

                    //Visualizar
                    clon.querySelector('.view .sequencia').innerHTML = exercicio.sequencia;
                    clon.querySelector('.view .exercicio_nome').innerHTML = exercicio.exercicio_nome;
                    clon.querySelector('.view .descricao').innerHTML = exercicio.descricao;
                    clon.querySelector('.view .duracao').innerHTML = exercicio.duracao;
                    clon.querySelector('.view .duracao_tipo').innerHTML = exercicio.duracao_tipo;

                    //concluir
                    document.querySelector(".pagina_treinamento_detalhe .exercicios").appendChild(clon);
                });

            }
        );
	},
    detalhe: function(codigo) {
        eTreinamento.objeto.codigo = codigo;
        eTreinamento.pDetalhe();
    },
	detalhe_cabecarioeditar:function(){
        document.querySelector('.pagina_treinamento_detalhe .msg').innerHTML = '';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_detalhe').style.display = 'none';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_form').style.display = 'block';
	
		document.querySelector('.pagina_treinamento_detalhe .cabecario_form').onsubmit = function(event)	{
			event.preventDefault();
			eTreinamento.detalhe_cabecariosalvar();

		};
	},
	detalhe_cabecariosalvar:function(){
		let pg = document.querySelector('.pagina_treinamento_detalhe');

        document.querySelector('.pagina_treinamento_detalhe .msg').innerHTML = 'Salvando...';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_detalhe').style.display = 'none';
        document.querySelector('.pagina_treinamento_detalhe .cabecario_form').style.display = 'block';

        apiRequest(
            'treinamento/atualizar', {
				"codigo":eTreinamento.objeto.codigo,
				"nome":pg.querySelector('.cabecario_form [name="nome"]').value,
				"ciclo":pg.querySelector('.cabecario_form [name="dias"]').value,
				"descricao":pg.querySelector('.cabecario_form [name="descricao"]').value
			},
            function(data) {
				let pg = document.querySelector('.pagina_treinamento_detalhe');

                if (data.result != true) {
					document.querySelector('.pagina_treinamento_detalhe .msg').innerHTML = data.msg;
					return;
                }
				
				eTreinamento.detalhe(eTreinamento.objeto.codigo);
            }
        );
	},

    pLista: function() {
        ePagina.para('treinamento_lista');
        ePagina.setTitulo('Treinamentos');

		document.querySelector('.pagina_treinamento_lista [name="pesquisa"]').onkeyup = function(){
			eTreianemto.listar();
		};

		document.querySelector('.pagina_treinamento_lista form').onsubmit = function(event){
			event.preventDefault();
			eTreianemto.listar();
		};

		eTreinamento.listar();

    },
	listar:function(){
        apiRequest(
            'treinamento/listar', {'pesquisa':document.querySelector('.pagina_treinamento_lista [name="pesquisa"]').value},
            function(data) {

                var lista = document.querySelector(".pagina_treinamento_lista .treinamentos");
				lista.innerHTML = '';

                if (data.result != true) {
                    lista.innerHTML = data.msg;
                    return;
                }


                data.lista.forEach(function(treinamento, i) {
                    var temp = document.querySelector(".pagina_treinamento_lista .tem_treinamento");
                    var clon = temp.content.cloneNode(true);

                    clon.querySelector('.nome').innerHTML = treinamento.nome;
                    clon.querySelector('.descricao').innerHTML = treinamento.descricao;


                    clon.querySelector('.treinamento').setAttribute(
                        'onclick',
                        "eTreinamento.detalhe(" + treinamento.codigo + ");"
                    );

                    lista.appendChild(clon);
                });
            }
        );
	},

    pAdicionar: function() {
        eTreinamento.para('treinamento_adicionar');
        eTreinamento.setTitulo('Novo Treinamento');

		document.querySelector('.pagina_treinamento_adicionar form').onsubmit = function(event) {
            event.preventDefault();
            eAluno.adicionar();
        };
    },
    adicionar: function() {
        //Validar
        if (document.querySelector('.pagina_treinamento_adicionar [name="nome"]').value == '') {
            document.querySelector('.pagina_treinamento_adicionar [name="nome"]').style.boxShadow = '5px 5px 5px red';
            document.querySelector('.pagina_treinamento_adicionar .msg').style.boxShadow = '5px 5px 5px red';
            document.querySelector('.pagina_treinamento_adicionar .msg').innerHTML = 'O nome é obrigatorio';
            return;
        } else {
            document.querySelector('.pagina_treinamento_adicionar [name="nome"]').style.boxShadow = '5px 5px 5px lightgray';
            document.querySelector('.pagina_treinamento_adicionar .msg').style.boxShadow = '5px 5px 5px lightgray';
            document.querySelector('.pagina_treinamento_adicionar .msg').innerHTML = 'Preencha os campos:';
        }

        //
        apiRequest('treinamento/adicionar', {
                "nome": document.querySelector('.pagina_treinamento_adicionar [name="nome"]').value,
                "tipo": 'aluno'
            },
            function(data) {
                //console.log(data);
                if (data.result != true) {
                    document.querySelector('.pagina_treinamento_adicionar .msg').style.boxShadow = '5px 5px 5px red';
                    document.querySelector('.pagina_treinamento_adicionar .msg').innerHTML = data.msg;
                    return;
                }
                eTreinamento.detalhe(data.codigo);
            }
        );
    }
};

var eAluno = {
    objeto: { 'codigo': null },
    pLista: function() {
        ePagina.para('aluno_lista');
        ePagina.setTitulo('Alunos');

		document.querySelector('.pagina_aluno_lista [name="pesquisa"]').onkeyup = function(){
			eAluno.listar();
		};

		document.querySelector('.pagina_aluno_lista form').onsubmit = function(event){
			event.preventDefault();
			eAluno.listar();
		};

		eAluno.listar();

    },
	listar:function(){
        apiRequest(
            'aluno/listar', {'pesquisa':document.querySelector('.pagina_aluno_lista [name="pesquisa"]').value},
            function(data) {

                var lista = document.querySelector(".pagina_aluno_lista .alunos");
				lista.innerHTML = '';

                if (data.result != true) {
                    lista.innerHTML = data.msg;
                    return;
                }



                data.lista.forEach(function(aluno, i) {
                    var temp = document.querySelector(".pagina_aluno_lista .tem_aluno");
                    var clon = temp.content.cloneNode(true);

                    clon.querySelector('.codigo').innerHTML = aluno.codigo;
                    clon.querySelector('.nome').innerHTML = aluno.nome;
                    clon.querySelector('.telefone_a').innerHTML = aluno.telefone_a;
					clon.querySelector('.telefone_b').innerHTML = aluno.telefone_b;


					/* Se o botão e a dive tiver um evento, será mostrado o detalhe 2x
                    clon.querySelector('.detalhe').setAttribute(
                        'onclick',
                        "eAluno.detalhe(" + aluno.codigo + ");"
                    );
					*/

                    clon.querySelector('.aluno').setAttribute(
                        'onclick',
                        "eAluno.detalhe(" + aluno.codigo + ");"
                    );

                    lista.appendChild(clon);
                });
            }
        );
	},
    pDetalhe: function() {
        ePagina.para('aluno_detalhe');
        ePagina.setTitulo('Aluno...');
        apiRequest(
            'aluno/detalhe', { 'codigo': eAluno.objeto.codigo },
            function(data) {
                if (data.result != true) {
                    ePagina.error(
                        error.name,
                        error.message + "\n" + this.responseText
                    );
                }
                eAluno.objeto = data.detalhe;
                ePagina.setTitulo('Aluno ' + data.detalhe.nome);
                document.querySelector('.pagina_aluno_detalhe .nome').innerHTML = data.detalhe.nome;
                document.querySelector('.pagina_aluno_detalhe .codigo').innerHTML = data.detalhe.codigo;
				document.querySelector('.pagina_aluno_detalhe .cadastro').innerHTML = data.detalhe.cadastro;
				document.querySelector('.pagina_aluno_detalhe .cpf').innerHTML = data.detalhe.cpf;
				document.querySelector('.pagina_aluno_detalhe .genero').innerHTML = data.detalhe.genero;
				document.querySelector('.pagina_aluno_detalhe .endereco').innerHTML = data.detalhe.endereco;
				document.querySelector('.pagina_aluno_detalhe .numero').innerHTML = data.detalhe.numero;
				document.querySelector('.pagina_aluno_detalhe .bairro').innerHTML = data.detalhe.bairro;
				document.querySelector('.pagina_aluno_detalhe .cidade').innerHTML = data.detalhe.cidade;
				document.querySelector('.pagina_aluno_detalhe .estado').innerHTML = data.detalhe.estado;
				document.querySelector('.pagina_aluno_detalhe .telefone_a').innerHTML = data.detalhe.telefone_a;
				document.querySelector('.pagina_aluno_detalhe .telefone_b').innerHTML = data.detalhe.telefone_b;
                document.querySelector('.pagina_aluno_detalhe .email').innerHTML = data.detalhe.email;
				document.querySelector('.pagina_aluno_detalhe .senha').innerHTML = data.detalhe.senha;

            }
        );
    },
    detalhe: function(codigo) {
        eAluno.objeto.codigo = codigo;
        eAluno.pDetalhe();
    },
    pAdicionar: function() {
        ePagina.para('aluno_adicionar');
        ePagina.setTitulo('Novo Aluno');

		document.querySelector('.pagina_aluno_adicionar form').onsubmit = function(event) {
            event.preventDefault();
            eAluno.adicionar();
        };
    },
    adicionar: function() {
        //Validar
        if (document.querySelector('.pagina_aluno_adicionar [name="nome"]').value == '') {
            document.querySelector('.pagina_aluno_adicionar [name="nome"]').style.boxShadow = '5px 5px 5px red';
            document.querySelector('.pagina_aluno_adicionar .msg').style.boxShadow = '5px 5px 5px red';
            document.querySelector('.pagina_aluno_adicionar .msg').innerHTML = 'O nome é obrigatorio';
            return;
        } else {
            document.querySelector('.pagina_aluno_adicionar [name="nome"]').style.boxShadow = '5px 5px 5px lightgray';
            document.querySelector('.pagina_aluno_adicionar .msg').style.boxShadow = '5px 5px 5px lightgray';
            document.querySelector('.pagina_aluno_adicionar .msg').innerHTML = 'Preencha os campos:';
        }

        //
        apiRequest('usuario/adicionar', {
                "nome": document.querySelector('.pagina_aluno_adicionar [name="nome"]').value,
                "cpf": document.querySelector('.pagina_aluno_adicionar [name="cpf"]').value,
				"genero": document.querySelector('.pagina_aluno_adicionar [name="genero"]').value,
				"endereco": document.querySelector('.pagina_aluno_adicionar [name="endereco"]').value,
				"numero": document.querySelector('.pagina_aluno_adicionar [name="numero"]').value,
				"bairro": document.querySelector('.pagina_aluno_adicionar [name="bairro"]').value,
				"cidade": document.querySelector('.pagina_aluno_adicionar [name="cidade"]').value,
				"estado": document.querySelector('.pagina_aluno_adicionar [name="estado"]').value,
				"telefone_a": document.querySelector('.pagina_aluno_adicionar [name="telefone_a"]').value,
				"telefone_b": document.querySelector('.pagina_aluno_adicionar [name="telefone_b"]').value,
                "email": document.querySelector('.pagina_aluno_adicionar [name="email"]').value,
                "senha": document.querySelector('.pagina_aluno_adicionar [name="senha"]').value,
                "tipo": 'aluno'
            },
            function(data) {
                //console.log(data);
                if (data.result != true) {
                    document.querySelector('.pagina_aluno_adicionar .msg').style.boxShadow = '5px 5px 5px red';
                    document.querySelector('.pagina_aluno_adicionar .msg').innerHTML = data.msg;
                    return;
                }
                eAluno.detalhe(data.codigo);
            }
        );
    }
};

//exercicio
var eExercicio = {
	objeto:{},
    pLista: function() {
        //Exibição da pagina
        ePagina.para('exercicio_lista');
        ePagina.setTitulo('Exercicios');

        //Configurar eventos
		/*
        document.querySelector('.pagina_exercicio_lista .pesquisa').addEventListener('keyup', function(event) {
            eExercicio.listar();
        });
		*/
		document.querySelector('.pagina_exercicio_lista .pesquisa').onkeyup = function(event) {
            eExercicio.listar();
        };
		/*
        document.querySelector('.pagina_exercicio_lista form').addEventListener('submit', function(event) {
            event.preventDefault();
            eExercicio.listar();
        });
		*/
		document.querySelector('.pagina_exercicio_lista form').onsubmit = function(event) {
            event.preventDefault();
            eExercicio.listar();
        };
        eExercicio.listar();

    },
    listar: function() {
        apiRequest('exercicio/lista', {
                'pesquisa': document.querySelector('.pagina_exercicio_lista .pesquisa').value
            },
            function(data) {
                let lista = document.querySelector('.pagina_exercicio_lista .lista');
                lista.innerHTML = '';
                if (data.lista.length < 1) {
                    lista.innerHTML = 'Nenhum exercicio encontrado';
                }

                for (let index = 0; index < data.lista.length; index++) {
                    let exercicio = data.lista[index];
                    let t = document.querySelector('.pagina_exercicio_lista .tem_exercicio');
                    let clon = t.content.cloneNode(true);

                    clon.querySelector('.nome').innerHTML = exercicio.nome;
					clon.querySelector('img').setAttribute(
						'src', 
						config.api_url + 'exercicio/img/'+exercicio.codigo+'?rand=' + Math.floor( Math.random() * 99)
					);
                    clon.querySelector('.descricao').innerHTML = exercicio.descricao;
                    
                    clon.querySelector('.exercicio').setAttribute(
                    	'onclick',
                    	'eExercicio.detalhe('+exercicio.codigo+');'
                    );

                    lista.appendChild(clon);
                }
            }
        );
    },
    pAdicionar: function() {
        ePagina.para('exercicio_adicionar');
        ePagina.setTitulo('Novo Exercicio');
		
		//Limpar formulario	
		document.querySelector('.pagina_exercicio_adicionar [name="nome"]').value = '';
		document.querySelector('.pagina_exercicio_adicionar .msg').innerHTML = 'Entre com as informações do exercicio.';
		document.querySelector('.pagina_exercicio_adicionar [name="descricao"]').value = '';
		document.querySelector('.pagina_exercicio_adicionar [name="imagem"]').value = '';
	
		//Adicionar evento
		/*        
		document.querySelector('.pagina_exercicio_adicionar form').addEventListener('submit', function(event) {
            event.preventDefault();
            eExercicio.adicionar();
        });
		*/
		document.querySelector('.pagina_exercicio_adicionar form').onsubmit = function(event) {
            event.preventDefault();
            eExercicio.adicionar();
        };
    },
    adicionar: function() {

        //Validar
        if (document.querySelector('.pagina_exercicio_adicionar [name="nome"]').value == '') {
            document.querySelector('.pagina_exercicio_adicionar [name="nome"]').style.boxShadow = '5px 5px 5px red';
            document.querySelector('.pagina_exercicio_adicionar .msg').style.boxShadow = '5px 5px 5px red';
            document.querySelector('.pagina_exercicio_adicionar .msg').innerHTML = 'O nome é obrigatorio';
            return;
        }

        document.querySelector('.pagina_exercicio_adicionar [name="nome"]').style.boxShadow = '5px 5px 5px lightgray';
        document.querySelector('.pagina_exercicio_adicionar .msg').style.boxShadow = '5px 5px 5px lightgray';
        document.querySelector('.pagina_exercicio_adicionar .msg').innerHTML = 'Envio Valido';

        apiRequest(
            'exercicio/adicionar', {
                "nome": document.querySelector('.pagina_exercicio_adicionar [name="nome"]').value,
                "descricao": document.querySelector('.pagina_exercicio_adicionar [name="descricao"]').value,
            },
            function(data) {
                if (data.result != true) {
                    document.querySelector('.pagina_exercicio_adicionar .msg').style.boxShadow = '5px 5px 5px red';
                    document.querySelector('.pagina_exercicio_adicionar .msg').innerHTML = data.msg;
					return;
                }
				//console.log(data.codigo);
                eExercicio.detalhe(data.codigo);
            }
        );
    },
    pDetalhe: function() {
		ePagina.para('exercicio_detalhe');
		ePagina.setTitulo('Exercicio ...');
		/*
		document.querySelector('.pagina_exercicio_detalhe .edit').addEventListener(
			'submit',
			function(event){
				event.preventDefault();
				eExercicio.detalhe_salvar();
			}
		);
		*/
		document.querySelector('.pagina_exercicio_detalhe .edit').onsubmit = function(event){
				event.preventDefault();
				eExercicio.detalhe_salvar();
			};

    },
    detalhe: function(codigo) {
		eExercicio.pDetalhe();
		apiRequest(
			'exercicio/detalhe',
			{'codigo':codigo},
			function(data){
				if(data.result != true){
					ePagina.error('Exercicio detalhe','exercicio não encontrado');
					return;
				}

				document.querySelector('.pagina_exercicio_detalhe .msg').innerHTML = 'Carregando...';
				
				
				let exercicio = data.detalhe;
				eExercicio.objeto = exercicio;

				ePagina.setTitulo('Exercicio ' + exercicio.nome);
				document.querySelector('.pagina_exercicio_detalhe .nome').innerHTML = exercicio.nome;
				document.querySelector('.pagina_exercicio_detalhe [name="nome"]').value = exercicio.nome;
				document.querySelector('.pagina_exercicio_detalhe .descricao').innerHTML = exercicio.descricao;
				document.querySelector('.pagina_exercicio_detalhe [name="descricao"]').innerHTML = exercicio.descricao;
				document.querySelector('.pagina_exercicio_detalhe .edit').style.display = 'none';
				document.querySelector('.pagina_exercicio_detalhe .view').style.display = 'block';
				document.querySelector('.pagina_exercicio_detalhe img').setAttribute(
					'src', 
					config.api_url + 'exercicio/img/'+exercicio.codigo+'?rand=' + Math.floor( Math.random() * 99)
				);

				document.querySelector('.pagina_exercicio_detalhe .msg').innerHTML = '';
				
			}
		);
    },
	detalhe_editar:function(){
		document.querySelector('.pagina_exercicio_detalhe .edit').style.display = 'block';
		document.querySelector('.pagina_exercicio_detalhe .view').style.display = 'none';
		document.querySelector('.pagina_exercicio_detalhe input[type=file]').value = '';
	},
	detalhe_cancelar:function(){
		document.querySelector('.pagina_exercicio_detalhe .edit').style.display = 'none';
		document.querySelector('.pagina_exercicio_detalhe .view').style.display = 'block';
	},
	detalhe_salvar:function(){
		document.querySelector('.pagina_exercicio_detalhe .msg').innerHTML = 'Salvando...';
		//Tratar imagem antes de enviar
		let input = document.querySelector('.pagina_exercicio_detalhe input[type=file]');
		let img = input.files[0];

		//Se não tiver imagem para atualizar
		if (img == undefined){
			eExercicio.detalhe_enviar();
			return;
		}
		let reader = new FileReader();
		reader.onloadend = function () {
			eExercicio.detalhe_imgset_img = reader.result;
	
			//Enviar tudo
			eExercicio.detalhe_enviar();

			
		};
		
		reader.readAsDataURL(img);	
	
	},
	detalhe_enviar:function(){
		let nome = document.querySelector('.pagina_exercicio_detalhe [name="nome"]').value;
		let descricao = document.querySelector('.pagina_exercicio_detalhe [name="descricao"]').value;
		//console.log(eExercicio.detalhe_imgset_img);
		
		apiRequest('exercicio/atualizar',{
				'codigo':eExercicio.objeto.codigo,
				'nome':nome,
				'descricao':descricao,
				'imagem':eExercicio.detalhe_imgset_img
			},function(data){
				if(data.result != true){
					document.querySelector('.pagina_exercicio_detalhe .msg').innerHTML = data.msg;
					return;
				}
				eExercicio.detalhe(eExercicio.objeto.codigo);
			}
		);
	}

};

//Perimetria
var ePerimetria = {
    pDetalhe: function() {
        ePagina.para('perimetria_detalhe');
    }
};

//sobrescrever as ancoras
var ancoras = document.querySelectorAll('a');
for (var i = 0; i < ancoras.length; i++) {
    ancoras[i].addEventListener('click', function(event) {
        event.preventDefault();
        ePagina.url(this.getAttribute('href'));
    });
}

//tratar login
if (sessionStorage.getItem('sessao_objeto') != null) {
    eSessao.objeto = JSON.parse(
        sessionStorage.getItem('sessao_objeto')
    );
}

//
if (eSessao.objeto.logado == true) {
    ePagina.url('inicio');
} else {
    ePagina.url('sessao/login');
}
