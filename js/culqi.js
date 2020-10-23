var amount = 10;
var currency = 'SOLES';
var typeDonar = 'ÚNICA'
var newCurrency = null;
var inputAmount = document.getElementById('amount');

$(".btn-group > label.amountSelect").on("click", function(event){
  amount = this.innerText

  if (amount == 'OTRO MONTO') {
      inputAmount.style.display = "block";

  } else {
    inputAmount.style.display = "none";
  }

});

$(".btn-group > label.btnCurrency").on("click", function(event){
  currency = this.innerText
});

$(".btn-group > label.typeDonar").on("click", function(event){
  typeDonar = this.innerText

});



$('#culqi').on('click', function (e) {
 
  if(currency == 'SOLES') {
    newCurrency = 'PEN'
    console.log(newCurrency)
  } else if(currency == 'DOLARES'){
    newCurrency = 'USD'
    console.log(newCurrency)
  }

  console.log(typeDonar)

  
  Culqi.publicKey = 'pk_test_8b2xvAw3SCrbpPov'

  Culqi.options({
    style: {
      logo: 'https://www.culqi.com/LogoCulqi.png',
      maincolor: '#6364F0'
    }
  });
  Culqi.settings({
    title: 'VIDAWASI',
    currency: newCurrency,
    description: 'Donación',
    amount: amount * 100
  });
  Culqi.open();
  e.preventDefault();
}); 


function culqi() {

  var monto_back = amount * 100;


  if (Culqi.token && typeDonar == 'ÚNICA') {
    console.log(Culqi.token.id , 'ÚNICA')
    $(document).ajaxStart(function(){
      run_waitMe();
    });
    $.ajax({
      type: 'POST',
      url: 'http://localhost/vidawasi/culqi-php-develop/examples/02-create-charge.php',
      data: { token: Culqi.token.id  , email: Culqi.token.email , monto_back ,newCurrency },
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
          alert(result.outcome.user_message);
        }
        if(result.object === 'error'){
            alert(result.user_message);
            $('body').waitMe('hide');
        }
      },
      error: function(error) {
        resultdiv(error)
      }
    });
  } else if(Culqi.token && typeDonar == 'MENSUAL') {
    console.log(Culqi.token.id ,'MENSUAL')
    //  $(document).ajaxStart(function(){
    //   run_waitMe();
    // });

    $.ajax({
      type: 'POST',
      url: 'http://localhost/vidawasi/culqi-php-develop/examples/03-create-plan.php',
      data: { monto_back , newCurrency , },
      datatype: 'json',
      success: function(data) {
        var result = "";
        if(data.constructor == String){
            result = JSON.parse(data);
        }
          if(data.constructor == Object){
            result = JSON.parse(JSON.stringify(data));
        }
        console.log(result)
        console.log(result.id)

        $.ajax({
          type: 'POST',
          url: 'http://localhost/vidawasi/culqi-php-develop/examples/02-create-charge.php',
          data: { token: Culqi.token.id  , email: Culqi.token.email , monto_back ,newCurrency },
          datatype: 'json',
          success: function(data) {
          
          },
          error: function(error) {
            resultdiv(error)
          }
        });
    
       },
      error: function(error) {
        resultdiv(error)
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


