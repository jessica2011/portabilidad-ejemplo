var scrollingElement = function() {
  var iswebkit = (navigator.userAgent.match(/WebKit\/([\d.]+)/) ? true : false);
  var htmlElement='html';
  if(iswebkit){
    htmlElement='body';
  }
  function filterDataValue(type, attribute, value)    {
    var All = document.getElementsByTagName(type);
    for (var i = 0; i < All.length; i++)       {
      if (All[i].getAttribute(attribute) == value) {
        return All[i];
      }
    }
  }
  // Example = http://callmenick.com/post/single-page-site-with-smooth-scrolling-highlighted-link-and-fixed-navigation

  /*!
  * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
  * Scroll smooth to any element in your DOM.
  *
  * Copyright (c) 2012 Yannick Albert (http://yckart.com)
  * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
  * 2013/02/17
  **/
  $.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top - options.gap.y
        }, options.animation);
    });
  };
  //Fin del Plugin scrollTo

  var navHeight = document.getElementById('netflix').offsetHeight; //#header
  $(".js-menu-link").on('click', function(evn){ //.menu-link
    evn.preventDefault();
    var attrData = this.getAttribute("data-id")
    console.log(attrData);
    $(htmlElement).scrollTo(attrData, attrData, {
        gap:{
          y:navHeight
        },
        animation:{
          complete: function(){
            console.log("Termino la animacion");
          }
        }
      }
    );
  });

  var aChildren = $(".owl-carousel .item-carousel").children(); // find the a children of the list items  //nav li

  var aArray = []; // create the empty aArray
  for (var i=0; i < aChildren.length; i++) {
      var aChild = aChildren[i];
      var ahref = $(aChild).attr('data-id');
      aArray.push(ahref);
  } // this for loop fills the aArray with attribute href values

  $(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).innerHeight(); // get the height of the window
    var docHeight = $(document).innerHeight();

    for (var i=0; i < aArray.length; i++) {
        var theID = aArray[i];
        var divPos = $(theID).offset().top - navHeight; // get the offset of the div from the top of page
        var divHeight = $(theID).innerHeight(); // get the height of the div in question
        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
            $("[data-id='" + theID + "']").addClass("active");
        } else {
            $("[data-id='" + theID + "']").removeClass("active");
        }
    }
    if(windowPos + windowHeight == docHeight) {
        if (!$("nav li:last-child a").hasClass("active")) {
            var navActiveCurrent = $(".active").attr("data-id");
            $("[data-id='" + navActiveCurrent + "']").removeClass("active");
            $("nav li:last-child a").addClass("active");
        }
    }
  });

  window.onload = function() {
    var urlHash = location.hash;
    if (urlHash !== "") {
      var linkMenu = filterDataValue("a","data-id", urlHash);
      console.log(linkMenu);
      setTimeout(function(){
        linkMenu.click();
      }, 100);
    }
  };

  window.onhashchange = function() {
    console.log("#adsd");
    if (urlHash !== "") {
      var urlHash = location.hash;
      var linkMenu = filterDataValue("a","data-id", urlHash);
      console.log(linkMenu);
      setTimeout(function(){
        linkMenu.click();
      }, 100);
    }
  }



};

module.exports = scrollingElement;
