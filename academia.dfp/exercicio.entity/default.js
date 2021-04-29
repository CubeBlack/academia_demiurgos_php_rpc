objeto:{codigo:null},
load:function(){
    
},

detalhe:function(codigo){
    this.objeto.codigo = codigo;
    sys.layerLoadContent('conteudo','exercicio-detalhe');
},

editar:function(){
    sys.layerLoadContent('conteudo','exercicio-formulario', 'editar');
}