<?php 
class Treinamento{
    //Situações/status posiveis
    const SITUACAO_ATIVO = 'ativo';
    const SITUACAO_INATIVO = 'inativo';

    static function _adicionar($data){
        
        //Tratar instrutor
        //Tratar aluno
        $dbh = conect();
		$sth = $dbh->prepare('INSERT INTO treinamento SET 
            codigo = null,
			academia = 1/*:academia*/,
            nome = :nome,
            descricao = :descricao,
            ciclo = :ciclo,
            criacao = now(),
            situacao = :situacao
		');
		
		$sth->execute([
            /*'academia'=>$data['academia'],*/
            'nome'     =>$data['nome'],
            'descricao'=>$data['descricao'],
            'ciclo'    =>$data['ciclo'],
            'situacao' =>$data['situacao']
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


    static function _listar($data){
        //Tratar aluno
        //Listar
        $query = 'SELECT 
                *
            FROM   treinamento
            where true 
       '; 

       $parametros = [];
       
       if($data['pesquisa']!=''){
            $query .= 'and (nome like :pesquisa or descricao like :pesquisa) ';
            $parametros['pesquisa'] = "%{$data['pesquisa']}%";
       }

        //Tratar melhor so filtros
       if(!$data['filtro']['situacao']['inativo']){
            $query .= 'and (situacao <> "inativo") ';
            
       }
        $dbh = conect();
		$sth = $dbh->prepare($query);

		$sth->execute($parametros);

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
        $data['codigo'] = isset($data['codigo'])?$data['codigo']:'';
        if($data['codigo'] == ''){
            $data['msg'] = 'Codigo invalido';
            return $data;
        }

        //Pegar cabecario
        $dbh = conect();

		$sth = $dbh->prepare('SELECT 
			*
			FROM    treinamento
			WHERE   codigo = :codigo
   		');

		$sth->execute(['codigo'=>$data['codigo']]);

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
        $data['detalhe']['ciclos']=[];
        
        //Listar ciclos
        for ($i=1; $i <= (int)$data['detalhe']['ciclo']; $i++) { 
            //Listar exercicios dos ciclos
            $data['detalhe']['ciclos'][$i] = [];

            $dbh = conect();
            $sth = $dbh->prepare('SELECT 
                    treinamento_exercicio.*,
                    exercicio.nome as exercicio_nome,
                    exercicio.descricao
                FROM `treinamento_exercicio`
                inner join exercicio on treinamento_exercicio.exercicio = exercicio.codigo
                where 
                    treinamento_exercicio.treinamento = :treinamento
                    and treinamento_exercicio.ciclo = :ciclo
                order by sequencia
            ');
    
            $sth->execute([
                'treinamento'=>$data['codigo'],
                'ciclo'=>$i
            ]);
    
            if($sth->errorInfo()[1]!=0) {
                $data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
                return $data;
            }
    
            $data['detalhe']['ciclos'][$i] = $sth->fetchAll(PDO::FETCH_ASSOC);
        }

        $dbh = conect();
		$sth = $dbh->prepare('SELECT 
                treinamento_exercicio.*,
                exercicio.nome as exercicio_nome,
                exercicio.descricao
            FROM `treinamento_exercicio`
            inner join exercicio on treinamento_exercicio.exercicio = exercicio.codigo
			where 
                treinamento_exercicio.treinamento = :treinamento
            order by ciclo, sequencia
        ');

		$sth->execute(['treinamento'=>$data['codigo']]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $resposta = $sth->fetchAll(PDO::FETCH_ASSOC);


        $data['detalhe']['exercicios'] = $resposta;


        //Finazliar
        $data['result'] = true;
        $data['msg'] = 'Detalhado';
        
        return $data;
    }

    //
	static function _atualizar($data){
		//Tratar academia/ não implemantado
		$data['academia'] = '1';

		//Tratar codigo
		if(!isset($data['codigo'])){
			$data['msg'] = 'Codigo invalido';
			return $data;
		}
		
		//Tratar nome
		$data['nome'] = isset($data['nome'])?$data['nome']:'';
		if($data['nome'] == ''){
			$data['msg'] = 'Nome é obrigatorio';
			return $data;
		}

		//Tratar ciclo
		$data['ciclo'] = isset($data['ciclo'])?$data['ciclo']:1;
		if((int)$data['ciclo'] < 1){
			$data['msg'] = 'Ciclo não pode ser menor que 1';
			return $data;
		}

		//Tratar descricao/ não obrigatorio
		$data['descricao'] = isset($data['descricao'])?$data['descricao']:'';
			
        //var_dump($data); die();
		
        $dbh = conect();
		$sth = $dbh->prepare('UPDATE treinamento SET 
            nome = :nome,
            descricao = :descricao,
            ciclo = :ciclo,
            situacao = :situaca
			
			where codigo = :codigo
		');
		
		$sth->execute([
            /*'academia'=>$data['academia'],  não inplementado*/
            'nome'=>$data['nome'],
            'descricao'=>$data['descricao'],
            'ciclo' =>$data['ciclo'],
			'codigo' =>$data['codigo'], 
            'situaca' =>$data['situacao']		
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
        
		$data['msg'] = 'Atualizado';
		$data['result'] = true;
		return $data;
	}
}
