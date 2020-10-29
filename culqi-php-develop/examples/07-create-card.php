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
  $card = $culqi->Cards->create(
    array(
      "customer_id" => $_POST["customerId"],
      "token_id" => $_POST["tokenId"],
      "validate" => 'false'
    )
  );
  // Respuesta
  echo json_encode($card);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
