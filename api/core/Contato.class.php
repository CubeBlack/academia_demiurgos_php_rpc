<?php 
class Contato{
	static function r_adicionar($usuario,$tipo, $valor){
		$dbh = conect();
		$sth = $dbh->prepare('
			INSERT INTO contato SET 
			tipo = :tipo,
			valor = :valor,
			usuario = :usuario
		');
		
		$sth->execute([
			'tipo'=>$tipo,
			'valor'=>$valor,
			'usuario'=>$usuario
		]);
		
		if($sth->errorInfo()[1]!=0) {
			die('Contato/r_adicionar. MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2]);
		}

		return $dbh->lastInsertId();
	}
	
	static function adicionar(){
		$data = [
			'acao'=>'Contato/adicionar',
			'result'=>false,
			'msg'=>'Empty!',
			'usuario'=>isset($_REQUEST['usuario'])?$_REQUEST['usuario']:'',
            'tipo'=>isset($_REQUEST['tipo'])?$_REQUEST['tipo']:'',
            'codigo'=>null,
			'valor'=>isset($_REQUEST['valor'])?$_REQUEST['valor']:''
		];
		
		if($data['usuario']==''){
			$data['msg']='Usuario invalido';
			return $data;
        }
        
        if(!Usuario::r_existePorCodigo($data['usuario'])){
            $data['msg']='Usuario inexistente';
			return $data;
        }

        if($data['tipo']==''){
			$data['msg']='Tipo invalido';
			return $data;
        }
		
		$data['codigo'] = Contato::r_adicionar(
			$data['usuario'],
			$data['tipo'],
			$data['valor']
		);
		
		$data['result'] = true;
		$data['msg'] = 'Contato adicionado com sucesso';

		return $data;
	}

	static function detalhe(){
		$data = [
			'action'=>'Usuario/detalhe',
			'result'=>false,
			'msg'=>'Empty!',
			'codigo'=>isset($_REQUEST['codigo'])?$_REQUEST['codigo']:''
		];

		if($data['codigo'] == ''){
			$data['msg'] = 'Codigo invalido';
			return $data;
		}

		$dbh = conect();
		$sth = $dbh->prepare('SELECT * from contato 
			where codigo = :codigo
		');

		$sth->execute(['codigo'=>$data['codigo']]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

		$pesquisa = $sth->fetchAll(PDO::FETCH_ASSOC);
		
        if(empty($pesquisa)){
            $data['msg'] = 'Contato não encontrado';
            return $data;
        }

        $data['result'] = true;
        $data['msg'] = 'Detalhado';
        
        $data = array_merge($data,$pesquisa[0]);

        return $data;
	}

	static function r_removerPorUsuario($codigo){		
		$dbh = conect();
		$sth = $dbh->prepare('DELETE FROM contato 
			WHERE usuario = :codigo
		');
		$sth->execute(['codigo'=>$codigo]);
	}
}