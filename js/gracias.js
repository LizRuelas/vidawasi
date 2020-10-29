$(document).ready(function() {
	console.log( "ready!" );

	document.getElementById('txtnombre').innerText = localStorage.getItem('nombre');
	document.getElementById('txtapellido').innerText = localStorage.getItem('apellido');
	document.getElementById('txtcargo').innerText = localStorage.getItem('cargo');
	document.getElementById('txtmoneda').innerText = localStorage.getItem('moneda');
	document.getElementById('txtmonto').innerText = localStorage.getItem('monto');
});