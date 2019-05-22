#Llamamos a nuestras librerias
Navegador = require('./libs/browser.js')
validateForm = require('./libs/validateForm.js')
scrollElement = require('./libs/scrollingElement.js')
utilities = require('./libs/utilities.js')
#Instanciamos nuestros objetos
validateGeneral = new validateForm
smothScrolling = new scrollElement
browser = new Navegador
util = new utilities

#Validamos versión del navegador
if browser.isVersion('chrome')
  console.log 'Estoy en chrome'

### Validación de formulario ###
form = document.getElementById("testForm")
txtNombre = document.getElementsByName("nombre")
txtDni = document.getElementsByName("dni")
txtEmail = document.getElementsByName("email")
txtCelular = document.getElementsByName("celular")
txtRuc = document.getElementsByName("ruc")

validateGeneral.isValidate(txtNombre, 'text')
validateGeneral.isValidate(txtDni, 'numeric')
validateGeneral.isValidate(txtEmail, 'email')
validateGeneral.isValidate(txtCelular, 'numeric')

$(form).validate(
  rules:
    nombre:
      required: true
      rangelength: [2, 150]
    dni:
      required: true
      min: 1
      rangelength: [8, 8]
    email:
      required: true
      emailCustom: true
    celular:
      required: true
      min:1
      valphone: true
    ruc:
      required:true
      ruc: true
    departamento:
      required: true
    terminos:
      required: true
  messages:
    nombre:
      required: 'Ingresa un Nombre(s)'
      rangelength: 'Ingresa un Nombre(s)'
    dni:
      required: 'Ingrese DNI'
      min: 'Ingrese un DNI válido'
      rangelength: 'Debe ingresar 8 dígitos'
    email:
      required: 'Ingresa un Correo'
      emailCustom: 'Ingresa un Correo válido'
    celular:
      required: 'Ingresa un Número celular'
      min: 'Ingresa un Número celular'
      valphone: 'Ingresa un Celular válido'
    ruc:
      required:'Ingresa un RUC'
      ruc: 'Ingresar un RUC válido'
    departamento:
      required: 'Selecciona un departamento'
    terminos:
      required: 'Debe aceptar los términos y condiciones'


  errorPlacement:(error, element)->
    ## change of position
    $element =  $(element)
    type = $element.prop("type").toLowerCase()
    if type is "checkbox"
      $element.parents(".checkWrapper").append(error)
    else
      $(element).parent().append(error)

  highlight:(element)->
    ##add class error
    $element = $(element).parent()
    $element.addClass('error')
    console.log element

  unhighlight:(element)->
    ##remove class error
    $element = $(element).parent()
    $element.removeClass('error')
)
### Fin de la Validación de formulario ###


### Usamos Libreria Utilidades ###

## Tab
util.tabsNew('.pesTab', '.conTab')

## Llevar al inicio del Body
util.topScroll("#topBody")

## Usar data-id Para indicar em que ID debe posicionarse
# initCallback = ->
#   console.log("termino la animacion");
#   return
# util.scrollElement('.linkBtn','.boxContain', 600, initCallback)

## Uso de parametros
valParameter = util.getParameterByName("col")
if valParameter is ""
  document.getElementById("textParam").innerHTML = "Ud no ha ingresado ningún parámetro"
else
  document.getElementById("idParam").innerHTML = valParameter

## Accordeon
util.accordion("title-accordion")

## Slider Simple
sliderOwl = $('#slider')
sliderOwl.owlCarousel
  items: 1
  loop: true
  margin: 0
  nav: true
  dots: true
  animateOut: 'fadeOut'  #Cambio de transición
  video: true

## Carousel Simple
carouselOwl = $('#carousel')
carouselOwl.owlCarousel
  loop: false
  margin: 10
  nav: true
  dots: true
  responsive:
    0:
      items: 1
      nav: false
    600:
      items: 2
    1000:
      items: 3
