<?php
    header("Content-type: application/json");
    
    function print_character_array($row, $character_size){
        if ($character_size === 1){
            return '"character":"' . $row['traditional_character'] . '",';
        }

        $output = '"character":[';

        for ($i = 0; $i < $character_size; $i++) {
            $output .= '"' . mb_substr($row['traditional_character'], $i, 1,'utf8') . '"';
            
            if($i < $character_size-1)
                $output .=',';
        }

        return $output .= '],';
    }

    $con = new mysqli("localhost","root","","chinese-website");

#   Set character_set_client and character_set_connection
    $con->query("SET character_set_client=utf8");
    $con->query("SET character_set_connection=utf8");

#   Set character_set_results
    $con->query("SET character_set_results=utf8");

    $sql = "SELECT * FROM dictionary";
    $res = $con->query($sql);
    $output = '';

    while ($row = $res->fetch_array()) {
        $character_size = mb_strlen($row['traditional_character'], 'utf8');
        $output .= '{';

        $output .= print_character_array($row, $character_size);
        //for v2
        //$output .= '"traditional_look_alikes":"' . $row['traditional_look_alikes'] . '",';
        //$output .= '"simplified_look_alikes":"' . $row['simplified_look_alikes'] . '",';

        $output .= '"pinyin":"' . $row['pinyin'] . '",';
        //$output .= '"part_of_speech":"' . $row['part_of_speech'] . '",';
        $output .= '"meaning":"' . $row['meaning'] . '",';
        $output .= '"lesson":' . $row['lesson'][0] . ',';
        $output .= '"dialogue":' . $row['dialogue'][0] . '';
        $output .= '},';
    }

    $output = substr($output,0, -1);
    mysqli_free_result($res);
    $con->close();   

    //if you need it for js use json_encode($output, JSON_PRETTY_PRINT);    
    echo '{"items":['.$output.']}';
?>
