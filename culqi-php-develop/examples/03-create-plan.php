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
  $plan = $culqi->Plans->create(
      array(
        "amount" =>  $_POST['monto_back'],
        "currency_code" => $_POST["newCurrency"],
        "interval" => "meses",
        "interval_count" => 1,
        "limit" => 12,
        "name" => "Plan Nuevo"
      )
  );
  // Respuesta
  echo json_encode($plan);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
