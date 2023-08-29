<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('charset=utf-8');

require_once 'config.php';
//Tratar endereço
define("SYS_DIR", dirname($_SERVER['SCRIPT_NAME']));

if(!isset($_REQUEST['r'])){
	die('Erro no .httacess, rewrite não esta funcionando');
}

$r = str_replace(dirname($_SERVER['SCRIPT_NAME']), '', $_REQUEST['r']);
//Remover valors do GET
$r = explode('?',$r)[0];
$pirces = explode('/', $r);

// Tratar acesso
$acesso = [];

// Resposta padrão
$resposta = [
    'valor' => false,
    'msg' => "Requisição '$r' não reconhecida ou você não tem permissão."
];


//Tratar Entidade
$entidade = 'Empty!';
if (isset($pirces[1])) {
    if ($pirces[1] != '') {
        $entidade = $pirces[1];
    }
}
$entidade = ucfirst($entidade);

//Tratar função
//função 'r_*' são funções  root, não devem ser acessadas externamente
$funcao = 'Empty!';
if (isset($pirces[2])) {
    if ($pirces[2] != '') {
        $funcao = $pirces[2];
    }
}

//Tratar entrada
$data = json_decode(file_get_contents('php://input'), true);
$data['acao'] = "{$entidade}/{$funcao}";
$data['result'] = false;
$data['msg'] = 'Empty!';

//Executar função
//try {
$data = $entidade::{'_'.$funcao}($data);
//} catch (\Throwable $th) {
//throw $th;

//    $resposta = [
//        'value'=>false,
//        'msg'=>'Core error: '.$th->getMessage()
//    ];

//}

//Tratar resposta

//Segurança da aplicação zerro]

//var_dump($data);
$strJson = json_encode($data);

if (!$strJson) echo json_encode([
    'value' => false,
    'msg' => 'PHP json_encode error'
]);
else {
    echo $strJson;
}
