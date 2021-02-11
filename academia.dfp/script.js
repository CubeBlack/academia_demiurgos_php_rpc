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
}