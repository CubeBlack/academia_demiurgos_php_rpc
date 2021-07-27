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