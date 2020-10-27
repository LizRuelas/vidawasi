var amount = 10;
var currency = 'SOLES';
var typeDonar = 'ÚNICA'
var newCurrency = null;
var inputAmount = document.getElementById('amount');
var myData = null;
var amountFinal = null;
var other = null;

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

$('#culqi').on('click', function (e) {

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
    description: 'Donación' + typeDonar,
    amount: amountFinal * 100
  });
  Culqi.open();
  e.preventDefault();
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
      data: { token: Culqi.token.id  , email: Culqi.token.email , monto_back ,newCurrency , name: myData.first_name },
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
          console.log(' result.metadata.nombre' +  result.metadata.nombre)

          $('#finalName').text(result.metadata.nombre )

          $(window).attr('location','http://localhost/vidawasi/gracias.html')

          // $.ajax({
          //   type: 'POST',
          //   url: 'http://localhost/vidawasi/gracias.php',
          //   data: { result },
          //   datatype: 'json',
          //   success: function(data) {
          //     console.log(data)
              
          //   },
          //   error: function(error) {
          //     console.log(error)
          //     alert(error)
          //   }
          // });

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
    // $(document).ajaxStart(function(){
    //   run_waitMe();
    // });
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
        $.ajax({
          type: 'POST',
          url: 'http://localhost/vidawasi/culqi-php-develop/examples/07-create-card.php',
          data: { tokenId , customerId },
          datatype: 'json',
          success: function(data) {
            console.log(data.id)
            var cardId = data.id;
            $.ajax({
              type: 'POST',
              url: 'http://localhost/vidawasi/culqi-php-develop/examples/03-create-plan.php',
              data: { monto_back , newCurrency , },
              datatype: 'json',
              success: function(data) {
                console.log(data.id)
                var planId = data.id;
                $.ajax({
                  type: 'POST',
                  url: 'http://localhost/vidawasi/culqi-php-develop/examples/04-create-subscription.php',
                  data: { cardId, planId },
                  datatype: 'json',
                  success: function(data) {
                    console.log(data)
                    console.log(data.id)
                    // $(window).attr('location','http://localhost/vidawasi/gracias.php')

                    
                   
                  },
                  error: function(error) {
                    console.log(error)
                    alert(error)
                  }
                });
              },
                error: function(error) {
                  console.log(error)
                  alert(error)
                }
              });
          },
          error: function(error) {
            console.log(error)
            alert(error)
          }
        });

      },
      error: function(error) {
        console.log(error)
        alert(error)
      }
    });
    
      


    // $.ajax({
    //   type: 'POST',
    //   url: 'http://localhost/vidawasi/culqi-php-develop/examples/02-create-charge.php',
    //   data: { token: Culqi.token.id  , email: Culqi.token.email , monto_back ,newCurrency },
    //   datatype: 'json',
    //   success: function(data) {
    //    
    //   },
    //   error: function(error) {
    //     resultdiv(error)
    //   }
    // });
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


