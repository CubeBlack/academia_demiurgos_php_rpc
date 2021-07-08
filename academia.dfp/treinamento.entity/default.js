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
