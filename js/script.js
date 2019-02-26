/*---ARRAY---*/
var Pacientes = new Array();

/*------*/
var ventanaEliminar;

/*---OBJETO---*/
function Paciente(nombre, dni, telefono, email, fecha, red){
	this.nombre = nombre;
	this.dni = dni;
	this.telefono = telefono;
	this.email = email;
	this.fecha = fecha;
	this.red = red;
}

/*---GUARDAR PACIENTE---*/
function GuardarPaciente(nombre, dni, telefono, email, fecha, red){
	let Posicion = Pacientes.push(new Paciente(
		nombre,
		dni,
		"+34" + telefono,
		email,
		fecha,
		red,
	)) - 1;
	console.log(Pacientes);
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
function validarTecla(e){
	let tecla = e.which || e.keyCode;
	if((tecla >= 65 && tecla <= 90) || (tecla == 32) || (tecla >= 37 && tecla <= 40) || (tecla == 222) || (tecla == 16) || (tecla == 8) || (tecla == 46) || (tecla == 9)){ return true;	}
	else { return false; }
}

function validarDNI(DNI) {
	var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var str = DNI.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}

function validarTelefono(telefono){
	if(/^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/.test(telefono)) return true;
	return false;
}

function validarTelefonoEvento(e){
	let tecla = e.which || e.charCode;
	if((tecla >= 48 && tecla <= 57) || (tecla == 8) || (tecla == 46)  || (tecla >= 37 && tecla <= 40) || (tecla == 9)){	return true; }
	else { return false; }
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

function validarURL(url){
	if(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url)) return true;
	return false;
}

/*---ESCRIBIR EN HTML Y MOSTRAR LOS DATOS---*/
function escribirHTML(id, contenido){
	document.getElementById(id).innerHTML = contenido;
}
function mostrarDatos(){
	let res = '<form name="formMostrar" class="col-12">';
	for (let i = 0; i < Pacientes.length; i++) {
		res += '<div id="' + i + '" class="row">'
		+ '<div class="col-md-1">'
		+ '<div class="font-weight-bold">#:</div>'
		+ '<div id="nombreRes" class="ellip" title="'+ (i + 1) + '">' + (i + 1) + '</div>'
		+ '</div>'
		+ '<div class="col-md-2">'
		+ '<div class="font-weight-bold">Nombre:</div>'
		+ '<div id="nombreRes" class="ellip" title="'+ Pacientes[i].nombre + '">' + Pacientes[i].nombre + '</div>'
		+ '</div>'
		+ '<div class="col-md-1">'
		+ '<div class="font-weight-bold">DNI:</div>'
		+ '<div id="dniRes" class="ellip" title="'+ Pacientes[i].dni.toUpperCase() + '">' + Pacientes[i].dni.toUpperCase() + '</div>'
		+ '</div>'
		+ '<div class="col-md-2">'
		+ '<div class="font-weight-bold">Teléfono:</div>'
		+ '<div id="telRes" class="ellip" title="'+ Pacientes[i].telefono + '"><a href=tel:' + Pacientes[i].telefono + '>' + Pacientes[i].telefono + '</a></div>'
		+ '</div>'
		+ '<div class="col-md-2">'
		+ '<div class="font-weight-bold">E-mail:</div>'
		+ '<div id="emailRes" class="ellip" title="'+ Pacientes[i].email + '"><a href=mailto:' + Pacientes[i].email + ' target="_blank">' + Pacientes[i].email + '</a></div>'
		+ '</div>'
		+ '<div class="col-md-1">'
		+ '<div class="font-weight-bold">Fecha:</div>'
		+ '<div id="fechaRes" class="ellip" title="'+ Pacientes[i].fecha + '">' + Pacientes[i].fecha + '</div>'
		+ '</div>'
		+ '<div class="col-md-2">'
		+ '<div class="font-weight-bold">Red social:</div>'
		+ '<div id="fechaRes" class="ellip" title="'+ Pacientes[i].red + '"><a href=' + Pacientes[i].red + ' target="_blank">' + Pacientes[i].red + '</a></div>'
		+ '</div>'
		+ '<div class="col-md-1">'
		+ '<label></label><br>'
		+ '<button class="col-12 btn btn-outline-danger ' + i + '" name="eliminar" type="button" tabindex="7" onclick="eliminarPaciente(' + i + ')"><i class="fas fa-trash"></i></button>'
		+ '</div>'
		+ '<div class="col-12">'
		+ '<hr>'
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
	let fechaData = new Date(document.formulario.fecha.value);
	let redSocial = document.formulario.redsocial.value;

	let respuestaError = '';

	if(!validarTexto(nombreData)) respuestaError += '* El nombre no es correcto<br/>';
	if(!validarDNI(dniData)) respuestaError += '* El DNI no es correcto<br/>';
	if(!validarTelefono(telefonoData)) respuestaError += '* El telefono no es correcto<br/>';
	if(!validarEmail(emailData)) respuestaError += '* El email no es correcto<br/>';
	if(!validarFecha(fechaData)) respuestaError += '* La fecha es inferior a la fecha actual<br/>';
	if(!validarURL(redSocial)) respuestaError += '* La URL no es correcta';

	if(respuestaError == '') { // En caso de que haya un error, el campo no estará vacío
		document.getElementById('errores').style.display = 'none';
		if(GuardarPaciente(nombreData, dniData, telefonoData, emailData, fechaData.toLocaleDateString(), redSocial) >= 0) mostrarDatos();
	} else {
		document.getElementById('errores').style.display = 'block';
		escribirHTML('errores', '<p class="text-danger">' + respuestaError + '</p>');
	}
}

function primerPaciente(){
	nombre = 'Carlos Alvarez L.';
	dni = '12345678a';
	telefono = '654321987';
	email = 'alvarez15755@iesmarenostrum.com';
	fecha = new Date();
	fecha = fecha.toLocaleDateString();
	red = 'https://twitter.com/carlitos_al_li';
	GuardarPaciente(nombre, dni, telefono, email, fecha, red);
	mostrarDatos();

	nombre = 'Nelson Ramos G.';
	dni = '32165478g';
	telefono = '665478123';
	email = 'ramos99999@iesmarenostrum.com';
	fecha = new Date();
	fecha = fecha.toLocaleDateString();
	red = 'http://www.google.es';
	GuardarPaciente(nombre, dni, telefono, email, fecha, red);
	mostrarDatos();

	nombre = 'Alejandro Marin G.';
	dni = '45612378c';
	telefono = '564789123';
	email = 'marin99999@iesmarenostrum.com';
	fecha = new Date();
	fecha = fecha.toLocaleDateString();
	red = 'http://www.yahoo.es';
	GuardarPaciente(nombre, dni, telefono, email, fecha, red);
	mostrarDatos();

	nombre = 'Jesús Aldea';
	dni = '12345678f';
	telefono = '456789123';
	email = 'aldea99999@iesmarenostrum.com';
	fecha = new Date();
	fecha = fecha.toLocaleDateString();
	red = 'http://www.bing.es';
	GuardarPaciente(nombre, dni, telefono, email, fecha, red);
	mostrarDatos();

	nombre = 'Alberto Chillerón';
	dni = '78945612r';
	telefono = '654789123';
	email = 'chilleron99999@iesmarenostrum.com';
	fecha = new Date();
	fecha = fecha.toLocaleDateString();
	red = 'http://www.lol.es';
	GuardarPaciente(nombre, dni, telefono, email, fecha, red);
	mostrarDatos();
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

/*---IP---*/
function getIP(obj){
	return obj.ip;
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
  escribirHTML('fechaHoy', '<p class="text-success text-md-center">' + res + '</p>');
}

/*---HORA---*/
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  escribirHTML('hora', '<p class="text-success text-md-right"><b>' + h + ':' + m + ':' + s + '</b></p>');
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
        escribirHTML('navegador','<p class="text-success">' + navegador[i] + ': ' + pantallaSize() + '</p>');
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


/*---COOKIE---*/
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
		document.getElementById("cookieID").innerHTML = "<p class=\"m-0\">Bienvenido <b>" + user + "</b>!</p>";
		mostrarCookie();
    /*alert("Bienvenido " + user);*/
  } else {
     user = prompt("Por favor escriba su nombre:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function mostrarCookie() {
  var x = document.getElementById("cookieID");
  if (x.style.display === "none") {
    x.style.display = "block";
		x.style.transition = "all 1s";
  } else {
    x.style.display = "none";
		x.style.transition = "all 1s";
  }
}
