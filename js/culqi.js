var amount = 10;
var currency = 'SOLES';
var typeDonar = 'ÚNICA'
var newCurrency = null;
var inputAmount = document.getElementById('amount');
var myData = null;
var amountFinal = null;
var other = null;

var checkTerms = false;

$(".btn-group > label.amountSelect").on("click", function(event){
  amount = this.innerText
  console.log(amount)
});

$("#botonDescription").on("click", function(event){
 
  if(amount == 'OTRO MONTO'){
    console.log(inputAmount.value + 'CLICK NEXT')
    other = inputAmount.value;
  }
});


$(".btn-group > label.btnCurrency").on("click", function(event){
  currency = this.innerText
});

$(".btn-group > label.typeDonar").on("click", function(event){
  typeDonar = this.innerText
});

$("#checkbox1").on('change', function() {
  if ($(this).is(':checked')) {
    $(this).attr('value', 'true');
  } else {
    $(this).attr('value', 'false');
  }
  
  console.log($('#checkbox1').val())
   checkTerms = $('#checkbox1').val();
});

$('#culqi').on('click', function (e) {

  console.log(typeof checkTerms)
  if(checkTerms == 'true') {
    
  //customer
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var country = document.getElementById('country').value;
  var email = document.getElementById('email').value; 
  var first_name = document.getElementById('name').value; 
  var last_name = document.getElementById('lastName').value; 
  var phone_number = document.getElementById('phone').value; 
  var typeDocument = document.getElementById('typeDocument').value; 
  var numberDocument = document.getElementById('number').value; 
  myData = { 
    address : address,
    city : city,
    country:  country,
    email: email , 
    first_name: first_name , 
    last_name: last_name, 
    phone_number: phone_number, 
    typeDocument: typeDocument, 
    numberDocument: numberDocument
  }

    if(currency == 'SOLES') {
      newCurrency = 'PEN'

    } else if(currency == 'DOLARES'){
      newCurrency = 'USD'
    }

    if(amount == 'OTRO MONTO') {
      amountFinal = other;
    } else {
      amountFinal = amount;
    }

    console.log(amountFinal, 'CLICK')

    Culqi.publicKey = 'pk_test_8b2xvAw3SCrbpPov'

    Culqi.options({
      style: {
        logo: 'https://www.vidawasiperu.org/wp-content/themes/tema_vidawasi/favicon/apple-touch-icon.png',
        maincolor: '#ED2446'
      }
    });
    Culqi.settings({
      title: 'VIDAWASI',
      currency: newCurrency,
      description: 'Donación ' + typeDonar,
      amount: amountFinal * 100
    });

    
    Culqi.open();
    e.preventDefault();
  } 

}); 


function culqi() {
  var monto_back = amountFinal * 100;
  console.log(monto_back)

  if (Culqi.token && typeDonar == 'ÚNICA') {
    console.log(Culqi.token.id , 'ÚNICA')
    $(document).ajaxStart(function(){
      run_waitMe();
    });
    
    console.log(myData.first_name)
    $.ajax({
      type: 'POST',
      url: 'http://localhost/vidawasi/culqi-php-develop/examples/02-create-charge.php',
      data: { token: Culqi.token.id  , email: Culqi.token.email , monto_back ,newCurrency , nombre: myData.first_name , apellido: myData.last_name },
      datatype: 'json',
      success: function(data) {
        var result = "";
          if(data.constructor == String){
              result = JSON.parse(data);
          }
          if(data.constructor == Object){
              result = JSON.parse(JSON.stringify(data));
          }
        if(result.object === 'charge'){
          alert('La transacción ha sido completamente exitosa');
          console.log(result)

  
          localStorage.setItem('nombre', myData.first_name);
          localStorage.setItem('apellido', myData.last_name);
          localStorage.setItem('cargo', typeDonar);
          localStorage.setItem('moneda', result.currency_code);
          localStorage.setItem('monto', result.amount / 100);

          $(window).attr('location','http://localhost/vidawasi/gracias.html')

        }
        if(result.object === 'error'){
            alert(result.user_message);
            $('body').waitMe('hide');
        }
      },
      error: function(error) {
        alert(error)
      }
    });
  } else if(Culqi.token && typeDonar == 'MENSUAL') {
    $(document).ajaxStart(function(){
      run_waitMe();
    });
    console.log(Culqi.token.id ,'MENSUAL')
    var tokenId = Culqi.token.id;
    

    $.ajax({
      type: 'POST',
      url: 'http://localhost/vidawasi/culqi-php-develop/examples/06-create-customer.php',
      // data: { address , city , country , email , first_name , last_name , phone_number , typeDocument , numberDocument},
      data: myData,
      datatype: 'json',
      success: function(data) {
        var customerId = data.id;
        if (customerId) {
          $.ajax({
          type: 'POST',
          url: 'http://localhost/vidawasi/culqi-php-develop/examples/07-create-card.php',
          data: { tokenId , customerId },
          datatype: 'json',
          success: function(data) {
            console.log(data.id)
            var cardId = data.id;
            if(cardId){
              $.ajax({
              type: 'POST',
              url: 'http://localhost/vidawasi/culqi-php-develop/examples/03-create-plan.php',
              data: { monto_back , newCurrency , },
              datatype: 'json',
              success: function(data) {
                console.log(data.id)
                var planId = data.id;
                if(planId){

                
                $.ajax({
                  type: 'POST',
                  url: 'http://localhost/vidawasi/culqi-php-develop/examples/04-create-subscription.php',
                  data: { cardId, planId },
                  datatype: 'json',
                  success: function(data) {
                    console.log(data.charges[0])
                    
                    if(data.id) {

                      alert('La transacción ha sido exitosa')
                      localStorage.setItem('nombre', myData.first_name);
                      localStorage.setItem('apellido', myData.last_name);
                      localStorage.setItem('cargo', typeDonar);
                      localStorage.setItem('moneda', data.charges[0].currency_code);
                      localStorage.setItem('monto', data.charges[0].amount / 100);

                      $(window).attr('location','http://localhost/vidawasi/gracias.html')
                    } else {
                      $('body').waitMe('hide');
                      alert(data)
                    }
                  },
                  error: function(error) {
                    console.log(error)
                    alert(error)
                  }
                });
              
                } else {
                  $('body').waitMe('hide');
                  alert(data)
                }
              },
                error: function(error) {
                  console.log(error)
                  alert(error)
                }
              });
            } else {
              $('body').waitMe('hide');
              alert(data)
            }
          },
          error: function(error) {
            $('body').waitMe('hide');
            console.log(error.responseText)
            alert(error.responseText)
          }
        });
        } else {
          $('body').waitMe('hide');

          var resultCustomer = "";
          if(data.constructor == String){
            resultCustomer = JSON.parse(data);
          }
          if(data.constructor == Object){
            resultCustomer = JSON.parse(JSON.stringify(data));
          }
          console.log(resultCustomer)

          const mensaje = resultCustomer['merchant_message']
          alert(mensaje + ' Por favor, usar otro correo en tus datos personales')
        }
      },
      error: function(error) {
        console.log(error)
        alert(error)
      }
    });
    
  }
   else {
    alert(Culqi.error.merchant_message);
    $('body').waitMe('hide');
  }
  
};
  
function run_waitMe(){
  $('body').waitMe({
    effect: 'orbit',
    text: 'Procesando pago ...',
    bg: 'rgba(255,255,255,0.7)',
    color:'#6364F0'
  });
}


