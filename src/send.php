<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Принимаем все данные пользователя
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = $_POST["email"];
    $prefix = $_POST["prefix"];
    $phone = preg_replace('/[^0-9]/', '', $_POST["phone"]);
    $country = $_POST["country"];
    $language = $_POST["language"];
    $url = substr($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'], 0, -9);
    $ip = $_POST["ip"];
    $dates = date("Y-m-d");
    $time = date("H:i:s");
    $comment = $_POST["comment"];
    $client = '-';

    //Входящие данные
    $utm_source = $_POST["utm_source"];
    $utm_medium = $_POST["utm_medium"];
    $utm_term = $_POST["utm_term"];
    $utm_content = $_POST["utm_content"];
    $utm_campaign = $_POST["utm_campaign"];
    $source_type = '-';
    $campaign_id = '-';
    $gbid = '-';
    $ad_id = '-';
    $source = '-';
    $device_type = '-';
    $region_name = '-';
    $region_id = '-';
    $phrase_id = '-';
    $crm_id = '-';
    $crm_status = '-';
    $crm_deposit = '-';

    if(strpos($utm_campaign, '|') !== false) {
        $utm_campaign_explode = explode("|", $utm_campaign);
        $source_type = $utm_campaign_explode[0];
        $campaign_id = $utm_campaign_explode[1];
    }else{
        $utm_campaign = $_POST["utm_campaign"];

    }

    if(strpos($utm_content, '|') !== false) {
        $utm_content_explode = explode("|", $utm_content);
        $gbid = $utm_content_explode[1];
        $ad_id = $utm_content_explode[3];
        $source = $utm_content_explode[4];
        $device_type = $utm_content_explode[5];
        $region_name = $utm_content_explode[6];
        $region_id = $utm_content_explode[7];
        $phrase_id = $utm_content_explode[9];
    }else{
        $utm_content = $_POST["utm_content"];

    }

    //Получаем дату, по часовому поясу
        $date = new DateTime('now', new DateTimeZone('Europe/Kiev'));
        $today = $date->format('H:i:s');

    //Подключение к базе.
        $hostname = 'bz371261.mysql.tools'; $username = 'bz371261_leads'; $password = '6r#NZ!nj35'; $basename = 'bz371261_leads'; $db_table = 'leads';
        $conn = new mysqli($hostname, $username, $password, $basename) or die ('Невозможно открыть базу');
        $conn->set_charset("utf8");

    //Собираю все данные и записываем в файл логов
        $leads_data = "$first_name, $last_name, $email, $prefix, $phone, $country, $language, $url, $ip, $dates, $time, $comment, $client, $utm_source, $utm_medium, $utm_term, $utm_content, $utm_campaign, $source_type, $campaign_id, $gbid, $ad_id, $source, $device_type, $region_name, $region_id, $phrase_id, $crm_id, $crm_status, $crm_deposit";
        file_put_contents('file/user_data.csv', $leads_data . PHP_EOL, FILE_APPEND | LOCK_EX);

    // Интеграции с партнерами по API
        function MeritGroup(){
        global $first_name, $last_name, $email, $prefix, $phone, $country, $language, $url, $ip, $dates, $time, $comment, $client, $utm_source, $utm_medium, $utm_term, $utm_content, $utm_campaign, $source_type, $campaign_id, $gbid, $ad_id, $source, $device_type, $region_name, $region_id, $phrase_id, $crm_id, $crm_status, $crm_deposit;
        $username = 'api_meritkapital';
        $password = 'LS1ffZKgJmQTL3rc';
        $secret = 'tIPQzqyHoC7XLlN3CaizylPvbRlE0VNp';
        $token = $username.'--'.md5($password).'--'.md5($username.$password.$secret).'/';
        $string = "CreateLiveAccount";
        $user_password = "123456Aa";
        $currency = "USD";
        $assigned_to = "34";
        $zone = "RU";
        $url_crm = 'http://affiliate.api.skaleapps.io/api/v1/';
        $post = array(
            "first_name" => $first_name,
            "last_name" => $last_name,
            "password"=>$user_password,
            "currency"=>$currency,
            "email" => $email,
            "assigned_to" => $assigned_to,
            "lead_status" => "New",
            "lead_source" => $url,
            "country" => $country,
            "phone" => $phone,
            "ip" => $ip,
            "language" =>$language,

            "zone"=>$zone,
            "network"=>$source,
            "mtg1"=>$region_name,
            "mtg2"=>$region_id,
            "ad_id"=>$ad_id,
            "ad_group"=>$gbid,
            "campaign_id"=>$campaign_id,
            "sem_mt"=>$phrase_id,
            "media"=>$device_type,
            "sem_sq"=>$source_type,

            "utm_campaign" => $utm_campaign,
            "utm_medium" => $utm_medium,
            "utm_source" => $utm_source,
            "utm_term" => $utm_term,
            "utm_content" => $utm_content,
            "description" => $comment,
        );
        $ch = curl_init($url_crm . $token . $string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        $data = curl_exec($ch);
        curl_close($ch);
        $crm_data = "$first_name, $last_name, $email, $prefix, $phone, $country, $language, $url, $ip, $dates, $time, $comment, $client, $utm_source, $utm_medium, $utm_term, $utm_content, $utm_campaign, $source_type, $campaign_id, $gbid, $ad_id, $source, $device_type, $region_name, $region_id, $phrase_id, $crm_id, $crm_status, $crm_deposit, $data";
        file_put_contents('file/user_api.csv', $crm_data . PHP_EOL, FILE_APPEND | LOCK_EX);
        $result_api = json_decode($data);
        $crm_id = $result_api->object->tp_id;
    }

    //Проверяем на наличие дублей
        $sql = $conn->query("SELECT COUNT(*) as count FROM ".$db_table." WHERE ( `email` = '".$email."' )");
        $row = mysqli_fetch_assoc( $sql );
        if($row['count']==0){
            MeritGroup();
            $client = 'MeritGroup';
            $sql = $conn->query("INSERT INTO ".$db_table." (first_name, last_name, email, prefix, phone, country, language, url, ip, dates, time, comment, client, utm_campaign, utm_medium, utm_source, utm_term, utm_content, source_type, campaign_id, gbid, ad_id, source, device_type, region_name, region_id, phrase_id, crm_id, crm_status, crm_deposit, copy) VALUES ('$first_name', '$last_name', '$email', '$prefix', '$phone', '$country', '$language', '$url', '$ip', '$dates', '$time', '$comment', '$client', '$utm_campaign', '$utm_medium', '$utm_source', '$utm_term', '$utm_content', '$source_type', '$campaign_id', '$gbid', '$ad_id', '$source', '$device_type', '$region_name','$region_id', '$phrase_id', '$crm_id','$crm_status','$crm_deposit','New')");
            $result = $conn->query($sql);
            //Собираю все данные + результат api
        }else{
            $sql = $conn->query("INSERT INTO ".$db_table." (first_name, last_name, email, prefix, phone, country, language, url, ip, dates, time, comment, client, utm_campaign, utm_medium, utm_source, utm_term, utm_content, source_type, campaign_id, gbid, ad_id, source, device_type, region_name, region_id, phrase_id, crm_id, crm_status, crm_deposit, copy) VALUES ('$first_name', '$last_name', '$email', '$prefix', '$phone', '$country', '$language', '$url', '$ip', '$dates', '$time', '$comment', '$client', '$utm_campaign', '$utm_medium', '$utm_source', '$utm_term', '$utm_content', '$source_type', '$campaign_id', '$gbid', '$ad_id', '$source', '$device_type', '$region_name','$region_id', '$phrase_id', '$crm_id','$crm_status','$crm_deposit','Copy')");
            $result = $conn->query($sql);
        }

} else{
    //Проверка на пидарасов. Если делает GET - шлем нахуй. Если POST принимаем данные и делаем всю хуйню вверху.
    header("HTTP/1.0 404 Not Found");
    //Когда установил заголовок - вывожу ошибку, что страницы нет.
    echo '<h1>Error #404</h1>';
}
?>