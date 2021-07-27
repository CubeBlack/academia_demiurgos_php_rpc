<?php 
class Perimetria{
    static function _lista($data){
        $data = Core::parametroObrigatorio($data, 'aluno');
        if(!$data['parametro_obrigatorio']){
            return $data;
        }

        $dbh = conect();
        $parametro = ["usuario"=>$data['aluno']];
        $query = 'SELECT *
			FROM    perimetria 
			WHERE   usuario = :usuario  
		';

        $query .= 'order by data desc ';


		$sth = $dbh->prepare($query);

		$sth->execute($parametro);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

		$data['lista'] = $sth->fetchAll(PDO::FETCH_ASSOC);

        $data['result'] = true;
        return $data;
    }

    static function _registrar($data){
        //Tratar parametros
        $data = Core::parametroObrigatorio($data, 'aluno');
        $data = Core::parametroObrigatorio($data, 'torax');
        $data = Core::parametroObrigatorio($data, 'abdome');
        $data = Core::parametroObrigatorio($data, 'quadril');
        $data = Core::parametroObrigatorio($data, 'braco_direito');
        $data = Core::parametroObrigatorio($data, 'braco_esquerdo');
        $data = Core::parametroObrigatorio($data, 'coxa_superior_direita');
        $data = Core::parametroObrigatorio($data, 'coxa_superior_esquerda');
        $data = Core::parametroObrigatorio($data, 'coxa_inferior_direita');
        $data = Core::parametroObrigatorio($data, 'coxa_inferior_esquerda');
        $data = Core::parametroObrigatorio($data, 'perna_direita');
        $data = Core::parametroObrigatorio($data, 'perna_esquerda');
        
        if(!$data['parametro_obrigatorio']){
            return $data;
        }

        //Pegar data atual
        $data['data'] = date('Y-m-d');
        
        //registrar
        $dbh = conect();
		$sth = $dbh->prepare('INSERT INTO `perimetria` SET
            `data` =                   :data, 
            `usuario` =                :aluno, 
            `braco_direito` =          :braco_direito,
            `braco_esquerdo` =         :braco_esquerdo,
            `torax` =                  :torax, 
            `abdome` =                 :abdome, 
            `quadril` =                :quadril, 
            `coxa_superior_direita` =  :coxa_superior_direita,
            `coxa_superior_esquerda` = :coxa_superior_esquerda,
            `coxa_inferior_direita` =  :coxa_inferior_direita,
            `coxa_inferior_esquerda` = :coxa_inferior_esquerda,
            `perna_esquerda` =         :perna_esquerda,
            `perna_direita` =          :perna_direita;
		');
		
		$sth->execute([
            'data'=>                  $data['data'],
            'aluno'=>                 $data['aluno'],
            'braco_direito'=>         $data['braco_direito'],
            'braco_esquerdo'=>        $data['braco_esquerdo'],
            'torax'=>                 $data['torax'],
            'abdome'=>                $data['abdome'],
            'quadril'=>               $data['quadril'],
            'coxa_superior_direita'=> $data['coxa_superior_direita'],
            'coxa_superior_esquerda'=>$data['coxa_superior_esquerda'],
            'coxa_inferior_direita'=> $data['coxa_inferior_direita'],
            'coxa_inferior_esquerda'=>$data['coxa_inferior_esquerda'],
            'perna_esquerda'=>        $data['perna_esquerda'],
            'perna_direita'=>         $data['perna_direita']			
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

    static function _atualizarpordata($data){
        //Parametros
        $data = Core::parametroOpcional($data, 'braco_direito', 0);
        $data = Core::parametroOpcional($data, 'braco_esquerdo', 0);
        $data = Core::parametroOpcional($data, 'torax', 0);
        $data = Core::parametroOpcional($data, 'abdme', 0);
        $data = Core::parametroOpcional($data, 'quadril', 0);
        $data = Core::parametroOpcional($data, 'coxa_superior_direito', 0);
        $data = Core::parametroOpcional($data, 'coxa_superior_esquerda', 0);
        $data = Core::parametroOpcional($data, 'coxa_inferior_esquerda', 0);
        $data = Core::parametroOpcional($data, 'coxa_inferior_direita', 0);
        $data = Core::parametroOpcional($data, 'perna_esquerda', 0);
        $data = Core::parametroOpcional($data, 'perna_direita', 0);
        $data = Core::parametroObrigatorio($data, 'data');
        $data = Core::parametroObrigatorio($data, 'aluno');
        if(!$data['parametro_obrigatorio']){
            return $data;
        }
        
        //tratar query perimetria
        $query = 'UPDATE `perimetria` SET ';
        $inserts = [];
        $params = ["data"=>$data['data']];

        if((int)$data['braco_direito']!=0){
            $inserts[] = '`braco_direito` = :braco_direito ';
            $params['braco_direito'] = $data['braco_direito'];
        }

        if((int)$data['braco_esquerdo']!=0){
            $inserts[] = '`braco_esquerdo` = :braco_esquerdo ';
            $params['braco_esquerdo'] = $data['braco_esquerdo'];
        }

        if((int)$data['torax']!=0){
            $inserts[] = '`torax` = :torax ';
            $params['torax'] = $data['torax'];
        }

        if((int)$data['abdme']!=0){
            $inserts[] = '`abdme` = :abdme ';
            $params['abdme'] = $data['abdme'];
        }

        if((int)$data['quadril']!=0){
            $inserts[] = '`quadril` = :quadril ';
            $params['quadril'] = $data['quadril'];
        }

        if((int)$data['coxa_superior_direito']!=0){
            $inserts[] = '`coxa_superior_direito` = :coxa_superior_direito ';
            $params['coxa_superior_direito'] = $data['coxa_superior_direito'];
        }

        if((int)$data['coxa_superior_esquerda']!=0){
            $inserts[] = '`coxa_superior_esquerda` = :coxa_superior_esquerda ';
            $params['coxa_superior_esquerda'] = $data['coxa_superior_esquerda'];
        }

        if((int)$data['coxa_inferior_esquerda']!=0){
            $inserts[] = '`coxa_inferior_esquerda` = :coxa_inferior_esquerda ';
            $params['coxa_inferior_esquerda'] = $data['coxa_inferior_esquerda'];
        }

        if((int)$data['coxa_inferior_direita']!=0){
            $inserts[] = '`coxa_inferior_direita` = :coxa_inferior_direita ';
            $params['coxa_inferior_direita'] = $data['coxa_inferior_direita'];
        }

        if((int)$data['perna_esquerda']!=0){
            $inserts[] = '`perna_esquerda` = :perna_esquerda ';
            $params['perna_esquerda'] = $data['perna_esquerda'];
        }

        if((int)$data['perna_direita']!=0){
            $inserts[] = '`perna_direita` = :perna_direita ';
            $params['perna_direita'] = $data['perna_direita'];
        }


        if(empty($inserts)){
            $data['msg'] = 'Nada a ser atualizado';
            return $data;
        }

        $query = 'UPDATE `perimetria` SET ' . implode(', ',$inserts) . ' where data = :data';
        
        $dbh = conect();
        $sth = $dbh->prepare($query);
        $sth->execute(["usuario"=>$data['aluno']]);

        if($sth->errorInfo()[1]!=0) {
            $data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
            return $data;
        }

        $resposta = $sth->fetchAll(PDO::FETCH_ASSOC);

        //Nova perimetria
        if(empty($resposta)){
            $dbh = conect();
            $sth = $dbh->prepare('INSERT INTO perimetria SET 
                chave = :chave,
                valor = :valor,
                aluno = :aluno
    
            ');
            
            $sth->execute([
                'chave'=>$data['chave'],
                'aluno'=>$data['aluno']
            ]);
            
            if($sth->errorInfo()[1]!=0) {
                $data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
                return $data;
            }

            
            $data['result'] = true;
            return $data;
        }
        
        
        $data['codigo'] = $dbh->lastInsertId();
        $data['result'] = true;
        return $data;
    }

    static function _detalhepordata($data){
        //Help
        $data['help'] = [
            "Se não for enviada a data, retornara a ultima perimetria"
        ];

        //Tratar parametros
        $data = Core::parametroOpcional($data, 'data', '');
        $data = Core::parametroObrigatorio($data, 'aluno');
        if(!$data['parametro_obrigatorio']){
            return $data;
        }

        //Pegar perimetria
        $dbh = conect();
        $parametro = ["usuario"=>$data['aluno']];
        $query = 'SELECT *
			FROM    perimetria 
			WHERE   usuario = :usuario  
		';

        if($data['data'] != ''){
            $query .= 'AND data = :data ';
            $parametro['data'] = $data['data'];
        }

        $query .= 'order by data desc limit 1 ';


		$sth = $dbh->prepare($query);

		$sth->execute($parametro);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

		$resposta = $sth->fetchAll(PDO::FETCH_ASSOC);

        //Se a perimetria especifica não existir, retornar msg
        if(empty($resposta)){
            $data['msg'] = 'Perimetria não encontrada';
            return $data;
        }

        $data['detalhe'] = $resposta[0];
        
        $data['result'] = true;
        return $data;
    }


    static function detalhe($data){
        //Tratar aluno
        //Pegar cabecario
        $dbh = conect();
		$sth = $dbh->prepare('SELECT 
            *
        FROM    perimetria 
        WHERE   usuario = :usuario
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