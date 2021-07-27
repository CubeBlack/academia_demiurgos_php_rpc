load:function(){
    //
    sys.cabecario.setTitulo('Registros de perimetria');

    //Carregar aluno

    //
    this.listar();
},

listar:function(){
    sys.apiRequest(
        'perimetria/lista', {
            'aluno':sys.getEntent('aluno').objeto.codigo
        },
        function(data) {
            var lista = document.querySelector(".layer .lista");
            if (data.result != true) {
                lista.innerHTML = data.msg;
                return;
            }

            
            lista.innerHTML = '';

            data.lista.forEach(function(registro, i) {
                
                var temp = document.querySelector(".layer .tem_item");
                var clon = temp.content.cloneNode(true);

                clon.querySelector('.perimetria').innerHTML = registro.data;

                clon.querySelector('.perimetria').setAttribute(
                    'onclick',
                    "sys.getEntent('aluno_perimetria').detalhe(" + registro.data + ");"
                );

                lista.appendChild(clon);
                
            });
        }
    );
}
