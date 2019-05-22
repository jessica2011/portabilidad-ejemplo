/**
 * Validador de navegador y versiĆ³n
 * @modulo libs/browser
 */
var Browser = function() {
  var os = {},
      userAgent = navigator.userAgent;

  os.webkit  = (userAgent.match(/WebKit\/([\d.]+)/) ? true : false);
  os.android = (userAgent.match(/(Android)\s+([\d.]+)/) ? true : false);
  os.mobile  = (os.android && userAgent.match(/Mobile/i) ? true : false);
  os.tablet  = (os.android && !userAgent.match(/Mobile/i) ? true : false);
  os.ipad    = (userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false);
  os.iphone  = (!os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false);
  os.ios8    = ((os.ipad || os.iphone) && userAgent.match(/8_/) ? true : false);
  os.ios     = os.ipad || os.iphone;
  os.wp      = (userAgent.match(/Windows Phone/i) ? true : false);
  os.chrome  = (userAgent.match(/Chrome/) ? true : false);
  os.opera   = (userAgent.match(/Opera/) ? true : false);
  os.ie11    = (userAgent.match(/MSIE 11.0/i) || userAgent.match(/Trident\/7/i) ? true : false);
  os.ie10    = (userAgent.match(/MSIE 10.0/i) || userAgent.match(/Trident\/6/i) ? true : false);
  os.ie9     = (userAgent.match(/MSIE 9.0/i) || userAgent.match(/Trident\/5/i) ? true : false);
  os.ie8     = (userAgent.match(/MSIE 8.0/i) || userAgent.match(/Trident\/4/i) ? true : false);
  os.ie      = os.ie9 || os.ie10 || os.ie11;

  /**
   * Verifica el navegador y su versión según el parámetro browser
   *
   * @method  isVersion
   * @param   {String}   browser   Tipo de navegador
   * @returns {Boolean}
   */
  this.isVersion = function ( browser ) {
      return os[browser];
  }
};

module.exports = Browser;
