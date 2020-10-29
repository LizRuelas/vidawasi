;(function($) {
	"use strict";  
	
	//* Form js
	function verificationForm(){

		$("#terms").on("click", function(event){
			window.open('https://www.vidawasiperu.org/TERMINOS_CONDICIONES_PARA_DONACION.pdf', '_blank');
		});

		var amount = 10;
		var currency = 'SOLES';
		var typeDonar = 'ÚNICA'

		var inputAmount = document.getElementById('amount');

		var amountFinal = null;
			//jQuery time
			var current_fs, next_fs, previous_fs; //fieldsets
			var left, opacity, scale; //fieldset properties which we will animate
			var animating; //flag to prevent quick multi-click glitches

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

		function validOtherAmount(){
			console.log(inputAmount.value)
			if(inputAmount.value >= 1 && inputAmount.value <=2 ) {
				alert('El monto mínimo para donar es de 3 Soles o 3 Dólares. Por favor modifica el monto.')
				return false
			} else {
				return true
			}
		}
		$("#botonDescription").on("click", function(event){
			
				if(amount == 'OTRO MONTO'){
					amountFinal = inputAmount.value;

					if(validOtherAmount() == true) {
						if (animating) return false;
						animating = true;

						current_fs = $(this).parent();
						next_fs = $(this).parent().next();

						//activate next step on progressbar using the index of next_fs
						$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

						//show the next fieldset
						next_fs.show();
						//hide the current fieldset with style
						current_fs.animate({
								opacity: 0
						}, {
								step: function (now, mx) {
										//as the opacity of current_fs reduces to 0 - stored in "now"
										//1. scale current_fs down to 80%
										scale = 1 - (1 - now) * 0.2;
										//2. bring next_fs from the right(50%)
										left = (now * 50) + "%";
										//3. increase opacity of next_fs to 1 as it moves in
										opacity = 1 - now;
										current_fs.css({
												'transform': 'scale(' + scale + ')',
												'position': 'absolute'
										});
										next_fs.css({
												'left': left,
												'opacity': opacity
										});
								},
								duration: 800,
								complete: function () {
										current_fs.hide();
										animating = false;
								},
								//this comes from the custom easing plugin
								easing: 'easeInOutBack'
						});
					}

				} else {
					amountFinal = amount;
					if (animating) return false;
						animating = true;

						current_fs = $(this).parent();
						next_fs = $(this).parent().next();

						//activate next step on progressbar using the index of next_fs
						$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

						//show the next fieldset
						next_fs.show();
						//hide the current fieldset with style
						current_fs.animate({
								opacity: 0
						}, {
								step: function (now, mx) {
										//as the opacity of current_fs reduces to 0 - stored in "now"
										//1. scale current_fs down to 80%
										scale = 1 - (1 - now) * 0.2;
										//2. bring next_fs from the right(50%)
										left = (now * 50) + "%";
										//3. increase opacity of next_fs to 1 as it moves in
										opacity = 1 - now;
										current_fs.css({
												'transform': 'scale(' + scale + ')',
												'position': 'absolute'
										});
										next_fs.css({
												'left': left,
												'opacity': opacity
										});
								},
								duration: 800,
								complete: function () {
										current_fs.hide();
										animating = false;
								},
								//this comes from the custom easing plugin
								easing: 'easeInOutBack'
						});
				}

				
			
		});

		function validFormPerson(){
	
			var typeDocument =  document.getElementById('typeDocument').value;
			var number = document.getElementById('number').value;
			var name = document.getElementById('name').value;
			var lastName = document.getElementById('lastName').value;
			var email = document.getElementById('email').value;
			var phone = document.getElementById('phone').value;
			var city = document.getElementById('city').value;
			var address = document.getElementById('address').value;
	
			if (number == '' || name == '' || lastName == '' || email == '' || phone == ''  || city == '' || address== '') {
				alert('Por favor, asegurate de completar todos los campos')
				console.log(inputAmount)
				return false
			} else {
				console.log(inputAmount)
				console.log('SI')
				return true
			}
		}

		$("#resumen").click(function(){
			// validFormPerson()
			if(validFormPerson() == true) {
				if (animating) return false;
					animating = true;

					current_fs = $(this).parent();
					next_fs = $(this).parent().next();

					//activate next step on progressbar using the index of next_fs
					$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

					//show the next fieldset
					next_fs.show();
					//hide the current fieldset with style
					current_fs.animate({
							opacity: 0
					}, {
							step: function (now, mx) {
									//as the opacity of current_fs reduces to 0 - stored in "now"
									//1. scale current_fs down to 80%
									scale = 1 - (1 - now) * 0.2;
									//2. bring next_fs from the right(50%)
									left = (now * 50) + "%";
									//3. increase opacity of next_fs to 1 as it moves in
									opacity = 1 - now;
									current_fs.css({
											'transform': 'scale(' + scale + ')',
											'position': 'absolute'
									});
									next_fs.css({
											'left': left,
											'opacity': opacity
									});
							},
							duration: 800,
							complete: function () {
									current_fs.hide();
									animating = false;
							},
							//this comes from the custom easing plugin
							easing: 'easeInOutBack'
					});

					var name = document.getElementById('name').value;
					var lastName = document.getElementById('lastName').value;
					
					

					// $('#r_name').text(name + ' ' + lastName);
					$('#r_montoTotal').text(amountFinal + ' ' + currency)
					$('#r_typeDonation').text(typeDonar)

			}
		})

		$(".next").click(function () {

				if (animating) return false;
				animating = true;

				current_fs = $(this).parent();
				next_fs = $(this).parent().next();

				//activate next step on progressbar using the index of next_fs
				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

				//show the next fieldset
				next_fs.show();
				//hide the current fieldset with style
				current_fs.animate({
						opacity: 0
				}, {
						step: function (now, mx) {
								//as the opacity of current_fs reduces to 0 - stored in "now"
								//1. scale current_fs down to 80%
								scale = 1 - (1 - now) * 0.2;
								//2. bring next_fs from the right(50%)
								left = (now * 50) + "%";
								//3. increase opacity of next_fs to 1 as it moves in
								opacity = 1 - now;
								current_fs.css({
										'transform': 'scale(' + scale + ')',
										'position': 'absolute'
								});
								next_fs.css({
										'left': left,
										'opacity': opacity
								});
						},
						duration: 800,
						complete: function () {
								current_fs.hide();
								animating = false;
						},
						//this comes from the custom easing plugin
						easing: 'easeInOutBack'
				});
		});

		$(".previous").click(function () {
				if (animating) return false;
				animating = true;

				current_fs = $(this).parent();
				previous_fs = $(this).parent().prev();

				//de-activate current step on progressbar
				$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

				//show the previous fieldset
				previous_fs.show();
				//hide the current fieldset with style
				current_fs.animate({
						opacity: 0
				}, {
						step: function (now, mx) {
								//as the opacity of current_fs reduces to 0 - stored in "now"
								//1. scale previous_fs from 80% to 100%
								scale = 0.8 + (1 - now) * 0.2;
								//2. take current_fs to the right(50%) - from 0%
								left = ((1 - now) * 50) + "%";
								//3. increase opacity of previous_fs to 1 as it moves in
								opacity = 1 - now;
								current_fs.css({
										'left': left
								});
								previous_fs.css({
										'transform': 'scale(' + scale + ')',
										'opacity': opacity
								});
						},
						duration: 800,
						complete: function () {
								current_fs.hide();
								animating = false;
						},
						//this comes from the custom easing plugin
						easing: 'easeInOutBack'
				});
		});

		$(".submit").click(function () {
				return false;
		})

		


			
	}; 
	


	/*Function Calls*/  
	verificationForm ();

})(jQuery); 
