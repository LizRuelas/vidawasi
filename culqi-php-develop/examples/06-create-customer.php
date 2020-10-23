<?php
/**
 * Ejemplo 6
 * Como crear un customer usando Culqi PHP.
 */

try {
  // Usando Composer (o puedes incluir las dependencias manualmente)
  require '../vendor/autoload.php';

  // Configurar tu API Key y autenticación
  $SECRET_API_KEY = "{llave}";
  $culqi = new Culqi\Culqi(array('api_key' => $SECRET_API_KEY));

  // Creando Cargo a una tarjeta
  $customer = $culqi->Customers->create(
      array(
        "address" => $_POST["address"],
        "address_city" => $_POST["address_c"],
        "country_code" => $_POST["country"],
        "email" => $_POST["email"],
        "first_name" => $_POST["f_name"],
        "last_name" => $_POST["l_name"],
        "phone_number" => $_POST["phone"]
      )
  );
  // Respuesta
  echo json_encode($customer);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
