<?php
class Aluno{
    static function listar($data){
        $data['pequisa'] = isset($data["pesquisa"])?$data["pesquisa"]:'';
        
        $sql = 'SELECT * FROM  usuario where tipo = "aluno" ';
        $params = [];

        if($data['pequisa']!=''){
            $sql .= 'and nome like :nome  or codigo = :codigo ';
            $params['nome'] = "%{$data['pesquisa']}%";
            $params['codigo'] = $data['pesquisa'];
        }

        //var_dump($params);

        $sql .= 'order by nome ';
        
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
    static function detalhe($data){
        if(!isset($data['codigo'])){
            $data['msg'] = 'Codigo invalido';
            return $data;
        }

        $dbh = conect();
		$sth = $dbh->prepare('SELECT 
            * 
            FROM usuario
            where codigo = :codigo
            
   		');

		$sth->execute(['codigo'=>$data['codigo']]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $resultado = $sth->fetchAll(PDO::FETCH_ASSOC);
        if(empty($resultado)){
            $data['msg'] = 'Aluno Não encontrado';
            return $data;
        }

        $data['detalhe'] = $resultado[0];
        $data['result'] = true;
        $data['msg'] = 'Detalhado';
        return $data;
    }

    static function adicionar($data){
        $data['tipo'] = Usuario::TIPO_ALUNO;

        $data['result'] = Usuario::ADICIONAR(
			$data['nome'],
			$data['cpf'],
			$data['genero'],
			$data['endereco'],
			$data['numero'],
			$data['bairro'],
			$data['cidade'],
			$data['estado'],
			$data['telefone_a'],
			$data['telefone_b'],
			$data['email'],
			$data['senha'],
			$data['tipo']
		);

        return $data;
    }
}
