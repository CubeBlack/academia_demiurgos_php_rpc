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