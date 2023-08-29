objeto:{codigo:null},
load:function(){
    
},

lista:function(){
    sys.layerLoadContent('conteudo','exercicio-lista', 'listar');
},
selecionar:function(data){
    data.acao = 'selecionar';
    sys.layerLoadContent(
        'conteudo',
        'exercicio-lista', 
        data
    );
},

detalhe:function(codigo){
    this.objeto.codigo = codigo;
    sys.layerLoadContent('conteudo','exercicio-detalhe');
},

editar:function(){
    sys.layerLoadContent('conteudo','exercicio-formulario', 'editar');
},

adicionar:function(){
    sys.layerLoadContent('conteudo','exercicio-formulario', 'novo');
}
