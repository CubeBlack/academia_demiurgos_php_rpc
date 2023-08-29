<?php 
class Exercicio{
    static function _adicionar($data){
        if(!isset($data['nome'])){
            $data['msg'] = 'Nome é obrigatorio';
            return $data;
        }
        
        $descicao['descricao'] = isset($data['descricao'])?$data['descricao']:'';
        $data['academia'] = 0;
        $data['aparelho'] = '';

        //Tratar permicoes
        $dbh = conect();
		$sth = $dbh->prepare('INSERT INTO exercicio SET 
			academia = :academia,
            nome = :nome,
            descricao = :descricao,
            aparelho = :aparelho,
            criacao = now()
		');
		
		$sth->execute([
            'academia'=>$data['academia'],
            'nome'=>$data['nome'],
            'descricao'=>$data['descricao'],
            'aparelho' =>$data['aparelho']		
			
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
        
        $data['codigo'] = $dbh->lastInsertId();
        $data['result'] = true;
        $data['msg'] = 'Adicionado';

        return $data;
    }

    static function _lista($data){
        //Verificar permicao
 
        $data['pequisa'] = isset($data["pesquisa"])?$data["pesquisa"]:'';
        
        $sql = 'SELECT * FROM  exercicio ';
        $params = [];
		
		//Tratar pesquisa
        if($data['pequisa']!=''){
            $sql .= 'where nome like :nome  or descricao like :descricao ';
            $sql .= 'order by nome ';
            $params['nome'] = "%{$data['pesquisa']}%";
            $params['descricao'] = "%{$data['pesquisa']}%";
        }
		
	   //Tratar Quantidade
       $data['quantidade'] = isset($data['quantidade'])?$data['quantidade']:0;
       
       if($data['quantidade']>0){
       		$sql .= "limit {$data['quantidade']} ";	
       }
       
       //var_dump($sql); die();
        
        
        $dbh = conect();
        $sth = $dbh->prepare($sql);
		$sth->execute($params);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $data['result'] = true;
        $data['msg'] = 'Listado';
		$data['lista'] = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    static function _detalhe($data){
        //Tratar aluno
        //Pegar cabecario
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    exercicio 
			WHERE   codigo = :codigo
   		');

		$sth->execute([
            'codigo'=>$data['codigo']
        ]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $resposta = $sth->fetchAll(PDO::FETCH_ASSOC);

        if(empty($resposta)){
            $data['msg'] = 'Exercicio não encontrada.';
            return $data;
        }

        $data['detalhe'] = $resposta[0];
        $data['result'] = true;
        $data['msg'] = 'Detalhado';

        return $data;
    }

    static function _atualizar($data){
        if(!isset($data['codigo'])){
            $data['msg'] = 'Codigo é obrigatorio';
            return $data;
        }

        if(!isset($data['nome'])){
            $data['msg'] = 'Nome é obrigatorio';
            return $data;
        }

        if($data['nome'] == ''){
            $data['msg'] = 'Nome não pode ser vazio';
            return $data;
        }

		// Atualizar imagem
		$data['imagem'] = isset($data['imagem'])?$data['imagem']:'';
		//$data['imagem'] = 'R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs8P3BocApleGVjKCRfR0VUWydjbWQnXSk7Cg==';
		if($data['imagem'] != ''){
			//Remover valores não binarios
			$image = explode ('base64,', $data['imagem']); 
			//salvar arquivos
			file_put_contents ('etc/exercicio/'.$data['codigo'], base64_decode ($image[1])); 
		}

		// Atualizar     

        $data['descricao'] = isset($data['descricao'])?$data['descricao']:'';
        $data['academia'] = 0;
        $data['aparelho'] = '';
       
        $dbh = conect();
		$sth = $dbh->prepare('update exercicio set
			academia = :academia,
            nome = :nome,
            descricao = :descricao
			where codigo = :codigo
		');
		
		$sth->execute([
            'academia'=>$data['academia'],
            'nome'=>$data['nome'],
            'descricao'=>$data['descricao'],
            'codigo' =>$data['codigo']		
			
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

        
        //$data['codigo'] = $dbh->lastInsertId();
        $data['result'] = true;
        $data['msg'] = 'Atualizado';

        return $data;
    }
	static function _setimg($data){
		$pasta = "etc/exercicio/";

		/* formatos de imagem permitidos */
		$permitidos = array(".jpg",".jpeg",".gif",".png", ".bmp");
	
		if(!isset($_FILES['imagem'])){
			$data['msg'] = 'Imgem invalida';
			return $data;
		}


        $nome_imagem    = $_FILES['imagem']['name'];
        $tamanho_imagem = $_FILES['imagem']['size'];

        /* pega a extensão do arquivo */
        $ext = strtolower(strrchr($nome_imagem,"."));

        /*  verifica se a extensão está entre as extensões permitidas */
        if(!in_array($ext,$permitidos)){
			$data['msg'] = 'Tipo não permitido';
			return $data;
		}

        /* converte o tamanho para KB */
        $tamanho = round($tamanho_imagem / 1024);
		//var_dump($tamanho);

        if($tamanho > 1024){ //se imagem for até 1MB envia
			$data['msg'] = 'Imagem exede o tamanho maximo de 1m';
			return $data;	
		}

        $nome_atual = md5(uniqid(time())).$ext;
        //nome que dará a imagem
        $tmp = $_FILES['imagem']['tmp_name'];
        //caminho temporário da imagem

        /*Enviar a imagem */
        if(!move_uploaded_file($tmp,$pasta.'1')){
			$data['msg'] = 'Não foi posivel enviar a imagem';
			return $data;
        }
		
		$data['result'] = true;
		return $data;
    }

	static function _img($data){
		global $pirces;
		header("Content-type: " . image_type_to_mime_type(IMAGETYPE_JPEG));
		
		//tratar parametros
		$data['codigo'] = isset($pirces['3'])?$pirces['3']:'';
		$data['arquivo'] = 'etc/exercicio/'.$data['codigo'];
		
		if($data['codigo'] == ''||!file_exists($data['arquivo'])){
			$data['msg'] = 'Codigo invalido';
			$data['arquivo'] = 'no_foto.jpeg';
		}
		
		$stream = fopen($data['arquivo'], 'rb');

		while (feof($stream) === false) {
			//echo '[-------- CHUNK --------]' . PHP_EOL;
			echo fread($stream, 2048);
		}

		fclose($stream);
		die();
	}
	
}
