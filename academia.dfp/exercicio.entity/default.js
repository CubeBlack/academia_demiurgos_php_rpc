objeto:{codigo:null},
load:function(){
    
},

lista:function(){
    sys.layerLoadContent('conteudo','exercicio-lista');
},

detalhe:function(codigo){
    this.objeto.codigo = codigo;
    sys.layerLoadContent('conteudo','exercicio-detalhe');
},

editar:function(){
    sys.layerLoadContent('conteudo','exercicio-formulario', 'editar');
}