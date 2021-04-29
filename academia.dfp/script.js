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
        
        // exibir menu por tipo de usuario
        var tipo = sys.getEntent('sessao').objeto.tipo;

        document.querySelector('.menu .instrutor').style.display = "none";
        document.querySelector('.menu .aluno').style.display = "none";
        document.querySelector('.menu .suporte').style.display = "none";
        
        document.querySelector('.menu .'+tipo).style.display = "block";

        //Detalhe do ultimo aluno visualizado
        if (typeof(sys.getEntent("aluno").objeto.nome) == 'undefined') {
            document.querySelector('.menu .subitem_alunodetalhe').style.display = "none";
            return;
        }
        document.querySelector('.menu .subitem_alunodetalhe').style.display = "block";
        document.querySelector('.menu .subitem_alunodetalhe .aluno').innerHTML = sys.getEntent("aluno").objeto.nome;
    },
    open:function(vewChave){
        sys.layerLoadContent('conteudo',vewChave);
        sys.menu.hidden();
    }
},
cabecario:{
    is_show:true,
    hidden:function(){
        document.querySelector('.cabecario').style.display = "none";
    },
    show:function(){
        document.querySelector('.cabecario').style.display = "block";
      

    },
    setTitulo:function(titulo){
        document.querySelector('.cabecario .titulo').innerHTML = titulo.substr(0, 29);
    }
},
open:function(){
    
}