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
    sys.layerLoadContent("conteudo",'aluno_perimetria-detalhe');
},
treinamento:function(){
    sys.layerLoadContent("conteudo",'aluno_treinamento-detalhe');
},
anamnese:function(){
    sys.layerLoadContent("conteudo",'aluno_anamnese-detalhe');
}