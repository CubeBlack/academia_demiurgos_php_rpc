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