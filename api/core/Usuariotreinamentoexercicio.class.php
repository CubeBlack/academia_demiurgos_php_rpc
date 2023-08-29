<?php
class Treinamentoexercicioexecucao{
    static function adicionar($data){
        //Tratar instrutor
        //Tratar aluno
        $dbh = conect();
		$sth = $dbh->prepare('INSERT INTO Treinamento SET 
			treinamento = :treinamento,
            exercicio = :exercicio,
            situacao = :situacao,  
            execucao = :execucao,
            conclusao = now()
		');
		
		$sth->execute([
            'treinamento'=>$data['treinamento'],
            'exercicio'=>$data['exercicio'],
            'situacao'=>$data['situacao'],
            'execucao' =>$data['execucao']		
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

    static function listar($data){
        //Tratar aluno
        //Listar
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    treinamento 
   		');

		$sth->execute([
            /* 'academia'=>$data['academia'] */
        ]);

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
        //Tratar aluno
        //Pegar cabecario
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    treinamento
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
            $data['msg'] = 'Treinamento não encontrada.';
            return $data;
        }

        $data['detalhe'] = $resposta[0];
        $data['result'] = true;
        $data['msg'] = 'Detalhado';
        
        return $data;
    }
}
