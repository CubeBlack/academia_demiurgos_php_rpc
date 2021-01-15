<?php
class Usuariosessao{
	static function lista(){
		//Organizar valores a serem usados e retornados
		$data = [
			'acao'=>'Sessao/lista', //Identificação da ação
			'msg'=>'Empty!', //mensagem que pode ser usada intenamente ou mostrada para o usuario final
			'return'=>false,
			'lista'=>[] // a lista a ser retornada
			
		];

		$sql = 'SELECT * FROM usuario_sessao';
		
		$dbh = conect();
		$sth = $dbh->prepare($sql);
		$sth->execute();
		
		$lista = $sth->fetchAll(PDO::FETCH_ASSOC);
		
		//Verificar se ouve erro no MySQL
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
		
		$data['lista'] = $lista;
		$data['return'] = true;
		return $data;
	}
	
	static function adicionar($data){
	
		//Verificar parametros
		if(!isset($data['usuario']) ){
			$data['msg'] = 'Usuario requerido';
			$data['senha'] = '***';
			return $data;
		}

		if($data['usuario'] == ''){
			$data['msg'] = 'Usuario invalido';
			$data['senha'] = '***';
			return $data;
		}
		
		if(!isset($data['usuario']) ){
			$data['msg'] = 'Usuario requerido';
			$data['senha'] = '***';
			return $data;
		}

		if(!isset($data['senha']) ){
			$data['msg'] = 'senha requerida requerido';
			$data['senha'] = '***';
			return $data;
		}

		if($data['senha'] == ''){
			$data['msg'] = 'senha invalida';
			$data['senha'] = '***';
			return $data;
		}
		
		
		//verificar se o usuario exite
		$dbh = conect();
		$sth = $dbh->prepare("
			SELECT codigo, nome, email, tipo from usuario
			WHERE 
				senha = :senha
				and (cpf = :cpf or email = :email or codigo = :codigo)
		");
		
		$sth->execute([
			"cpf"=>$data['usuario'],
			"email"=>$data['usuario'],
			"codigo"=>$data['usuario'],
			"senha"=>$data['senha']
		]);
		
		//Verificar se ouve erro no MySQL
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			$data['senha'] = '***';
			return $data;
		}
		
		if(empty($lista = $sth->fetchAll(PDO::FETCH_ASSOC))){
			$data['msg'] = 'Não foi possivel efetuar login, tente novamente.';
			$data['senha'] = '***';
			return $data;
		}
		
		$data['usuario'] = $lista[0]['codigo'];
		$data['usuario_nome'] = $lista[0]['nome'];
		$data['usuario_email'] = $lista[0]['email'];
		$data['chave'] = md5(rand(0,99) . rand(0,99) . rand(0,99));
				
		//Inserir valores
		$sql  = 'insert `usuario_sessao` set ';
		$sql .= 'codigo = null , ';
		$sql .= 'inicio = now(), ';
		$sql .= 'fim = now(), ';
		$sql .= 'usuario = :usuario , ';
		$sql .= 'ip = :ip , ';
		$sql .= 'chave = :chave ';
		
		$dbh = conect();
		$sth = $dbh->prepare($sql);
		$sth->execute([
			"usuario"=>$data['usuario'],
			"chave"=>$data['chave'],
			"ip"=>$_SERVER["REMOTE_ADDR"]
		]);
		
	
		//Verificar se ouve erro no MySQL
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			$data['senha'] = '***';
			return $data;
		}
		
		$data['result'] = true;
		
		//Pegar o codigo do valor inserido
		$data['codigo'] = $dbh->lastInsertId();
		$data['detalhe'] = $lista[0];
		$data['detalhe']['chave'] = $data['chave'];
		$data['detalhe']['logado'] = true;
		$data['msg'] = 'Valor inserido com sucesso'; //Pode ser usado como retorno de um formlario
		$data['senha'] = "***";
		return $data;
	}
	
	static function detalhe($data){
		/*
		$data = [
			'acao'=>'Sessao/detalhe', 
			'msg'=>'Empty!', //
			'result'=>null, //Valor de teste
			'sessao_chave'=>isset($_REQUEST['sessao_chave'])?$_REQUEST['sessao_chave']:'',
			'usuario_nome'=> 'Empty',
			'usuario_titulo'=> 'Empty',
			'usuario_titulo_prefixo'=> 'Empty',
			'chave'=> 'Empty',
		];
		*/
		//Verificar parametros
		if($data['sessao_chave'] == ''){
			$data['msg'] = 'Chave invalida';
			return $data;
		}
		
		//valores
		$sql  = 'select * from usuario_sessao ';
		$sql .= 'where chave = :chave ';
		
		$dbh = conect();
		$sth = $dbh->prepare($sql);
		$sth->execute(["chave"=>$data['sessao_chave']]);
	
		//Verificar se ouve erro no MySQL
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
		
		$lista = $sth->fetchAll(PDO::FETCH_ASSOC);
		
		if(empty($lista)){
			$data['msg'] = 'Não foi possivel encontrar';
			return $data;
		}
		
		//junta as arrays
		$data = array_merge($data, $lista[0]);
		$data['result']=true;
		return $data;
	}
	
	static function r_detalhe($chave){
		$dbh = conect();
		$sth = $dbh->prepare('SELECT
				usuario_sessao.*,
				usuario.tipo
		  	from usuario_sessao
			inner join usuario on
				usuario.codigo = usuario_sessao.usuario
			where chave = :chave
			limit 1
		');
		
		$sth->execute(["chave"=>$chave]);
	
		//Verificar se ouve erro no MySQL
		if($sth->errorInfo()[1]!=0) {
			die('Usuariosessao/r_detalhe: MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2]);
		}
		$retorno = $sth->fetchAll(PDO::FETCH_ASSOC);
		if(empty($retorno)) return false;
		return $retorno[0];
	}
	
	static function apagar(){ //deveria ser finalizar
		
	}
	
	static function atualizar(){ //atualizar
		
	} 

	static function r_existeByCodigo($codigo){
		
	}
	static function sair($data){
		return $data;
	}
}