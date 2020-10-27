<?php
header('Content-Type: application/json');

require '../Requests-master/library/Requests.php';
Requests::register_autoloader();
require '../lib/culqi.php';

use Culqi\Culqi;

$SECRET_API_KEY = 'sk_test_ycVwQxv6MwqDPHjc';

$culqi = new Culqi(array('api_key' => $SECRET_API_KEY));

try {
  // Creando Cargo a una tarjeta
  $subscription = $culqi->Subscriptions->create(
    array(
        "card_id" => $_POST["cardId"],
        "plan_id" => $_POST["planId"]
    )
  );

  // Respuesta
  echo json_encode($subscription);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
