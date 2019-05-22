var MobileEquipmentCarousel = function (Data) {
  // this.initialize(Data);
};

MobileEquipmentCarousel.prototype.initialize = function (Data) {
  this.data = Data;
  this.handler();
};

MobileEquipmentCarousel.prototype.handler = function () {
  this.buildItems();
  this.initCarousel();
  this.showContentPageEquipment();
};

MobileEquipmentCarousel.prototype.initCarousel = function () {
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
      1024:{
        nav: true,
        dots: false,
      }
    }
  });
};

MobileEquipmentCarousel.prototype.buildItems = function () {
  var elem = this.data;
  for(var i= 0; i < elem.length; i++){
    var html = '';
        html += '';
        html += '<div class="wrapper">'
        html +=   '<div class="imagen">'
        html +=       '<div class="sticker-phone">'
        html +=         '<img src="http://www.movistar.com.pe/documents/80379/8777288/sticker_4G_promocion.png/" alt="Promoción Equipo">'
        html +=       '</div>'
        html +=       '<div class="phone">'
        html +=         '<img src="'+ elem[i].Imagenes[0].ArchivoThumb +'" alt="Equipo">'
        html +=       '</div>'
        html +=   '</div>'
        html +=   '<div class="description">'
        html +=       '<div class="title"><b>'+ elem[i].Marca +'</b> <br>'+ elem[i].Modelo +'</div>'
        html +=       '<div class="price">En 18 cuotas de <br><span>S/ 50</span></div>'
        html +=       '<div class="plan">Plan elije más s/85.90</div>'
        html +=   '</div>'
        html +=   '<div class="btn-phone">'
        html +=     '<a class="mostrar-detalles-js" href="#" data-product-id="'+ elem[i].Modelo +'" data-product-name="'+ elem[i].Modelo +'">Lo quiero</a>'
        html +=   '</div>'
        html += '</div>'
        $('.carousel-equipos').append(html);
  }
};

MobileEquipmentCarousel.prototype.showContentPageEquipment = function () {

};








module.exports = MobileEquipmentCarousel;