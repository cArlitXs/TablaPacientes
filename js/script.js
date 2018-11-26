/*---ARRAY---*/
var Pacientes = new Array();

/*------*/
var ventanaEliminar;

/*---OBJETO---*/
function Paciente(nombre, dni, telefono, email, fecha){
	this.nombre = nombre;
	this.dni = dni;
	this.telefono = telefono;
	this.email = email;
	this.fecha = fecha;
}

/*---GUARDAR PACIENTE---*/
function GuardarPaciente(nombre, dni, telefono, email, fecha){
	let Posicion = Pacientes.push(new Paciente(
		nombre,
		dni,
		telefono,
		email,
		fecha,
	)) - 1;
	return Posicion;
}

/*---VALIDADORES---*/
function validarTexto(texto) {
	let validador = true;
	if(texto.length <= 0) {
		validador = false;
	} else {
		let nom = texto.trim();
		nom = nom.split(' ').join('');
		for(let i = 0; i < texto.length; i++){
			if(!isNaN(nom[i])) validador = false;
		}
	}
	return validador;
}

function validarDNI(DNI) {
	var letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKET';
	var letraUltima = DNI.substring(8,9);
	var numeroDNINumbers = parseInt(DNI.substring(0,8));
	var letraUltimaMyus = letraUltima.toUpperCase();
	var division = parseInt(numeroDNINumbers % 23);
	if(!(DNI.length <= 0)) {
		if(letrasDNI.substring(division, division +1) === letraUltimaMyus) return true;
	}
	return false;
}

function validarFecha(fecha) {
	let hoy = new Date();
	let cita = new Date(fecha);
	let validador = false;
	if(cita > hoy) validador = true;
	return validador;
}

function validarEmail(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
	return false;
}

/*---ESCRIBIR EN HTML Y MOSTRAR LOS DATOS---*/
function escribirHTML(id, contenido){
	document.getElementById(id).innerHTML = contenido;
}
function mostrarDatos(){
	let res = '<form name="formMostrar">';
	for (let i = 0; i < Pacientes.length; i++) {
		res += '<div id="' + i + '" class="row">'
		+ '<div>'
		+ '<div class="row">'
		+ '<div class="col-2 col-s-12">'
		+ '<div>Nombre:</div>'
		+ '<div id="nombreRes" class="data">' + Pacientes[i].nombre + '</div>'
		+ '</div>'
		+ '<div class="col-2 col-s-12">'
		+ '<div>DNI:</div>'
		+ '<div id="dniRes" class="data">' + Pacientes[i].dni + '</div>'
		+ '</div>'
		+ '<div class="col-2 col-s-12">'
		+ '<div>Teléfono:</div>'
		+ '<div id="telRes" class="data">' + Pacientes[i].telefono + '</div>'
		+ '</div>'
		+ '<div class="col-2 col-s-12">'
		+ '<div>E-mail:</div>'
		+ '<div id="emailRes" class="data">' + Pacientes[i].email + '</div>'
		+ '</div>'
		+ '<div class="col-2 col-s-12">'
		+ '<div>Fecha:</div>'
		+ '<div id="fechaRes" class="data">' + Pacientes[i].fecha + '</div>'
		+ '</div>'
		+ '<div class="col-2 col-s-12">'
		+ '<label></label><br>'
		+ '<button class="button button3 ' + i + '" name="eliminar" type="button" tabindex="7" onclick="eliminarPaciente(' + i + ')">Eliminar</button>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	}
	res += '</form>';
	escribirHTML('datos', res);
}

function enviarDatos() {
	let nombreData = document.formulario.nombre.value;
	let dniData = document.formulario.dni.value;
	let telefonoData = document.formulario.telefono.value;
	let emailData = document.formulario.email.value;
	let fechaData = document.formulario.fecha.value;

	let respuestaError = '';

	if(!validarTexto(nombreData)) respuestaError += '* El nombre no es correcto<br/>';
	if(!validarDNI(dniData)) respuestaError += '* El DNI no es correcto<br/>';
	if(!telefonoData || isNaN(telefonoData)) respuestaError += '* El telefono no es correcto<br/>';
	if(!validarEmail(emailData)) respuestaError += '* El email no es correcto<br/>';
	if(!validarFecha(fechaData)) respuestaError += '* La fecha es inferior a la fecha actual<br/>';

	if(respuestaError == '') { // En caso de que haya un error, el campo no estará vacío
		document.getElementById('errores').style.display = 'none';
		if(GuardarPaciente(nombreData, dniData, telefonoData, emailData, fechaData) >= 0) mostrarDatos();
	} else {
		document.getElementById('errores').style.display = 'block';
		escribirHTML('errores', '<p style="color:red;">' + respuestaError + '</p>');
	}
}

/*---ELIMINAR PACIENTE---*/
function eliminarPaciente(Posicion) {
	var Ventana = window.open('./eliminar.html','Eliminar','top=300px, left=500px, height=300px, width=500px');
	Ventana.Posicion = Posicion;
}
var Posicion;
function confirmar(){
	var ventana_que_abre = window.opener;
	ventana_que_abre.eliminarCompleto(Posicion);
	this.close();
}
function eliminarCompleto(pos){
	document.getElementById(pos).style.display = 'none';
	Pacientes.splice(pos, 1);
	escribirHTML('errores', '<p style="color:red;">Eliminado correctamente</p>');
}

/*---FECHA---*/
function dia(){
	var fecha = new Date();
  var dia = fecha.getDate();
  var numMes = fecha.getMonth();
  var mes;
  switch(numMes){
      case 0:
          mes = 'Enero';
          break;
      case 1:
          mes = 'Febrero';
          break;
      case 2:
          mes = 'Marzo';
          break;
      case 3:
          mes = 'Abril';
          break;
      case 4:
          mes = 'Mayo';
          break;
      case 5:
          mes = 'Junio';
          break;
      case 6:
          mes = 'Julio';
          break;
      case 7:
          mes = 'Agosto';
          break;
      case 8:
          mes = 'Setiembre';
          break;
      case 9:
          mes = 'Octubre';
          break;
      case 10:
          mes = 'Noviembre';
          break;
      case 11:
          mes = 'Diciembre';
          break;
      default:
          mes = 'No hay mes';
          break;
  }
  var anyo = fecha.getFullYear();
  var res = dia + ' de ' + mes + ' de ' + anyo;
  escribirHTML('fechaHoy', '<p style="text-align:center; color: #4CAF50;">' + res + '</p>');
}

/*---HORA---*/
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  escribirHTML('hora', '<p style="text-align:right; color: #4CAF50;"><b>' + h + ':' + m + ':' + s + '</b></p>');
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

/*---SCREEN Y NAVIGATOR---*/
function nombreNavegador(){
  var nombreG = navigator.userAgent;
  var navegador = ['Edge', 'Safari', 'Chrome', 'Firefox'];
  for(var i = 0; i < navegador.length; i++){
    if(nombreG.indexOf(navegador[i]) != -1)
        escribirHTML('navegador','<p style="text-align:left; color: #4CAF50;">' + navegador[i] + ': ' + pantallaSize() + '</p>');
  }
}

function pantallaSize(){
	var tam = screen.width;
	var respuesta = "Desktop";
	if(tam < 1024){
		respuesta = "Tablet";
		if(tam < 420){
			respuesta = "Mobile";
		}
	}
	return respuesta;
}

/*function ordenar(){
	Pacientes.sort();
	mostrarDatos();
}*/
