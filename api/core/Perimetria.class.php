<?php 
class Perimetria{
    static function adicionar($data){
        //Tratar instrutor
        //Tratar aluno
        $dbh = conect();
		$sth = $dbh->prepare('INSERT INTO perimetria SET 
			instrutor = :instrutor,
			aluno = :aluno
		');
		
		$sth->execute([
			'instrutor'=>$data['instrutor'],
			'aluno'=>$data['aluno']
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
        
        $data['codigo'] = $dbh->lastInsertId();
        $data['result'] = true;
        return $data;
    }

    static function valoradicionar($data){
        //Tratar perimetria
        //Tratar instrutor
        //Verificar se existe a chave
        $dbh = conect();
		$sth = $dbh->prepare('SELECT codigo
			FROM    perimetria_valor 
			WHERE   chave = :chave
            AND     perimetria = :perimetria    
		');

		$sth->execute([
            'perimetria'=>$data['perimetria'],
            'chave'=>$data['chave']
        ]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

		$resposta = $sth->fetchAll(PDO::FETCH_ASSOC);
		
        if(empty($resposta)){
            //Adicionar o valor
            $dbh = conect();
            $sth = $dbh->prepare('INSERT perimetria_valor SET 
                perimetria = :perimetria,
                chave = :chave,
                valor = :valor
            ');
            
            $sth->execute([
                'perimetria' =>$data['perimetria'],
                'chave'=>$data['chave'],
                'valor'=>$data['valor']
            ]);
            
            if($sth->errorInfo()[1]!=0) {
                $data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
                return $data;
            }
            
            $data['codigo'] = $dbh->lastInsertId();
            $data['msg'] = 'Adicionado valor a perimetria';
            $data['result'] = true;
            return $data;
        }

        //Atualizar valor
        $data['codigo'] = $resposta[0]['codigo'];
        $dbh = conect();
		$sth = $dbh->prepare('UPDATE perimetria_valor SET 
			valor = :valor
            where codigo = :codigo
        ');
		
		$sth->execute([
            'codigo'=>$data['codigo'],
            'valor'=>$data['valor']
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
        
        $data['result'] = true;
        $data['msg'] = 'Valor atualizado';
        return $data;
    }

    static function listar($data){
        //Tratar aluno
        //Listar
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    perimetria 
			WHERE   aluno = :aluno
   		');

		$sth->execute([
            'aluno'=>$data['aluno']
        ]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $data['result'] = true;
        $data['msg'] = 'listado';
		$data['lista'] = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    static function detalhe($data){
        //Tratar aluno
        //Pegar cabecario
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    perimetria 
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
            $data['msg'] = 'Perimetria não encontrada.';
            return $data;
        }

        $data['detalhe'] = $resposta[0];
        
        //Pegar valores
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    perimetria_valor 
			WHERE   perimetria = :codigo
   		');

		$sth->execute([
            'codigo'=>$data['codigo']
        ]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $resposta = $sth->fetchAll(PDO::FETCH_ASSOC);
        
        $data['detalhe']['valores'] = [];
        foreach ($resposta as $indice => $medida) {
            $data['detalhe']['valores'][$medida['chave']] = (float)$medida['valor'];
        }

        $data['result'] = true;
        $data['msg'] = 'Detalhado';
        return $data;
    }
}