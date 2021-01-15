<?php
class Aluno{
    static function listar($data){
        $data['pequisa'] = isset($data["pesquisa"])?$data["pesquisa"]:'';
        
        $sql = 'SELECT * FROM  usuario ';
        $params = [];

        if($data['pequisa']!=''){
            $sql .= 'where nome like :nome  or codigo = :codigo ';
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
}
