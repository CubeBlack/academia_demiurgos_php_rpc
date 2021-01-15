<?php
//teste
define('T_DB_HOST',       'localhost');
define('T_DB_USER',       'root');
define('T_DB_PASS',       '1');
define('T_DB_NAME',       'academia');

//producao
define('DB_HOST',       'localhost');
define('DB_USER',       'id13269074_lord');
define('DB_PASS',       '&=SN7X%x#u?8cKTP');
define('DB_NAME',       'id13269074_kingdom');

//Valores do sistema
define('SYS_PATH',  dirname($_SERVER['PHP_SELF']).'/');
define('SYS_URL',  "http" . (isset($_SERVER['HTTPS']) ? (($_SERVER['HTTPS']=="on") ? "s" : "") : "") . "://" . $_SERVER["HTTP_HOST"].SYS_PATH);
define('SESSAO_TEMPO', 200);

spl_autoload_register(function ($class_name) {
    require_once "core/".$class_name . '.class.php';
});


//A conecção deve ser feita usando o padrão utf-8
function conect() {
    $dbh = null;
	$msg = 'in[ordinatio]/conect: ';
	//conectar com a produção
    try {
        $dbh = new PDO('mysql:host='. DB_HOST .';dbname=' .DB_NAME, DB_USER, DB_PASS);
    } catch (PDOException $e) {
		
		$msg = $msg . $e->getMessage() . '| ';
    }
    if(is_null($dbh)){}
    else return $dbh;
	
	//conectar teste
    try {
        $dbh = new PDO('mysql:host='. T_DB_HOST .';dbname=' . T_DB_NAME, T_DB_USER, T_DB_PASS);
    } catch (PDOException $e) {
		print '{
			"value":false,
			"msg":"' . $msg . $e->getMessage() . '"
		}';
		die();
    }
    if(is_null($dbh)) die("{
        'msg':'Database Erro 1: Não foi posivel a comunição com o BD',
        'value'false
    }");
    return $dbh;
}
