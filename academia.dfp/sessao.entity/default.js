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