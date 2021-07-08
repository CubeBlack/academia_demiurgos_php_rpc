<?php
class Treinamentoexercicio{
    static function _adicionar($data){
		//Obrigatorios
		if(!isset($data['treinamento'])){
			$data['msg'] = "'treinamento' é obrigatorio";
            return $data;
		}

		if(!isset($data['exercicio'])){
			$data['msg'] = "'exercicio' é obrigatorio";
            return $data;
		}

        //Opcionais
        $data = Core::parametroOpcional($data, 'ciclo', 1);
        $data = Core::parametroOpcional($data, 'sequencia', 1);
        $data = Core::parametroOpcional($data, 'duracao');
        $data = Core::parametroOpcional($data, 'duracao_tipo');
		
		//Inserir no BD
        $dbh = conect();
		$sth = $dbh->prepare('INSERT INTO treinamento_exercicio SET 
			treinamento = :treinamento,
            exercicio = :exercicio,
            ciclo = :ciclo,
            sequencia = :sequencia,
            duracao = :duracao,
            duracao_tipo = :duracao_tipo,
            modificacao = now()
		');
		
		$sth->execute([
            'treinamento'=>$data['treinamento'],
            'exercicio'=>$data['exercicio'],
            'ciclo'=>$data['ciclo'],
            'sequencia'=>$data['sequencia'],
            'duracao' =>$data['duracao'],		
            'duracao_tipo' =>$data['duracao_tipo']
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

    static function _atualizar($data){
		//Obrigatorios
        $data = Core::ParametroObrigatorio($data, 'codigo');
        if(!$data['parametro_obrigatorio']) return $data;

        //Pegar o exercicio
        $data['antes'] = Treinamentoexercicio::Detalhe($data["codigo"]);
        if(!$data['antes']) {
            $msg = "Exercicio não encotrando";
            return $data;
        }

        //Opcionais
        $data = Core::parametroOpcional($data, 'exercicio',    $data['antes']['exercicio']);
        $data = Core::parametroOpcional($data, 'treinamento',  $data['antes']['treinamento']);
        $data = Core::parametroOpcional($data, 'ciclo',        $data['antes']['ciclo']);
        $data = Core::parametroOpcional($data, 'sequencia',    $data['antes']['sequencia']);
        $data = Core::parametroOpcional($data, 'duracao',      $data['antes']['duracao']);
        $data = Core::parametroOpcional($data, 'duracao_tipo', $data['antes']['duracao_tipo']);
	
		//Atualizar no BD
        $dbh = conect();
		$sth = $dbh->prepare('UPDATE treinamento_exercicio SET 
			treinamento = :treinamento,
            exercicio = :exercicio,
            ciclo = :ciclo,
            sequencia = :sequencia,
            duracao = :duracao,
            duracao_tipo = :duracao_tipo,
            modificacao = now()

            WHERE
                codigo = :codigo
		');
		
		$sth->execute([
            'treinamento'=>$data['treinamento'],
            'exercicio'=>$data['exercicio'],
            'ciclo'=>$data['ciclo'],
            'sequencia'=>$data['sequencia'],
            'duracao' =>$data['duracao'],		
            'duracao_tipo' =>$data['duracao_tipo'],
            'codigo' => $data['codigo']
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

        //Reordenar exercicios do ciclo
        Treinamentoexercicio::reordenar($data['treinamento']);

        //        
        $data['result'] = true;
        $data['msg'] = 'Atualizado';

        return $data;
    }

    static function reordenar($treinamento){
        $dbh = conect();
		$sth = $dbh->prepare('UPDATE treinamento_exercicio SET 
            sequencia = (@rownum := if(@ciclo=ciclo, 1 + @rownum, 1)),
            ciclo = (@ciclo := ciclo)
            WHERE 0 = (@rownum:=0)
            AND 1 = (@ciclo:=1)
            AND treinamento = :treinamento
            ORDER BY ciclo ASC, sequencia ASC, modificacao DESC;
		');
		
		$sth->execute([
            'treinamento'=>$treinamento
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
    }

    /* Até entao desnecesario, removido por questão de segurança
    static function listar($data){
        //Tratar aluno
        //Listar
        $dbh = conect();
		$sth = $dbh->prepare('SELECT *
			FROM    treinamento 
   		');

		$sth->execute([
            // 'academia'=>$data['academia'] 
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
    */

    static function _remover($data){
        $data = Core::parametroObrigatorio($data, 'codigo');
        if(!$data['parametro_obrigatorio']) return $data;

        $data['exercicio'] = Treinamentoexercicio::detalhe($data['codigo']);
        if(!$data['exercicio']){
            $data['msg'] = 'Exercicio não encontrado';
        }

        $dbh = conect();
		$sth = $dbh->prepare("DELETE FROM treinamento_exercicio WHERE codigo = :codigo ");

		$sth->execute([":codigo"=>$data['codigo']]);

		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }
        Treinamentoexercicio::reordenar($data['exercicio']['treinamento']);
        $data['msg'] = 'Removido';
        $data['result'] = true;
        return $data;
    }
    
    static function _detalhe($data){
        $data = Core::parametroObrigatorio($data, 'codigo');
        
        $data['detalhe'] = Treinamentoexercicio::detalhe($data['codigo']);
        if(!$data['detalhe']){
            $data['msg'] = 'Não foi posivel encontra o exerciio';
            return $data;
        }

        $data['result'] = true;
        $data['msg'] = 'Detalhado';
        return $data;
    }
    
    static function detalhe($codigo){
        //Tratar aluno
        //Pegar cabecario
        $dbh = conect();
		$sth = $dbh->prepare('SELECT 
            treinamento_exercicio.codigo,
            treinamento_exercicio.treinamento,
            treinamento_exercicio.exercicio,
            exercicio.nome as exercicio_nome,
            exercicio.descricao as exercicio_descricao,
            treinamento_exercicio.duracao,
            treinamento_exercicio.duracao_tipo,
            treinamento_exercicio.ciclo,
            treinamento_exercicio.sequencia,
            treinamento_exercicio.modificacao
            
            FROM    treinamento_exercicio
            INNER JOIN 	exercicio on exercicio.codigo = treinamento_exercicio.exercicio
            WHERE   treinamento_exercicio.codigo = :codigo
        ');

		$sth->execute([
            'codigo'=>$codigo
        ]);

		if($sth->errorInfo()[1]!=0) {
			die('Treinamentoexercicio::Detalhe MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2]);
			return $data;
        }

        $resposta = $sth->fetchAll(PDO::FETCH_ASSOC);

        if(empty($resposta)){
            return null;
        }

        return $resposta[0];
    }

   
}
