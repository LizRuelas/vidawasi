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
  $customer = $culqi->Customers->create(
      array(
        "address" => $_POST["address"],
        "address_city" => $_POST["city"],
        "country_code" => $_POST["country"],
        //"country_code" => "PE",
        "email" => $_POST["email"],
        "first_name" => $_POST["first_name"],
        "last_name" => $_POST["last_name"],
        "phone_number" => $_POST["phone_number"],
        "metadata" => array(
          "tipo_documento" =>  $_POST["typeDocument"] ,
          "numero_documento" =>  $_POST["numberDocument"]
        ),
      )
  );
  // Respuesta

  echo json_encode($customer);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
