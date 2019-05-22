var validateFormGeneral = function() {
  var blacklist = 'ºÂ¡Â°!$%^&*()+=[]\\;Â´,/{}|":<>?~`¢∞“”≠ª·÷»¿«\u2764\u2713\u2600\u2605\u2602\u265E\u262F\u262D\u2622\u20AC\u260E\u221E\u2744\u266B\u20BD\u00A3\u00A4\u00A5\u00A6\u00A7\u00A8\u00A9\u00AA\u00AB\u00BB\u00AC\u00AE\u00AF\u00B0\u00B1\u00B5\u00B6\u00B7\u00BA\u00D7\u00C0\u00C1\u00C2\u00C3\u00C4\u00C5\u00C6\u00C7\u00C8\u00C9\u00CA\u00CB\u2620\u2621\u2622\u2623\u2624\u2625\u2626\u2627\u2628\u2629\u262A\u262B\u262C\u262D\u262F\u2630\u2631\u2632\u2633\u2634\u2635\u2636\u2637\u2638\u2639\u263a\u263b\u263c\u263d\u263e\u263f\u2640\u2641\u2642\u2643\u2644\u2645\u2646\u2647\u2648\u2649\u264A\u264B\u264C\u264D\u264F\u2650\u2651\u2652\u2653\u2654\u2655\u2656\u2657\u2658\u2659\u265a\u265b\u265c\u265d\u265e\u265f\u2664\u2661\uFFE5\uFFE6\uFFED\u00D7\u20A9\u2022\u2023\u2024\u2025\u2026\u2027\u2028\u2029\u2032\u2033\u2034\u2035\u2036\u2037\u2038\u2039\u203A\u203B\u203C\u203D\u203E\u203F\u220F\u0060\u007e\u005c\u007c\u003c\u003e\u007b\u007d\u005b\u005d\u2667\u2662\u2661\u2664\u25a0\u25a1\u25cf\u25cb\u2022\u00b0\u2606\u25aa\u00a4\u300a\u300b\u00a5\u20a9\u2665\u2299';

  $.validator.addMethod('emailCustom', function(value, element) {
    return this.optional(element) || /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value);
  }, '');
  $.validator.addMethod('ruc', (function(value, element) {
    return this.optional(element) || /(^1|2)+0[0-9]{9}$/i.test(value);
  }), '');
  $.validator.addMethod('valphone', function(value, element) {
    return this.optional(element) || /^9+[0-9]{8}/.test(value);
  }, '');
  $.validator.addMethod('urlFacebook', function(value, element) {
    return this.optional(element) || /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/.test(value);
  }, '');
  $.validator.addMethod('urlYoutube', function(value, element) {
    return this.optional(element) || /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(value);
  }, '');

  this.isValidate = function(eleToFilter, filterType){
    switch (filterType) {
      case 'numeric':
        $(eleToFilter).numeric({
          allowPlus: false,
          allowMinus: false,
          allowDecSep: false,
          allowThouSep: false,
          allowNumeric: true,
          min: 0
        });
        break;
      case 'text':
        $(eleToFilter).alpha({
          allow: '\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC',
          disallow: blacklist + '@-_.'
        });
        break;
      case 'codepack':
        $(eleToFilter).alphanum({
          allowSpace: false,
          disallow: blacklist
        });
        break;
      case 'urlOnly':
        $(eleToFilter).alphanum({
          allowSpace: true,
          allow: ':/-_.?!$%&()+=[];',
          disallow: blacklist
        });
        break;
      case 'email':
        $(eleToFilter).alphanum({
          allow: '@-_.',
          allowSpace: false,
          disallow: blacklist
        });
    }
  }
};

module.exports = validateFormGeneral;
