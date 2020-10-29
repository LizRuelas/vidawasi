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
  $charge = $culqi->Charges->create(
      array(
        "amount" => $_POST["monto_back"],
        "currency_code" =>  $_POST["newCurrency"],
        "email" => $_POST["email"],
        "source_id" => $_POST["token"],
        "metadata" => array(
          "nombre" =>  $_POST["nombre"] ,
          "apellido" =>  $_POST["apellido"] ,
        ),
      )
  );
  // Response
  echo json_encode($charge);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
?>


