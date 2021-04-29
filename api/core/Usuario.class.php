<?php
class Usuario{
	const TIPO_ALUNO = 'aluno';
	const IPO_INSTRUTOR = 'instrutor';
	const TIPO_SUPORTE = 'suporte';

	static function lista()
	{
		$data = [
			'acao' => 'Usuario/lista',
			'result' => null,
			'lista' => [],
			'pesquisa' => 'Empty!',
			'check' => 'Empty'
		];
		$dbh = conect();
		$sth = $dbh->prepare(
			"SELECT 
				usuario.codigo, 
				usuario.nome, 
				usuario.email, 
				usuario.cpf,
				usuario.tipo,
				usuario.status
			FROM usuario
		"
		);
		$sth->execute();

		if ($sth->errorInfo()[1] != 0) {
			$data['msg'] = 'MySQL error ' . $sth->errorInfo()[1] . ': ' . $sth->errorInfo()[2];
			return $data;
		}

		$lista = $sth->fetchAll(PDO::FETCH_ASSOC);

		//Organizar retorno
		$data['lista'] = $lista;
		$data['result'] = true;
		$data['msg'] = 'Listado';
		$data['check'] = md5(serialize($lista));
		return $data;
	}
	//Verificar se um determinado usuario existe
	//Usuado para validar formulario
	static function existe(){
		
	}

	static function ADICIONAR(
		$nome, 
		$cpf, 
		$genero,
		$endereco,
		$numero,
		$bairro,
		$cidade,
		$estado,
		$telefone_a,
		$telefone_b,
		$email, 
		$senha, 
		$tipo
	){
		$dbh = conect();
		$sth = $dbh->prepare('
			INSERT INTO usuario SET 

			nome = :nome,
			cpf = :cpf,
			genero = :genero,
			endereco = :endereco,
			numero = :numero,
			bairro = :bairro,
			cidade = :cidade,
			estado = :estado,
			telefone_a = :telefone_a,
			telefone_b = :telefone_b,
			email = :email,
			senha = :senha,
			tipo = :tipo
		');

		$sth->execute([
			'nome' => $nome,
			'cpf' => $cpf,			
			'genero' => $genero,
			'endereco' => $endereco,
			'numero' => $numero,
			'bairro' => $bairro,
			'cidade' => $cidade,
			'estado' => $estado,
			'telefone_a' => $telefone_a,
			'telefone_b' => $telefone_b,
			'email' => $email,
			'senha' => $senha,
			'tipo' => $tipo


		]);

		if ($sth->errorInfo()[1] != 0) {
			die('Usuario/ADICIOANR(...) MySQL error ' . $sth->errorInfo()[1] . ': ' . $sth->errorInfo()[2]);
		}

		return $dbh->lastInsertId();
	}

	//Apenas o suporte deve ter acesso a essa funcão
	/*
	static function adicionar($data){
		die('Usuario::adicionar(): não inplementada');
		//nome é obrigatorio

		if ($data['nome'] == '') {
			$data['msg'] = 'O nome não deve ser vazio.';
			return $data;
		}


		//Verificar email
		$data['email'] = isset($data['email'])?$data['email']:'';
		if ($data['email'] != '') {

			$dbh = conect();
			$sth = $dbh->prepare('
				SELECT codigo from usuario 
				where email = :email
				limit 1
			');

			$sth->execute(['email' => $data['email']]);

			if ($sth->errorInfo()[1] != 0) {
				$data['msg'] = 'MySQL error ' . $sth->errorInfo()[1] . ': ' . $sth->errorInfo()[2];
				return $data;
			}

			$lista = $sth->fetchAll(PDO::FETCH_ASSOC);

			if (!empty($lista)) {
				$data['msg'] = 'Email já cadastrado, tente outro.';
				return $data;
			}
		}



		//Verificar senha
		$data['senha'] = isset($data['senha'])?$data['senha']:'';


		//novo dado do tipo usuario
		$data['codigo'] = Usuario::ADICIONAR(
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
	
		//var_dump($data['codigo']);
		

		$data['result'] = true;
		$data['msg'] = 'Usuario criado com sucesso';

		return $data;
	}
	*/

	static function detalhe($data)
	{

		if ($data['codigo'] == '') {
			$data['msg'] = 'Codigo Invalido';
			return $data;
		}

		$dbh = conect();
		$sth = $dbh->prepare('SELECT 
			codigo,
			nome,
			email, 
			ativo 
			from usuario 
			where codigo = :codigo
		');

		$sth->execute(['codigo' => $data['codigo']]);

		if ($sth->errorInfo()[1] != 0) {
			$data['msg'] = 'MySQL error ' . $sth->errorInfo()[1] . ': ' . $sth->errorInfo()[2];
			return $data;
		}

		$pesquisa = $sth->fetchAll(PDO::FETCH_ASSOC);

		if (empty($pesquisa)) {
			$data['msg'] = 'Usuario não encontrado';
			return $data;
		}

		$data['result'] = true;
		$data['msg'] = 'listado';

		$data = array_merge($data, $pesquisa[0]);

		return $data;
	}

	static function r_existePorCodigo($codigo)
	{
		$dbh = conect();
		$sth = $dbh->prepare('
			SELECT codigo from usuario 
			where codigo = :codigo
			limit 1
		');

		$sth->execute(['codigo' => $codigo]);

		if ($sth->errorInfo()[1] != 0) {
			die('Usuario::r_existePorCodigo(), MySQL error ' . $sth->errorInfo()[1]
				. ': ' . $sth->errorInfo()[2]);
		}

		$lista = $sth->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($lista)) {
			return true;
		}
	}

	static function r_existePorEmail($email)
	{
		$dbh = conect();
		$sth = $dbh->prepare('
			SELECT codigo from usuario 
			where email = :email
			limit 1
		');

		$sth->execute(['email' => $email]);

		if ($sth->errorInfo()[1] != 0) {
			die('Usuario::r_existePorEmail(), MySQL error ' . $sth->errorInfo()[1]
				. ': ' . $sth->errorInfo()[2]);
		}

		$lista = $sth->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($lista)) {
			return true;
		}
	}

	static function r_remover($codigo)
	{
		$dbh = conect();
		$sth = $dbh->prepare('DELETE FROM usuario 
			WHERE codigo = :codigo
		');
		$sth->execute(['codigo' => $codigo]);
	}

	static function r_eInstrutor()
	{
	}

	static function r_eAluno()
	{
	}
}
