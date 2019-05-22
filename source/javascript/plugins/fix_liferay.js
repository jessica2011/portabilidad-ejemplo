$(function() {
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  fix = getParameterByName("fix");
  if (fix === "") {
    $("html").removeClass("aui");
    $(".portlet-dockbar").remove();
    $(".dockbar-messages").remove();
    $(".portlet-borderless-bar").remove();
    $(".lfr-meta-actions").remove();
  } else {
    $("html").css("display", "block");
    $(".portlet-dockbar").show();
    $(".dockbar-messages").show();
    $(".portlet-borderless-bar").show();
    $(".lfr-meta-actions").show();
  }
});
