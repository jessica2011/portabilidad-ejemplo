var utilities = function() {
  var iswebkit = (navigator.userAgent.match(/WebKit\/([\d.]+)/) ? true : false);
  function animateToTop(event, time) {
    event.preventDefault();
    var scrollToTop = window.setInterval(function() {
        var pos = window.pageYOffset;
        if ( pos > 0 ) {
            window.scrollTo( 0, pos - 20 );
        } else {
            window.clearInterval( scrollToTop );
        }
    }, time);
  };


  this.tabsNew = function(ptab, ctab) {
    var pestana = $(ptab);
    var container = $(ctab);
    pestana.on('click', function(e) {
      var i;
      e.preventDefault();
      i = $(this).index();
      pestana.removeClass('active');
      $(this).addClass('active');
      container.css('display', 'none');
      container.eq(i).fadeIn('1000');
    });
    // pestana.eq(0).trigger("click");
  };

  this.topScroll = function(element){
    el = document.querySelector(element);
    el.addEventListener('click', function(event){
      animateToTop(event, 10)
    },false);
  }

  this.scrollElement = function(el,time,callback){
    var menuLink = $(el);
    //var boxContent = $(contain);
    var scrollElem='html';
    menuLink.on('click', function(e){
      e.preventDefault();
      var $this = this;
      menuLink.removeClass('active');
      //boxContent.removeClass('active');
      var $dataId = $this.getAttribute("data-id");
      var elBlock = document.getElementById($dataId);
      $this.classList.add('active');
      elBlock.classList.add("active");
      //animate body for webkit browsers that don't support html animation
      if(iswebkit){
        scrollElem='body';
      }
      $(scrollElem).animate({
        scrollTop: $("#"+$dataId).offset().top
      }, time, function(){
        console.log("ok");
        if (callback) {
          callback();
        }
      });
    });
  }

  this.getParameterByName = function(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  this.accordion = function(elItem, init, finish) {
    var classAccordion = document.getElementsByClassName(elItem);
    var i;
    for (i = 0; i < classAccordion.length; i++) {
      classAccordion[i].onclick = function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.height){
          panel.style.height = null;
          if (finish) {
            finish();
          }
        } else {
          panel.style.height = panel.scrollHeight + 'px';
          if (init) {
            init();
          }
        }
      }
    }
  }
};



module.exports = utilities;
