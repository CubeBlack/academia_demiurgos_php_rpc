<?php
class Core{
    static function parametroOpcional($data, $parametro, $valorPadrao = ''){
        $data[$parametro] = (isset($data[$parametro]))?$data[$parametro]:$valorPadrao;
        return $data;
    }

    static function parametroObrigatorio($data, $parametro){
		if(!isset($data[$parametro])){
			$data['msg'] = "Parametro '$parametro' é obrigatorio";
            $data['parametro_obrigatorio'] = false;
            return $data;
		}

        $data['parametro_obrigatorio'] = true;
        return $data;
    }
}