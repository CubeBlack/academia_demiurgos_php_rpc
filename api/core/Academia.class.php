<?php
Class Academia{
    static function adicionar($data){
        //Verificar o nome
        if(!isset($data['nome'])){
            $data['msg'] = 'Nome invalido';
            return $data;
        }

        //r_exsitePorNome()
        $dbh = conect();
        $sth = $dbh->prepare('SELECT codigo from academia
            where nome = :nome
        ');

        $sth->execute(['nome'=>$data['nome']]);
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}

        if(!empty($sth->fetchAll(PDO::FETCH_ASSOC))){
            $data['msg'] = 'O nome já esta em uso';
            return $data;
        }

        //Verificar CNPJ
        if(!isset($data['cnpj'])){
            $data['msg'] = 'CNPJ invalido';
            return $data;
        }

        if($data['cnpj'] != ''){
            $dbh = conect();
            $sth = $dbh->prepare('SELECT codigo from academia
                where cnpj = :cnpj
            ');
    
            $sth->execute(['cnpj'=>$data['cnpj']]);
            if($sth->errorInfo()[1]!=0) {
                $data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
                return $data;
            }
    
            if(!empty($sth->fetchAll(PDO::FETCH_ASSOC))){
                $data['msg'] = 'O CNPJ já esta em uso';
                return $data;
            }
        }

        //Tratar email
        if(!isset($data['email'])){
            $data['msg'] = 'E-mail invalido';
            return $data;
        }

        if(Usuario::r_existePorEmail($data['email'])){
            $data['msg'] = 'Email já esta em uso';
            return $data;
        }

        //Tratar senha
        if(!isset($data['senha'])){
            $data['msg'] = 'Senha invalida';
            return $data;
        }

        if(strlen($data['senha']) > 7){
            $data['msg'] = 'Senha invalida. Deve ter pelo menos 8 caracere.';
            return $data;
        }

        //contatos
        if(!isset($data['contatos'])){
            $data['msg'] = 'Contato invalido';
            return $data;
        }

        if(count($data['contatos']) < 1){
            $data['msg'] = 'Deve ter pelo menos um contato';
            return $data;
        }

        //Adicionar usuario master
        $data['usuario_master'] = Usuario::r_adicionar(
            $data['nome'],
            $data['email'],
            '',
            $data['senha'],
            'academia'
        );

        if($data['usuario_master'] == 0){
            $data['msg'] = 'Não foi posivel criar o usuario master da academia';
            return $data;
        }

        foreach ($data['contatos'] as $indice => $contato) {
            if(!isset($contato['tipo']) || !isset($contato['valor'])){
                Usuario::r_remover($data['usuario_master']);
                Contato::r_removerPorUsuario($data['usuario_master']);

                $data['msg'] = 'Contato ' . count($data['contatos']) . ' invalido';
                return $data;
            }

            $data['contatos'][$indice]['codigo'] = Contato::r_adicionar(
                $data['usuario_master'],$contato['tipo'],$contato['valor']
            );
        }

		$dbh = conect();
		$sth = $dbh->prepare('INSERT INTO academia SET 
			codigo = null,
			nome = :nome,
			razao = :razao,
			cnpj = :cnpj,
            usuario_master = :usuario_master,
            ativo = :ativo
		');
		
		$sth->execute([
			'nome'=>$data['nome'],
			'razao'=>$data['razao'],
			'cnpj'=>$data['cnpj'],
            'ativo'=>$data['ativo'],
            'usuario_master'=>$data['usuario_master']
		]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
		}
        
        $data['codigo'] = $dbh->lastInsertId();
		$data['result'] = true;
        $data['msg'] = 'Academia criada com sucesso';
        
		return $data;
    }

    static function listar($data){
       
		$dbh = conect();
		$sth = $dbh->prepare('SELECT * FROM academia');
		$sth->execute();
		
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
        $sth = $dbh->prepare('SELECT * FROM academia
            where codigo = :codigo
        ');
		$sth->execute(['codigo'=>$data['codigo']]);
		
		if($sth->errorInfo()[1]!=0) {
			$data['msg'] = 'MySQL error '.$sth->errorInfo()[1].': '.$sth->errorInfo()[2];
			return $data;
        }

        $pesquisa = $sth->fetchAll(PDO::FETCH_ASSOC);

        if(empty($pesquisa)){
            $data['msg'] = 'Academia não encontrada';
            return $data;
        }

        $data['result'] = true;
        $data['msg'] = 'listado';
        
        $data['detalhe'] = $pesquisa[0];

        return $data;
    }
	static function atualizar($data){
		if(!isset($data['codigo'])){
            $data['msg'] = 'Codigo invalido';
            return $data;
		}
	}
}
