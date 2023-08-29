<?php
class Core{
    static function parametroOpcional($data, $parametro, $valorPadrao = ''){
        $data[$parametro] = (isset($data[$parametro]))?$data[$parametro]:$valorPadrao;
        return $data;
    }

    static function parametroObrigatorio($data, $parametro){
        $data = Core::parametroOpcional($data, 'parametro_obrigatorio', true);
		if(!isset($data[$parametro])){
			$data['msg'] = "Parametro '$parametro' é obrigatorio";
            $data['parametro_obrigatorio'] = false;
            return $data;
		}

        $data['parametro_obrigatorio'] = true && $data['parametro_obrigatorio'];
        return $data;
    }
}