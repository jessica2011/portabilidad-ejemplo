(function () {
  // var urlBase = '//apicatmov.dev2.phantasia.pe/api/',
  var urlBase = 'https://apicatmov.serviciosmovistar.com/api/',
    equipment,
    dataFreeValue = $('#dataFreeValue'),
    dataFreeName = $('#dataFreeName'),
    appIlimitatedValue = $('#appIlimitatedValue'),
    listApps = $('#listApps'),
    dataInterValue = $('#dataInterValue'),
    dataInterName = $('#dataInterName'),
    smsValue = $('#smsValue'),
    smsName = $('#smsName'),
    minutesValue = $('#minutesValue'),
    minutesName = $('#minutesName'),
    featuresText1 = $('#featuresText1'),
    featuresText2 = $('#featuresText2'),
    featuresText3 = $('#featuresText3'),
    featuresImage1 = $('#featuresImage1'),
    featuresImage2 = $('#featuresImage2'),
    featuresImage3 = $('#featuresImage3'),
    screenSize = $('#screenSize'),
    mainCamera = $('#mainCamera'),
    frontalCamera = $('#frontalCamera'),
    processor = $('#processor'),
    soType = $('#soType'),
    soVersion = $('#soVersion'),
    memory = $('#memory');

  var events = function () {
    // Carrusel de pasos online
    $(".carousel_pasos_online").owlCarousel({
      autoWidth: false,
      center: false,
      responsiveClass: true,
      margin: 0,
      mouseDrag: false,
      loop: false,
      items: 4,
      autoplay: true,
      responsive: {
        0: {
          margin: 0,
          items: 1,
          nav: false,
          dots: true,
        },
        768: {
          items: 2,
          nav: false,
          dots: true,
        },
        1024: {
          nav: false,
          dots: false,
        }
      }
    });
    // Inicio Planes Parrillas
    var carouselComponent;
    var acordeonClickInitialized = false;

    var acordeonInitialize = function () {
      if (!acordeonClickInitialized) {
        $('#planes-portabilidad .container .box_planes').on('click', '.headerPLan', function () {
          var e = $('#planes-portabilidad .container .box_planes .items_planes .portabilidad_plan');
          var m = $(this).parent();
          if (!m.hasClass('activePlan')) {
            e.removeClass('activePlan');
            m.addClass('activePlan');
          } else
            m.removeClass('activePlan');
        });
      }
      acordeonClickInitialized = true;
    };

    var carouselInitialize = function () {
      if (typeof (carouselComponent) === 'undefined') {
        carouselComponent = $("#js-p-slider").owlCarousel({
          autoWidth: false,
          center: false,
          responsiveClass: true,
          margin: 0,
          mouseDrag: false,
          loop: false,
          items: 4,
          // autoplay: true,
          responsive: {
            0: {
              margin: 0,
              items: 1,
              nav: false,
              dots: true,
            },
            768: {
              margin: 0,
              items: 2,
              nav: true,
              dots: false,
            },
            1024: {
              items: 3,
              nav: true,
              dots: false,
            },
            1280: {
              items: 4,
              nav: true,
              dots: false,
            }
          }
        });
      }
    };

    function activeCarousel() {
      var minWidth = window.innerWidth;
      if (minWidth <= 767) {
        $('#js-p-slider').owlCarousel('destroy');
        carouselComponent = undefined;
        acordeonInitialize();

      } else {
        $('.acordeon').off('click', '.headerPLan');
        acordeonClickInitialized = false;
        $(".portabilidad_plan").removeClass("activePlan");

        carouselInitialize();
      }
    };

    activeCarousel();
    $(window).resize(activeCarousel)
    // Fin Planes Parrillas

    // Inicio Tabs
    var pestana = $('.pesTab-js');
    var container = $('.conTab-js');
    pestana.on('click', function (e) {
      var i;
      e.preventDefault();
      i = $(this).index();
      pestana.removeClass('active');
      $(this).addClass('active');
      container.css('display', 'none');
      container.eq(i).fadeIn('1000');
    });
    // Fin Tabs

    // Inicio Acordeon
    $('.acordeon-js').on('click', function () {
      var t = $(this);
      var tp = t.next();
      var p = t.parent().siblings().find('.acordeon-info-js');
      tp.slideToggle();
      p.slideUp();
    });
    // Fin Acordeon
    var msn = function () {
      console.log('msn');
    }
  }

  var getDataEquipment = function () {
    $.post(urlBase + 'EquiposPlanes/ListarMasVendidos', function (resultBestMobileEquipment) {
      var favoritos = resultBestMobileEquipment.map(item => item.IdEquipo);
      urls = favoritos.map(function (idEquipment) {
        var apiEquipment = urlBase + 'EquiposPlanes/' + idEquipment + '/26/0';
        return $.post(apiEquipment);
      });
      Promise.all(urls).then(function (basicEquipment) {
        basicEquipment.splice(8, 1)
        buildItems(basicEquipment)
      });
    }.bind(this));
  }

  var buildItems = (function (data) {
    var elem = data;
    for (var i = 0; i < elem.length; i++) {
      var html = '';
      html += '';
      html += '<div class="wrapper">'
      html += '<div class="imagen">'
      html += '<div class="phone">'
      html += '<img src="' + elem[i].IEQV_ArchivoImagenBig + '" alt="Equipo">'
      html += '</div>'
      html += '</div>'
      html += '<div class="description">'
      html += '<div class="title"><b>' + elem[i].MARV_Nombre + '</b> <br>' + elem[i].EQUV_Modelo + '</div>'
      html += '<div class="price">En 12 cuotas de <br><span>S/.' + elem[i].CategoriasPlanes[0].Planes[2].PLNN_PrecioPlan + '0' + '</span></div>'
      html += '<div class="plan">' + elem[i].CategoriasPlanes[0].Planes[2].PLNV_NombrePlan + '</div>'
      html += '</div>'
      html += '<div class="btn-phone">'
      html += '<a class="mostrar-detalles-js" href="#" data-id="' + elem[i].EQUI_IdEquipo + '">Lo quiero</a>'
      html += '</div>'
      html += '</div>'
      $('.carousel-equipos').append(html);
    }
    functions.carouselEquipment();
    functions.showContentEquipment();
    functions.detailsPlan();
  })

  var functions = {
    showContentEquipment: function () {
      $('.mostrar-detalles-js').on('click', function (e) {
        e.preventDefault();

        var id = $(this).data('id');
        // ======== Get Plans ======= //
        $.post(urlBase + 'EquiposPlanes/' + id + '/26/0', function (resultPlans) {
          //Get Global Equipment
          equipment = resultPlans;

          //Get info Equipment
          var model = resultPlans.EQUV_Modelo,
            name = resultPlans.MARV_Nombre,
            pricePlan = resultPlans.CategoriasPlanes[0].Planes[2].PLNN_PrecioPlan + '0',
            priceEquipment = resultPlans.CategoriasPlanes[0].Planes[2].PEQN_PrecioCuotasOnLine,
            priceEquipmentOnline = resultPlans.CategoriasPlanes[0].Planes[2].PEQN_PrecioEquipoOnLine,
            totalprice = (+pricePlan + priceEquipment) + '0',
            planes = resultPlans.CategoriasPlanes[0].Planes,
            image = resultPlans.IEQV_ArchivoImagenBig,
            elementoSelectPadre = $('#equipmentPlans'),
            nameUrl,
            planUrl,
            newUrl;

          //Set info Equipment
          $('#modelEquipment, .properties_title').text(name + ' ' + model);
          $('#pricePlan').text(pricePlan);
          $('#priceEquipment').text(priceEquipment);
          $('#priceEquipmentOnline').text(priceEquipmentOnline);
          $('#totalPrice').text(totalprice);
          $('#equipmentImage').attr('src', image);


          //Set plans Equipment
          elementoSelectPadre.html('');
          for (var i = 0; i < planes.length; i++) {
            elementoSelectPadre.append(
              "<option value=" + planes[i].PLNI_IdPlan + ">" + planes[i].PLNV_NombrePlan + "</option>"
            );
            if (planes[i].PLNI_IdPlan == 203) {
              planUrl = planes[i].PLNN_PrecioPlan;
              elementoSelectPadre.val(planes[i].PLNI_IdPlan).prop('selected', true);
              $.post(urlBase + 'EquiposPlanes/ObtenerCaracteristicasPlan/' + planes[i].PLNI_IdPlan, function (featuresPlan) {
                console.log(featuresPlan, 'features');
                $(dataFreeValue).text(featuresPlan[1].Valor);
                $(dataFreeName).text(featuresPlan[1].Nombre);
                $(appIlimitatedValue).text(featuresPlan[8].Valor);
                $(listApps).text(featuresPlan[10].Valor);
                $(dataInterValue).text(featuresPlan[6].Valor);
                $(dataInterName).text(featuresPlan[6].Nombre);
                $(smsValue).text(featuresPlan[2].Valor);
                $(smsName).text(featuresPlan[2].Nombre);
                $(minutesValue).text(featuresPlan[0].Valor);
                $(minutesName).html(featuresPlan[0].Nombre);
              }.bind(this));
            }
          }

          // Show/Hide
          $('#general').hide();
          $('#beneficios-portabilidad').hide();
          $('#page-equipo-portabilidad').show();


          nameUrl = resultPlans.EQUV_Modelo.split(' ').join('-');
          newUrl = '?' + nameUrl + '/' + planUrl;

          history.pushState(null, null, newUrl);

          $(window).scrollTop(0)

        }.bind(this));

        // ======== Get Features ======== //
        $.post(urlBase + 'EquiposPlanes/ObtenerCaracteristicasEquipo/' + id, function (resultFeatures) {
          console.log(resultFeatures, 'Caracteristicas');
          $(featuresText1).html(resultFeatures[0].Texto);
          $(featuresImage1).attr('src', resultFeatures[0].Imagen);
          $(featuresText2).html(resultFeatures[1].Texto);
          $(featuresImage2).attr('src', resultFeatures[1].Imagen);
          $(featuresText3).html(resultFeatures[2].Texto);
          $(featuresImage3).attr('src', resultFeatures[2].Imagen);
        }.bind(this));

        // ======== Get Specifications ======== // 
        $.post(urlBase + 'EquiposPlanes/ObtenerEspecificacionesEquipo/' + id, function (resultSpeci) {
          console.log(resultSpeci, 'Especifications');
          for (var i = 0; i < resultSpeci.length; i++) {
            if (resultSpeci[i].NombreEspecificacion == 'Pantalla Interna' && resultSpeci[i].UnidadSubEspecificacion == 'pulgadas') {
              $(screenSize).text(resultSpeci[i].ValorSubEspecificacion);
            }
            if (resultSpeci[i].NombreEspecificacion == 'Cámara de Fotos' && resultSpeci[i].NombreSubEspecificacion == 'Resolución') {
              $(mainCamera).text(resultSpeci[i].ValorSubEspecificacion);
            }
            if (resultSpeci[i].NombreEspecificacion == 'Cámara frontal' && resultSpeci[i].NombreSubEspecificacion == 'Resolución') {
              $(frontalCamera).text(resultSpeci[i].ValorSubEspecificacion);
            }
            if (resultSpeci[i].NombreEspecificacion == 'Memoria del Teléfono' && resultSpeci[i].NombreSubEspecificacion == 'Capacidad') {
              $(memory).text(resultSpeci[i].ValorSubEspecificacion);
            }
            if (resultSpeci[i].NombreEspecificacion == 'Procesador') {
              $(processor).text(resultSpeci[i].ValorSubEspecificacion);
            }
            if (resultSpeci[i].NombreEspecificacion == 'Sistema Operativo' && resultSpeci[i].NombreSubEspecificacion == 'Tiene') {
              $(soType).text(resultSpeci[i].ValorSubEspecificacion);
            }
            if (resultSpeci[i].NombreEspecificacion == 'Sistema Operativo' && resultSpeci[i].NombreSubEspecificacion == 'Versión') {
              $(soVersion).text(resultSpeci[i].ValorSubEspecificacion);
            }
          }
        }.bind(this));


      })

      $('.equipo-goback a').on('click', function (e) {
        e.preventDefault();
        $('#general').show();
        $('#beneficios-portabilidad').show();
        $('#page-equipo-portabilidad').hide();
        $('.tab1, .tab2').hide();
        window.history.back();
      })
    },

    detailsPlan: function () {
      var select = $('#equipmentPlans'),
        selectCuota = $('#equipmentCuotas')
      $(select).on('change', function () {
        $('.equipo-plan-wrapper').fadeOut(150);
        $('.info').fadeOut(150);
        var value = $(this).val();
        var plan = equipment.CategoriasPlanes[0].Planes.find(function (item) {
          return item.PLNI_IdPlan == value;
        })
        //Get info Plan
        var pricePlan = plan.PLNN_PrecioPlan + '0',
          priceEquipment = plan.PEQN_PrecioCuotasOnLine,
          totalprice = (+pricePlan + priceEquipment) + '0',
          priceEquipmentOnline = plan.PEQN_PrecioEquipoOnLine;

        // set info plan
        $('#pricePlan').text(pricePlan);
        $('#priceEquipment').text(priceEquipment);
        $('#priceEquipmentOnline').text(priceEquipmentOnline);
        $('#totalPrice').text(totalprice);

        $.post(urlBase + 'EquiposPlanes/ObtenerCaracteristicasPlan/' + value, function (featuresPlan) {
          console.log(featuresPlan);
          for (var i = 0; i < featuresPlan.length; i++) {
            if (featuresPlan[i].IdCaracteristica == 2) {
              $(minutesValue).text(featuresPlan[i].Valor);
              $(minutesName).html(featuresPlan[i].Nombre);
            }
            if (featuresPlan[i].IdCaracteristica == 5) {
              $(dataFreeValue).text(featuresPlan[i].Valor);
              $(dataFreeName).text(featuresPlan[i].Nombre);
            }
            if (featuresPlan[i].IdCaracteristica == 14) {
              $(smsValue).text(featuresPlan[i].Valor);
              $(smsName).text(featuresPlan[i].Nombre);
            }
            if (featuresPlan[i].IdCaracteristica == 18) {
              $(dataInterValue).text(featuresPlan[i].Valor);
              $(dataInterName).text(featuresPlan[i].Nombre);
            }
            if (featuresPlan[i].IdCaracteristica == 22) {
              $(appIlimitatedValue).text(featuresPlan[i].Valor);
            }
            if (featuresPlan[i].IdCaracteristica == 24) {
              $(listApps).text(featuresPlan[i].Valor);
            }
          }
        }.bind(this));

        $('.equipo-plan-wrapper').fadeIn(150);
        $('.info').fadeIn(150);
      })

      $(selectCuota).on('change', function () {
        $('.equipo-plan-wrapper').fadeOut(150);
        $('.info').fadeOut(150);

        var valueCuota = $(this).val();

        if (valueCuota == 0) {
          $('.info-pago').hide();
          $('.price_equipo').hide();
          $('.price_equipo_online').show();
        } else {
          $('.info-pago').show();
          $('.price_equipo').show();
          $('.price_equipo_online').hide();
        }

        $('.equipo-plan-wrapper').fadeIn(150);
        $('.info').fadeIn(150);
      })
    },

    carouselEquipment: function () {
      $(".carousel-equipos").owlCarousel({
        autoWidth: false,
        center: false,
        responsiveClass: true,
        margin: 0,
        mouseDrag: false,
        loop: false,
        items: 3,
        // autoplay: true,
        responsive: {
          0: {
            margin: 0,
            items: 1,
            nav: false,
            dots: true,
          },
          768: {
            items: 2,
          },
          1024: {
            nav: true,
            dots: false,
          }
        }
      });
    },
  }

  var initialize = function () {
    events();
    getDataEquipment();
  }

  return {
    init: initialize
  }

})().init();
