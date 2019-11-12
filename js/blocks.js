 
function t121_setHeight(recid){
    var rec = $('#rec' + recid);
    var div=$("#youtubeiframe"+recid);
    var height=div.width() * 0.5625;
    div.height(height);
    div.parent().height(height);
    
    var videoLazy = rec.find('.t-video-lazyload');
    var iframeLazy = videoLazy.find('iframe');
    if (videoLazy != undefined) {
        var heightLazy = videoLazy.width() * 0.5625;
        videoLazy.height(heightLazy);
        iframeLazy.height(heightLazy);
    }
} 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
      el.html("<span class=\"t142__text\">" + btntext + "</span>");
    }
  }
} 
function t190_scrollToTop(){
    $('html, body').animate({scrollTop: 0}, 700);								
}	  
 
function t228_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t228__list_item a[href='"+url+"']").addClass("t-active");
  $(".t228__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t228_navLinks = $("#rec" + recid + " .t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function(){
              t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = new Array(),
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
		t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function(a, b) {
      return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
		$(window).bind('resize', t_throttle(function(){t228_updateSectionsOffsets(t228_sections);}, 200));
		$('.t228').bind('displayChanged',function(){t228_updateSectionsOffsets(t228_sections);});
		setInterval(function(){t228_updateSectionsOffsets(t228_sections);},5000);
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function() {
        var t228_clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t228_clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}


function t228_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t228_curSection = $(this);
		t228_curSection.attr("data-offset-top",t228_curSection.offset().top);
	});
}


function t228_getSectionByHref(curlink) {
    var t228_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (t228_curLinkValue[0]=='/') { t228_curLinkValue = t228_curLinkValue.substring(1); }
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t228_curLinkValue.substring(1) + "']");
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t228_curLinkValue.substring(1) + "']");
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop(),
        t228_valueToReturn = t228_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length != 0 && t228_clickedSectionId == null && t228_sections[t228_sections.length-1].attr("data-offset-top") > (t228_scrollPosition + 300)){
      t228_navLinks.removeClass('t-active');
      return null;
    }

    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t228_valueToReturn;
}

function t228_setPath(){
}

function t228_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var left_exist=el.find('.t228__leftcontainer').length;
      var left_w=el.find('.t228__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t228__rightcontainer').length;
      var right_w=el.find('.t228__rightcontainer').outerWidth(true);
	  var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth(true);
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
		  if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
            el.find(".t228__list").removeClass("t228__list_hidden");
          }
       }else{
          el.find(".t228__leftside").css("min-width","");
          el.find(".t228__rightside").css("min-width","");  
          
      }
    });
  }
}

function t228_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);             
      }
      });
      }else{
        $(".t228").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t228_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t228").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                var topoffset = el.data('top-offset');
                                if (topoffset && parseInt(topoffset) > 0) {
                                    el.animate({"opacity": "1","top": topoffset+"px"}, 200,function() {
                                    });       
                                    
                                } else {
                                    el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                    });       
                                }
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
							el.css("opacity","0");	
                          }
                  }
           });
      }

}

function t228_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t228_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t228"),
      burger=el.find(".t228__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t228_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}



 
function t331_setHeight(recid){
  var el=$("#rec"+recid); 
  var div = el.find(".t331__video-carier");
  var ratiowidth = div.attr("data-video-width");
  var ratioheight = div.attr("data-video-height"); 
  var ratio = ratioheight/ratiowidth;     
  var height=div.width() * ratio;
  div.height(height);
  div.parent().height(height);
}

function t331_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t331_showPopup(recid);
      t331_resizePopup(recid);
      e.preventDefault();
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t331_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  var youtubeid = el.find(".t331__youtube").attr('data-content-popup-video-url-youtube');
  var videourl = 'https://www.youtube.com/embed/' + youtubeid;
  el.find(".t331__video-carier").html("<iframe id=\"youtubeiframe"+recid+"\" class=\"t331__iframe\" width=\"100.5%\" height=\"100.5%\" src=\"" + videourl + "?autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>");

  popup.css('display', 'block');
  t331_setHeight(recid);
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');
  $('body').addClass('t331__body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) {
    t331_popup_close(recid);
    }
  });

  el.find('.t-popup__close').click(function(e){
    t331_popup_close(recid);
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t331_popup_close(recid); }
  });
}

function t331_popup_close(recid){
  $('body').removeClass('t-body_popupshowed');
  $('body').removeClass('t331__body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $("#rec"+recid+" .t331__video-carier").html("");
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t331_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height(),
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t331_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
} 
    var t386 = {};
    
    t386.equalheight = function(recid) {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
            
        $('#rec'+recid+' .t386__textwrapper').each(function() {
     
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;
       
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };
 
function t390_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    if (e.target == this) { t390_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t390_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t390_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t390_closePopup(); }
  });
}

function t390_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t390_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t390_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
  if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
    Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0);
  } else {
    if(ga) {
      if (window.mainTracker != 'tilda') {
        ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
      }
    }
  
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
      window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
    }
  }
}

function t390_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
      t390_showPopup(recid);
      t390_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
} 

function t396_init(recid){var data='';var res=t396_detectResolution();t396_initTNobj();t396_switchResolution(res);t396_updateTNobj();t396_artboard_build(data,recid);window.tn_window_width=$(window).width();$( window ).resize(function () {tn_console('>>>> t396: Window on Resize event >>>>');t396_waitForFinalEvent(function(){if($isMobile){var ww=$(window).width();if(ww!=window.tn_window_width){t396_doResize(recid);}}else{t396_doResize(recid);}}, 500, 'resizeruniqueid'+recid);});$(window).on("orientationchange",function(){tn_console('>>>> t396: Orient change event >>>>');t396_waitForFinalEvent(function(){t396_doResize(recid);}, 600, 'orientationuniqueid'+recid);});$( window ).load(function() {var ab=$('#rec'+recid).find('.t396__artboard');t396_allelems__renderView(ab);});var rec = $('#rec' + recid);if (rec.attr('data-connect-with-tab') == 'yes') {rec.find('.t396').bind('displayChanged', function() {var ab = rec.find('.t396__artboard');t396_allelems__renderView(ab);});}}function t396_doResize(recid){var ww=$(window).width();window.tn_window_width=ww;var res=t396_detectResolution();var ab=$('#rec'+recid).find('.t396__artboard');t396_switchResolution(res);t396_updateTNobj();t396_ab__renderView(ab);t396_allelems__renderView(ab);}function t396_detectResolution(){var ww=$(window).width();var res;res=1200;if(ww<1200){res=960;}if(ww<960){res=640;}if(ww<640){res=480;}if(ww<480){res=320;}return(res);}function t396_initTNobj(){tn_console('func: initTNobj');window.tn={};window.tn.canvas_min_sizes = ["320","480","640","960","1200"];window.tn.canvas_max_sizes = ["480","640","960","1200",""];window.tn.ab_fields = ["height","width","bgcolor","bgimg","bgattachment","bgposition","filteropacity","filtercolor","filteropacity2","filtercolor2","height_vh","valign"];}function t396_updateTNobj(){tn_console('func: updateTNobj');if(typeof window.zero_window_width_hook!='undefined' && window.zero_window_width_hook=='allrecords' && $('#allrecords').length){window.tn.window_width = parseInt($('#allrecords').width());}else{window.tn.window_width = parseInt($(window).width());}/* window.tn.window_width = parseInt($(window).width()); */window.tn.window_height = parseInt($(window).height());if(window.tn.curResolution==1200){window.tn.canvas_min_width = 1200;window.tn.canvas_max_width = window.tn.window_width;}if(window.tn.curResolution==960){window.tn.canvas_min_width = 960;window.tn.canvas_max_width = 1200;}if(window.tn.curResolution==640){window.tn.canvas_min_width = 640;window.tn.canvas_max_width = 960;}if(window.tn.curResolution==480){window.tn.canvas_min_width = 480;window.tn.canvas_max_width = 640;}if(window.tn.curResolution==320){window.tn.canvas_min_width = 320;window.tn.canvas_max_width = 480;}window.tn.grid_width = window.tn.canvas_min_width;window.tn.grid_offset_left = parseFloat( (window.tn.window_width-window.tn.grid_width)/2 );}var t396_waitForFinalEvent = (function () {var timers = {};return function (callback, ms, uniqueId) {if (!uniqueId) {uniqueId = "Don't call this twice without a uniqueId";}if (timers[uniqueId]) {clearTimeout (timers[uniqueId]);}timers[uniqueId] = setTimeout(callback, ms);};})();function t396_switchResolution(res,resmax){tn_console('func: switchResolution');if(typeof resmax=='undefined'){if(res==1200)resmax='';if(res==960)resmax=1200;if(res==640)resmax=960;if(res==480)resmax=640;if(res==320)resmax=480;}window.tn.curResolution=res;window.tn.curResolution_max=resmax;}function t396_artboard_build(data,recid){tn_console('func: t396_artboard_build. Recid:'+recid);tn_console(data);/* set style to artboard */var ab=$('#rec'+recid).find('.t396__artboard');t396_ab__renderView(ab);/* create elements */ab.find('.tn-elem').each(function() {var item=$(this);if(item.attr('data-elem-type')=='text'){t396_addText(ab,item);}if(item.attr('data-elem-type')=='image'){t396_addImage(ab,item);}if(item.attr('data-elem-type')=='shape'){t396_addShape(ab,item);}if(item.attr('data-elem-type')=='button'){t396_addButton(ab,item);}if(item.attr('data-elem-type')=='video'){t396_addVideo(ab,item);}if(item.attr('data-elem-type')=='html'){t396_addHtml(ab,item);}if(item.attr('data-elem-type')=='tooltip'){t396_addTooltip(ab,item);}if(item.attr('data-elem-type')=='form'){t396_addForm(ab,item);}});$('#rec'+recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');if(ab.attr('data-artboard-ovrflw')=='visible'){$('#allrecords').css('overflow','hidden');}if($isMobile){$('#rec'+recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>');}}function t396_ab__renderView(ab){var fields = window.tn.ab_fields;for ( var i = 0; i < fields.length; i++ ) {t396_ab__renderViewOneField(ab,fields[i]);}var ab_min_height=t396_ab__getFieldValue(ab,'height');var ab_max_height=t396_ab__getHeight(ab);var offset_top=0;if(ab_min_height==ab_max_height){offset_top=0;}else{var ab_valign=t396_ab__getFieldValue(ab,'valign');if(ab_valign=='top'){offset_top=0;}else if(ab_valign=='center'){offset_top=parseFloat( (ab_max_height-ab_min_height)/2 ).toFixed(1);}else if(ab_valign=='bottom'){offset_top=parseFloat( (ab_max_height-ab_min_height) ).toFixed(1);}else if(ab_valign=='stretch'){offset_top=0;ab_min_height=ab_max_height;}else{offset_top=0;}}ab.attr('data-artboard-proxy-min-offset-top',offset_top);ab.attr('data-artboard-proxy-min-height',ab_min_height);ab.attr('data-artboard-proxy-max-height',ab_max_height);}function t396_addText(ab,el){tn_console('func: addText');/* add data atributes */var fields_str='top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addImage(ab,el){tn_console('func: addImage');/* add data atributes */var fields_str='img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);el.find('img').on("load", function() {t396_elem__renderViewOneField(el,'top');if(typeof $(this).attr('src')!='undefined' && $(this).attr('src')!=''){setTimeout( function() { t396_elem__renderViewOneField(el,'top');} , 2000);} }).each(function() {if(this.complete) $(this).load();}); el.find('img').on('tuwidget_done', function(e, file) { t396_elem__renderViewOneField(el,'top');});}function t396_addShape(ab,el){tn_console('func: addShape');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addButton(ab,el){tn_console('func: addButton');/* add data atributes */var fields_str='top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);return(el);}function t396_addVideo(ab,el){tn_console('func: addVideo');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);var viel=el.find('.tn-atom__videoiframe');var viatel=el.find('.tn-atom');viatel.css('background-color','#000');var vihascover=viatel.attr('data-atom-video-has-cover');if(typeof vihascover=='undefined'){vihascover='';}if(vihascover=='y'){viatel.click(function() {var viifel=viel.find('iframe');if(viifel.length){var foo=viifel.attr('data-original');viifel.attr('src',foo);}viatel.css('background-image','none');viatel.find('.tn-atom__video-play-link').css('display','none');});}var autoplay=t396_elem__getFieldValue(el,'autoplay');var showinfo=t396_elem__getFieldValue(el,'showinfo');var loop=t396_elem__getFieldValue(el,'loop');var mute=t396_elem__getFieldValue(el,'mute');var startsec=t396_elem__getFieldValue(el,'startsec');var endsec=t396_elem__getFieldValue(el,'endsec');var tmode=$('#allrecords').attr('data-tilda-mode');var url='';var viyid=viel.attr('data-youtubeid');if(typeof viyid!='undefined' && viyid!=''){ url='//www.youtube.com/embed/'; url+=viyid+'?rel=0&fmt=18&html5=1'; url+='&showinfo='+(showinfo=='y'?'1':'0'); if(loop=='y'){url+='&loop=1&playlist='+viyid;} if(startsec>0){url+='&start='+startsec;} if(endsec>0){url+='&end='+endsec;} if(mute=='y'){url+='&mute=1';} if(vihascover=='y'){ url+='&autoplay=1'; viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); }else{ if(typeof tmode!='undefined' && tmode=='edit'){}else{ if(autoplay=='y'){url+='&autoplay=1';} } if(window.lazy=='y'){ viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="'+url+'" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>'); el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>'); }else{ viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="'+url+'" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>'); } }}var vivid=viel.attr('data-vimeoid');if(typeof vivid!='undefined' && vivid>0){url='//player.vimeo.com/video/';url+=vivid+'?color=ffffff&badge=0';if(showinfo=='y'){url+='&title=1&byline=1&portrait=1';}else{url+='&title=0&byline=0&portrait=0';}if(loop=='y'){url+='&loop=1';}if(mute=='y'){url+='&muted=1';}if(vihascover=='y'){url+='&autoplay=1';viel.html('<iframe data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}else{if(typeof tmode!='undefined' && tmode=='edit'){}else{if(autoplay=='y'){url+='&autoplay=1';}}if(window.lazy=='y'){viel.html('<iframe class="t-iframe" data-original="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>');}else{viel.html('<iframe src="'+url+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');}}}}function t396_addHtml(ab,el){tn_console('func: addHtml');/* add data atributes */var fields_str='width,height,top,left,';fields_str+='container,axisx,axisy,widthunits,heightunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_addTooltip(ab, el) {tn_console('func: addTooltip');var fields_str = 'width,height,top,left,';fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';var fields = fields_str.split(',');el.attr('data-fields', fields_str);t396_elem__renderView(el);var pinEl = el.find('.tn-atom__pin');var tipEl = el.find('.tn-atom__tip');var tipopen = el.attr('data-field-tipopen-value');if (isMobile || (typeof tipopen!='undefined' && tipopen=='click')) {t396_setUpTooltip_mobile(el,pinEl,tipEl);} else {t396_setUpTooltip_desktop(el,pinEl,tipEl);}setTimeout(function() {$('.tn-atom__tip-img').each(function() {var foo = $(this).attr('data-tipimg-original');if (typeof foo != 'undefined' && foo != '') {$(this).attr('src', foo);}})}, 3000);}function t396_addForm(ab,el){tn_console('func: addForm');/* add data atributes */var fields_str='width,top,left,';fields_str+='inputs,container,axisx,axisy,widthunits,leftunits,topunits';var fields=fields_str.split(',');el.attr('data-fields',fields_str);/* render elem view */t396_elem__renderView(el);}function t396_elem__setFieldValue(el,prop,val,flag_render,flag_updateui,res){if(res=='')res=window.tn.curResolution;if(res<1200 && prop!='zindex'){el.attr('data-field-'+prop+'-res-'+res+'-value',val);}else{el.attr('data-field-'+prop+'-value',val);}if(flag_render=='render')elem__renderViewOneField(el,prop);if(flag_updateui=='updateui')panelSettings__updateUi(el,prop,val);}function t396_elem__getFieldValue(el,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}if(res==640){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}if(res==480){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}if(res==320){r=el.attr('data-field-'+prop+'-res-320-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-480-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-640-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-res-960-value');if(typeof r=='undefined'){r=el.attr('data-field-'+prop+'-value');}}}}}}else{r=el.attr('data-field-'+prop+'-value');}return(r);}function t396_elem__renderView(el){tn_console('func: elem__renderView');var fields=el.attr('data-fields');if(! fields) {return false;}fields = fields.split(',');/* set to element value of every fieldvia css */for ( var i = 0; i < fields.length; i++ ) {t396_elem__renderViewOneField(el,fields[i]);}}function t396_elem__renderViewOneField(el,field){var value=t396_elem__getFieldValue(el,field);if(field=='left'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('left',parseFloat(value).toFixed(1)+'px');}if(field=='top'){value = t396_elem__convertPosition__Local__toAbsolute(el,field,value);el.css('top',parseFloat(value).toFixed(1)+'px');}if(field=='width'){value = t396_elem__getWidth(el,value);el.css('width',parseFloat(value).toFixed(1)+'px');var eltype=el.attr('data-elem-type');if(eltype=='tooltip'){var pinSvgIcon = el.find('.tn-atom__pin-icon');/*add width to svg nearest parent to fix InternerExplorer problem*/if (pinSvgIcon.length > 0) {var pinSize = parseFloat(value).toFixed(1) + 'px';pinSvgIcon.css({'width': pinSize, 'height': pinSize});}el.css('height',parseInt(value).toFixed(1)+'px');}}if(field=='height'){var eltype = el.attr('data-elem-type');if (eltype == 'tooltip') {return;}value=t396_elem__getHeight(el,value);el.css('height', parseFloat(value).toFixed(1)+'px');}if(field=='container'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='width' || field=='height' || field=='fontsize' || field=='fontfamily' || field=='letterspacing' || field=='fontweight' || field=='img'){t396_elem__renderViewOneField(el,'left');t396_elem__renderViewOneField(el,'top');}if(field=='inputs'){value=el.find('.tn-atom__inputs-textarea').val();try {t_zeroForms__renderForm(el,value);} catch (err) {}}}function t396_elem__convertPosition__Local__toAbsolute(el,field,value){value = parseInt(value);if(field=='left'){var el_container,offset_left,el_container_width,el_width;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_left = window.tn.grid_offset_left;el_container_width = window.tn.grid_width;}else{el_container = 'window';offset_left = 0;el_container_width = window.tn.window_width;}/* fluid or not*/var el_leftunits=t396_elem__getFieldValue(el,'leftunits');if(el_leftunits=='%'){value = t396_roundFloat( el_container_width * value/100 );}value = offset_left + value;var el_axisx=t396_elem__getFieldValue(el,'axisx');if(el_axisx=='center'){el_width = t396_elem__getWidth(el);value = el_container_width/2 - el_width/2 + value;}if(el_axisx=='right'){el_width = t396_elem__getWidth(el);value = el_container_width - el_width + value;}}if(field=='top'){var ab=el.parent();var el_container,offset_top,el_container_height,el_height;var container=t396_elem__getFieldValue(el,'container');if(container=='grid'){el_container = 'grid';offset_top = parseFloat( ab.attr('data-artboard-proxy-min-offset-top') );el_container_height = parseFloat( ab.attr('data-artboard-proxy-min-height') );}else{el_container = 'window';offset_top = 0;el_container_height = parseFloat( ab.attr('data-artboard-proxy-max-height') );}/* fluid or not*/var el_topunits=t396_elem__getFieldValue(el,'topunits');if(el_topunits=='%'){value = ( el_container_height * (value/100) );}value = offset_top + value;var el_axisy=t396_elem__getFieldValue(el,'axisy');if(el_axisy=='center'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height/2 - el_height/2 + value;}if(el_axisy=='bottom'){/* var el_height=parseFloat(el.innerHeight()); */el_height=t396_elem__getHeight(el);value = el_container_height - el_height + value;} }return(value);}function t396_ab__setFieldValue(ab,prop,val,res){/* tn_console('func: ab__setFieldValue '+prop+'='+val);*/if(res=='')res=window.tn.curResolution;if(res<1200){ab.attr('data-artboard-'+prop+'-res-'+res,val);}else{ab.attr('data-artboard-'+prop,val);}}function t396_ab__getFieldValue(ab,prop){var res=window.tn.curResolution;var r;if(res<1200){if(res==960){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}if(res==640){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}if(res==480){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}if(res==320){r=ab.attr('data-artboard-'+prop+'-res-320');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-480');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-640');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'-res-960');if(typeof r=='undefined'){r=ab.attr('data-artboard-'+prop+'');}}}}}}else{r=ab.attr('data-artboard-'+prop);}return(r);}function t396_ab__renderViewOneField(ab,field){var value=t396_ab__getFieldValue(ab,field);}function t396_allelems__renderView(ab){tn_console('func: allelems__renderView: abid:'+ab.attr('data-artboard-recid'));ab.find(".tn-elem").each(function() {t396_elem__renderView($(this));});}function t396_ab__filterUpdate(ab){var filter=ab.find('.t396__filter');var c1=filter.attr('data-filtercolor-rgb');var c2=filter.attr('data-filtercolor2-rgb');var o1=filter.attr('data-filteropacity');var o2=filter.attr('data-filteropacity2');if((typeof c2=='undefined' || c2=='') && (typeof c1!='undefined' && c1!='')){filter.css("background-color", "rgba("+c1+","+o1+")");}else if((typeof c1=='undefined' || c1=='') && (typeof c2!='undefined' && c2!='')){filter.css("background-color", "rgba("+c2+","+o2+")");}else if(typeof c1!='undefined' && typeof c2!='undefined' && c1!='' && c2!=''){filter.css({background: "-webkit-gradient(linear, left top, left bottom, from(rgba("+c1+","+o1+")), to(rgba("+c2+","+o2+")) )" });}else{filter.css("background-color", 'transparent');}}function t396_ab__getHeight(ab, ab_height){if(typeof ab_height=='undefined')ab_height=t396_ab__getFieldValue(ab,'height');ab_height=parseFloat(ab_height);/* get Artboard height (fluid or px) */var ab_height_vh=t396_ab__getFieldValue(ab,'height_vh');if(ab_height_vh!=''){ab_height_vh=parseFloat(ab_height_vh);if(isNaN(ab_height_vh)===false){var ab_height_vh_px=parseFloat( window.tn.window_height * parseFloat(ab_height_vh/100) );if( ab_height < ab_height_vh_px ){ab_height=ab_height_vh_px;}}} return(ab_height);} function t396_hex2rgb(hexStr){/*note: hexStr should be #rrggbb */var hex = parseInt(hexStr.substring(1), 16);var r = (hex & 0xff0000) >> 16;var g = (hex & 0x00ff00) >> 8;var b = hex & 0x0000ff;return [r, g, b];}String.prototype.t396_replaceAll = function(search, replacement) {var target = this;return target.replace(new RegExp(search, 'g'), replacement);};function t396_elem__getWidth(el,value){if(typeof value=='undefined')value=parseFloat( t396_elem__getFieldValue(el,'width') );var el_widthunits=t396_elem__getFieldValue(el,'widthunits');if(el_widthunits=='%'){var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( window.tn.window_width * parseFloat( parseInt(value)/100 ) );}else{value=parseFloat( window.tn.grid_width * parseFloat( parseInt(value)/100 ) );}}return(value);}function t396_elem__getHeight(el,value){if(typeof value=='undefined')value=t396_elem__getFieldValue(el,'height');value=parseFloat(value);if(el.attr('data-elem-type')=='shape' || el.attr('data-elem-type')=='video' || el.attr('data-elem-type')=='html'){var el_heightunits=t396_elem__getFieldValue(el,'heightunits');if(el_heightunits=='%'){var ab=el.parent();var ab_min_height=parseFloat( ab.attr('data-artboard-proxy-min-height') );var ab_max_height=parseFloat( ab.attr('data-artboard-proxy-max-height') );var el_container=t396_elem__getFieldValue(el,'container');if(el_container=='window'){value=parseFloat( ab_max_height * parseFloat( value/100 ) );}else{value=parseFloat( ab_min_height * parseFloat( value/100 ) );}}}else if(el.attr('data-elem-type')=='button'){value = value;}else{value =parseFloat(el.innerHeight());}return(value);}function t396_roundFloat(n){n = Math.round(n * 100) / 100;return(n);}function tn_console(str){if(window.tn_comments==1)console.log(str);}function t396_setUpTooltip_desktop(el, pinEl, tipEl) {var timer;pinEl.mouseover(function() {/*if any other tooltip is waiting its timeout to be hided â€” hide it*/$('.tn-atom__tip_visible').each(function(){var thisTipEl = $(this).parents('.t396__elem');if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {t396_hideTooltip(thisTipEl, $(this));}});clearTimeout(timer);if (tipEl.css('display') == 'block') {return;}t396_showTooltip(el, tipEl);});pinEl.mouseout(function() {timer = setTimeout(function() {t396_hideTooltip(el, tipEl);}, 300);})}function t396_setUpTooltip_mobile(el,pinEl,tipEl) {pinEl.on('click', function(e) {if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {t396_hideTooltip(el,tipEl);} else {t396_showTooltip(el,tipEl);}});var id = el.attr("data-elem-id");$(document).click(function(e) {var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);if (isInsideTooltip) {var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");if (clickedPinId == id) {return;}}t396_hideTooltip(el,tipEl);})}function t396_hideTooltip(el, tipEl) {tipEl.css('display', '');tipEl.css({"left": "","transform": "","right": ""});tipEl.removeClass('tn-atom__tip_visible');el.css('z-index', '');}function t396_showTooltip(el, tipEl) {var pos = el.attr("data-field-tipposition-value");if (typeof pos == 'undefined' || pos == '') {pos = 'top';};var elSize = el.height();var elTop = el.offset().top;var elBottom = elTop + elSize;var elLeft = el.offset().left;var elRight = el.offset().left + elSize;var winTop = $(window).scrollTop();var winWidth = $(window).width();var winBottom = winTop + $(window).height();var tipElHeight = tipEl.outerHeight();var tipElWidth = tipEl.outerWidth();var padd=15;if (pos == 'right' || pos == 'left') {var tipElRight = elRight + padd + tipElWidth;var tipElLeft = elLeft - padd - tipElWidth;if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {pos = 'top';}}if (pos == 'top' || pos == 'bottom') {var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);if (tipElRight > winWidth) {var rightOffset = -(winWidth - elRight - padd);tipEl.css({"left": "auto","transform": "none","right": rightOffset + "px"});}if (tipElLeft < 0) {var leftOffset = -(elLeft - padd);tipEl.css({"left": leftOffset + "px","transform": "none"});}}if (pos == 'top') {var tipElTop = elTop - padd - tipElHeight;if (winTop > tipElTop) {pos = 'bottom';}}if (pos == 'bottom') {var tipElBottom = elBottom + padd + tipElHeight;if (winBottom < tipElBottom) {pos = 'top';}}tipEl.attr('data-tip-pos', pos);tipEl.css('display', 'block');tipEl.addClass('tn-atom__tip_visible');el.css('z-index', '1000');} 
 
function t404_unifyHeights(recid) {
    var el=$('#rec'+recid).find(".t404");
    el.find('.t-container').each(function() {
        var highestBox = 0;
        $('.t404__title', this).css('height', '');
        $('.t404__title', this).each(function(){
            if($(this).height() > highestBox)highestBox = $(this).height();
        });  
        if($(window).width()>=960){
          $('.t404__title',this).css('height', highestBox);   
        }else{
          $('.t404__title',this).css('height', "auto");    
        }
        
        $('.t404__descr', this).css('height', '');
        var highestBox = 0;
        $('.t404__descr', this).each(function(){
            if($(this).height() > highestBox)highestBox = $(this).height(); 
        });  
        if($(window).width()>=960){
          $('.t404__descr',this).css('height', highestBox);   
        }else{
          $('.t404__descr',this).css('height', "auto");    
        }
                
    });
}

function t404_unifyHeightsTextwrapper(recid) {
    var el=$('#rec'+recid).find(".t404");
    el.find('.t-container').each(function() {
        var highestBox = 0;
        $('.t404__textwrapper', this).each(function(){
          $(this).css("height","auto");
            if($(this).height() > highestBox)highestBox = $(this).height(); 
        });  
        if($(window).width()>=960){
          $('.t404__textwrapper',this).css('height', highestBox);   
        }else{
          $('.t404__textwrapper',this).css('height', "auto");    
        }      
    });
}

function t404_showMore(recid) {
  var el=$('#rec'+recid).find(".t404");
  el.find(".t-col").hide();
  var cards_size = el.find(".t-col").size();
  var cards_count=parseInt(el.attr("data-show-count"));
  if (cards_count > 500) { cards_count = 500; }
  var x=cards_count;
  var y=cards_count;
  el.find('.t-col:lt('+x+')').show();
  el.find('.t404__showmore').click(function () {
      x= (x+y <= cards_size) ? x+y : cards_size;
      el.find('.t-col:lt('+x+')').show();
      if(x == cards_size){
          el.find('.t404__showmore').hide();
      }
      $('.t404').trigger('displayChanged');
      if(window.lazy=='y'){t_lazyload_update();}
  });
}



 
function t410_init(recid) {
  var el=$('#rec'+recid);
  var firstimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-first");
  var firstimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-first");
  var firstimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-first");
  var secondimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-second");
  var secondimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-second");
  var secondimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-second");
  new juxtapose.JXSlider('#t410-juxtapose__' + recid + '', [{
      src: firstimgurl,
      label: firstimgdescr
  }, {
      src: secondimgurl,
      label: secondimgdescr
  }], {
      animate: false,
      showLabels: true,
      showCredits: false,
      startingPosition: '50%',
      makeResponsive: true,
      callback: function() {
          
        if (firstimgalt.length > 0) {
            el.find('.t410__wrapper .jx-image.jx-left img').attr('alt', firstimgalt);
        }
    
        if (secondimgalt.length > 0) {
            el.find('.t410__wrapper .jx-image.jx-right img').attr('alt', secondimgalt);
        }
      
        if (window.$isMobile) {
          el.find('.t410__wrapper').append('<div class="t410__mobile_left"></div><div class="t410__mobile_right"></div>');
          var hanlerWidth = el.find('.jx-handle').width(),
              leftSide = el.find('.jx-image.jx-left'),
              rightSide = el.find('.jx-image.jx-right'),
              leftWidth = leftSide.width() - hanlerWidth/2,
              rightWidth = rightSide.width() - hanlerWidth/2,
              wrapper = el.find('.t410__wrapper'),
              mobileLeft = el.find('.t410__mobile_left'),
              mobileRight = el.find('.t410__mobile_right');

          mobileLeft.css('width', leftWidth);
          mobileRight.css('width', rightWidth);

          wrapper.on('touchend', function() {
            leftWidth = leftSide.width() - hanlerWidth/2;
            rightWidth = rightSide.width() - hanlerWidth/2;
            mobileLeft.css('width', leftWidth);
            mobileRight.css('width', rightWidth);
          });
        }
      }
  });
} 
function t462_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t462__list_item a[href='"+url+"']").addClass("t-active");
  $(".t462__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t462__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t462__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t462__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t462__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t462_checkAnchorLinks(recid) {
	if($(window).width()>=960) {
	  var t462_navLinks = $("#rec"+recid+" .t462__list_item a:not(.tooltipstered)[href*='#']");
      if (t462_navLinks.length>0){
      	t462_catchScroll(t462_navLinks);
      };
	}
}

function t462_catchScroll(t462_navLinks) {
    var t462_clickedSectionId = null,
      t462_sections = new Array(),
      t462_sectionIdTonavigationLink = {},
      t462_interval = 100,
      t462_lastCall,
      t462_timeoutId,
	  t462_offsetTop = $(".t270").attr("data-offset-top");
	if (typeof t462_offsetTop == "undefined") { t462_offsetTop = 0; }
	t462_navLinks = $(t462_navLinks.get().reverse());
	t462_navLinks.each(function(){
		var t462_cursection = t462_getSectionByHref($(this));
		if (typeof t462_cursection.attr("id") != "undefined") { t462_sections.push(t462_cursection); }
		t462_sectionIdTonavigationLink[t462_cursection.attr("id")] = $(this);
	});

	t462_highlightNavLinks(t462_navLinks,t462_sections,t462_sectionIdTonavigationLink,t462_clickedSectionId,t462_offsetTop);
	t462_navLinks.click(function() {		
		if (!$(this).hasClass("tooltipstered")) {
		  t462_navLinks.removeClass('t-active');	
          t462_sectionIdTonavigationLink[t462_getSectionByHref($(this)).attr("id")].addClass('t-active');
          t462_clickedSectionId = t462_getSectionByHref($(this)).attr("id");
		}
  	});
	$(window).scroll( function() {
		var t462_now = new Date().getTime();
		if (t462_lastCall && t462_now < (t462_lastCall + t462_interval) ) {
				clearTimeout(t462_timeoutId);
				t462_timeoutId = setTimeout(function () {
						t462_lastCall = t462_now;
						t462_clickedSectionId = t462_highlightNavLinks(t462_navLinks,t462_sections,t462_sectionIdTonavigationLink,t462_clickedSectionId,t462_offsetTop);
				}, t462_interval - (t462_now - t462_lastCall) );
		} else {
				t462_lastCall = t462_now;
				t462_clickedSectionId = t462_highlightNavLinks(t462_navLinks,t462_sections,t462_sectionIdTonavigationLink,t462_clickedSectionId,t462_offsetTop);
		}
	});
}

function t462_getSectionByHref (curlink) {
	if (curlink.is('[href*="#rec"]')) { return $(".r[id='"+curlink.attr("href").substring(1)+"']"); }
	else { return $(".r[data-record-type='215']").has("a[name='"+curlink.attr("href").substring(1)+"']"); }
}

function t462_highlightNavLinks(t462_navLinks,t462_sections,t462_sectionIdTonavigationLink,t462_clickedSectionId,offsetTop) {	                                                      
	var t462_scrollPosition = $(window).scrollTop(),
		t462_valueToReturn = t462_clickedSectionId;
	$(t462_sections).each(function(e) {
			var t462_curSection = $(this),
					t462_sectionTop = t462_curSection.offset().top,
					t462_id = t462_curSection.attr('id'),
					t462_navLink = t462_sectionIdTonavigationLink[t462_id];
			if (t462_scrollPosition >= (t462_sectionTop - offsetTop) || (t462_sections[0].attr("id") == t462_id && $(window).scrollTop() >= $(document).height() - $(window).height())) {
				if (t462_clickedSectionId == null && !t462_navLink.hasClass('t-active')) {
					t462_navLinks.removeClass('t-active');
					t462_navLink.addClass('t-active');
					t462_valueToReturn = null;
				} else {
					if (t462_clickedSectionId != null && t462_id == t462_clickedSectionId) {
						t462_valueToReturn = null;
					}
				}
				return false;
			}
	});
	return t462_valueToReturn;
}

function t462_setPath(){
}

function t462_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t462").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t462").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t462_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t462").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t462_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t462").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t462_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t462"),
      burger=el.find(".t462__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t462_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}
 
function t481_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t481__list_item a[href='"+url+"']").addClass("t-active");
  $(".t481__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t481__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t481__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t481__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t481__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t481_checkAnchorLinks(recid) {
	if($(window).width()>=960) {
	  var t481_navLinks = $("#rec"+recid+" .t481__list_item a:not(.tooltipstered)[href*='#']");
      if (t481_navLinks.length>0){
      	t481_catchScroll(t481_navLinks);
      };
	}
}

function t481_catchScroll(t481_navLinks) {
    var t481_clickedSectionId = null,
      t481_sections = new Array(),
      t481_sectionIdTonavigationLink = {},
      t481_interval = 100,
      t481_lastCall,
      t481_timeoutId,
	  t481_offsetTop = $(".t270").attr("data-offset-top");
	if (typeof t481_offsetTop == "undefined") { t481_offsetTop = 0; }
	t481_navLinks = $(t481_navLinks.get().reverse());
	t481_navLinks.each(function(){
		var t481_cursection = t481_getSectionByHref($(this));
		if (typeof t481_cursection.attr("id") != "undefined") { t481_sections.push(t481_cursection); }
		t481_sectionIdTonavigationLink[t481_cursection.attr("id")] = $(this);
	});

	t481_highlightNavLinks(t481_navLinks,t481_sections,t481_sectionIdTonavigationLink,t481_clickedSectionId,t481_offsetTop);
	t481_navLinks.click(function() {		
		if (!$(this).hasClass("tooltipstered")) {
		  t481_navLinks.removeClass('t-active');	
          t481_sectionIdTonavigationLink[t481_getSectionByHref($(this)).attr("id")].addClass('t-active');
          t481_clickedSectionId = t481_getSectionByHref($(this)).attr("id");
		}
  	});
	$(window).scroll( function() {
		var t481_now = new Date().getTime();
		if (t481_lastCall && t481_now < (t481_lastCall + t481_interval) ) {
				clearTimeout(t481_timeoutId);
				t481_timeoutId = setTimeout(function () {
						t481_lastCall = t481_now;
						t481_clickedSectionId = t481_highlightNavLinks(t481_navLinks,t481_sections,t481_sectionIdTonavigationLink,t481_clickedSectionId,t481_offsetTop);
				}, t481_interval - (t481_now - t481_lastCall) );
		} else {
				t481_lastCall = t481_now;
				t481_clickedSectionId = t481_highlightNavLinks(t481_navLinks,t481_sections,t481_sectionIdTonavigationLink,t481_clickedSectionId,t481_offsetTop);
		}
	});
}

function t481_getSectionByHref (curlink) {
	if (curlink.is('[href*="#rec"]')) { return $(".r[id='"+curlink.attr("href").substring(1)+"']"); }
	else { return $(".r[data-record-type='215']").has("a[name='"+curlink.attr("href").substring(1)+"']"); }
}

function t481_highlightNavLinks(t481_navLinks,t481_sections,t481_sectionIdTonavigationLink,t481_clickedSectionId,offsetTop) {	                                                      
	var t481_scrollPosition = $(window).scrollTop(),
		t481_valueToReturn = t481_clickedSectionId;
	$(t481_sections).each(function(e) {
			var t481_curSection = $(this),
					t481_sectionTop = t481_curSection.offset().top,
					t481_id = t481_curSection.attr('id'),
					t481_navLink = t481_sectionIdTonavigationLink[t481_id];                                                 			                                                      
			if (t481_scrollPosition >= (t481_sectionTop - offsetTop) || (t481_sections[0].attr("id") == t481_id && $(window).scrollTop() >= $(document).height() - $(window).height())) {
				if (t481_clickedSectionId == null && !t481_navLink.hasClass('t-active')) {
					t481_navLinks.removeClass('t-active');
					t481_navLink.addClass('t-active');					
					t481_valueToReturn = null;
				} else {
					if (t481_clickedSectionId != null && t481_id == t481_clickedSectionId) {
						t481_valueToReturn = null;
					}
				}
				return false;
			}
	});
	return t481_valueToReturn;
}

function t481_setPath(){
}

function t481_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t481").each(function() {
      var el=$(this);
      var left_exist=el.find('.t481__leftcontainer').length;
      var left_w=el.find('.t481__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t481__rightcontainer').length;
      var right_w=el.find('.t481__rightcontainer').outerWidth(true);
    var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t481__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      //console.log(max_w);
      //console.log(center_w);
      var padd_w=40;
      var maincontainer_width=el.find(".t481__maincontainer").outerWidth(true);
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
      if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t481__leftside").css("min-width",max_w+"px");
            el.find(".t481__rightside").css("min-width",max_w+"px");
            
          }
       }else{
          el.find(".t481__leftside").css("min-width","");
          el.find(".t481__rightside").css("min-width","");  
          
      }
    });
  }
}

function t481_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t481").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);             
      }
      });
      }else{
        $(".t481").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t481_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t481").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("visibility","visible");
                                el.animate({"opacity": "1"}, 200,function() {
                                });       
                            }
                          }else{
                            el.stop();
                            el.animate({"opacity": "0"}, 200,function() {
                            });
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t481_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t481").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t481_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t481"),
      burger=el.find(".t481__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t481_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}

 
function t498_unifyHeights(recid) {
    $('#rec'+recid+' .t498 .t-container').each(function() {
        var t498__highestBox = 0;
        $('.t498__col', this).each(function(){
			var t498__curcol=$(this);
			var t498__curcolchild=t498__curcol.find('.t498__col-wrapper');
			if(t498__curcol.height() < t498__curcolchild.height())t498__curcol.height(t498__curcolchild.height());
            if(t498__curcol.height() > t498__highestBox)t498__highestBox = t498__curcol.height();
        });
        if($(window).width()>=960){
        	$('.t498__col',this).css('height', t498__highestBox);
        }else{
	        $('.t498__col',this).css('height', "auto");
        }
    });
};
 
function t509_setHeight(recid) {  
  var t509__el=$("#rec"+recid);	
  var t509__image = t509__el.find(".t509__blockimg");
  t509__image.each(function() {
    var t509__width = $(this).attr("data-image-width");
    var t509__height = $(this).attr("data-image-height");	
    var t509__ratio = t509__height/t509__width;
    var t509__padding = t509__ratio*100;    	
    $(this).css("padding-bottom",t509__padding+"%");		
  });
  
  if ($(window).width()>960){
    var t509__textwr = t509__el.find(".t509__textwrapper");
    var t509__deskimg = t509__el.find(".t509__desktopimg");
    t509__textwr.each(function() {    
    $(this).css("height", t509__deskimg.innerHeight());	
    });
  }
}
 
function t527_setHeight(recid) {
  var t527__el=$("#rec"+recid),
      t527__image = t527__el.find(".t527__bgimg:first"),
      t527__width = t527__image.attr("data-image-width"),
      t527__height = t527__image.attr("data-image-height"),
      t527__ratio = t527__height/t527__width,
      t527__padding = t527__ratio*100;	  
  $("#rec"+recid+" .t527__bgimg").css("padding-bottom",t527__padding+"%");  
} 
function t532__emulateMobileHover(recid) {
  var el = $('#rec'+recid),
      cell = el.find('.t532__cell');

  cell.hover(
    function () {
      $(this).addClass("t532__cell_hover");
    },
    function () {
      $(this).removeClass("t532__cell_hover");
    }
  );
}

function t532_setHeight(recid) {  
  var t532__el=$("#rec"+recid),
			t532__image = t532__el.find(".t532__bg:first"),
			t532__wrapper = t532__el.find(".t532__table:first"),
			t532__width = t532__image.attr("data-image-width"),
			t532__height = t532__image.attr("data-image-height"),
			t532__ratio = t532__height/t532__width;		
	$("#rec"+recid+" .t532__table").css("height",t532__wrapper.innerWidth()*t532__ratio);			    
}
 
function t569_init(recid){
  var el = $('#rec'+recid),
      line = el.find('.t569__line'),
      blocksnumber = el.find('.t569').attr('data-blocks-count'),
      t569_resize;

  if (blocksnumber=='4') {
    var cirqlenumber = 4;
  } else {
    var cirqlenumber = 8;
  }

  line.each(function() {
    var e = $(this).find('.t569__cirqle');
    for (i = 0; i < cirqlenumber; i++) {
      e.clone().insertAfter(e);
    }
  });
                      
  line.css('max-width', $('.t569__col').width() - $('.t569__bgimg').outerWidth());
                                 
  $(window).resize(function() {
    if (t569_resize) clearTimeout(t569_resize);
    t569_resize = setTimeout(function() {
      line.css('max-width', $('.t569__col').width() - $('.t569__bgimg').outerWidth());
    }, 200);        
  });
} 
function t576_init(recid){
  var el = $('#rec'+recid),
      line = el.find('.t576__line'),
      cirqle = el.find('.t576__cicqle'),
      block = el.find('.t576__item'),
      t576_resize;

  block.each(function() {
    $(this).find('.t576__circle').css('top', $(this).find('.t576__img').outerHeight() + 15);
  });

  el.find('.t576__item:first-child').find('.t576__line').css('top', el.find('.t576__item:first-child').find('.t576__img').outerHeight() + 15);
                      
  el.find('.t576__item:last-child').find('.t576__line').css('height', el.find('.t576__item:last-child').find('.t576__img').outerHeight() + 20);
} 
function t577_equalHeight(recid){
  var el = $('#rec'+recid);
  el.find('.t577').css('visibility', 'visible');
  el.find('.t577__textwrapper').css('height','auto');
  el.find('.t577__descr').css('height','auto');
  $('#rec'+recid+' .t577__row').each(function() {
    var highestBox = 0;
    $('.t577__descr', this).each(function(){
      if($(this).height() > highestBox)highestBox = $(this).height(); 
    });  
    if($(window).width()>=960 && $(this).is(':visible')){
      $('.t577__descr',this).css('height', highestBox); 
    }else{
      $('.t577__descr',this).css('height', "auto");    
    }
  });
  $('#rec'+recid+' .t577__row').each(function() {
    var highestBox = 0;
    $('.t577__textwrapper', this).each(function(){
      if($(this).height() > highestBox)highestBox = $(this).height(); 
    });  
    if($(window).width()>=960 && $(this).is(':visible')){
      $('.t577__textwrapper',this).css('height', highestBox); 
    }else{
      $('.t577__textwrapper',this).css('height', "auto");    
    }
  });
}; 
function t592_init(recid){
  var element = $('#rec'+recid).find('.t592__descr');

  var highestBox = 0;

  element.css('height','');

  element.each(function(){
    if($(this).height() > highestBox)highestBox = $(this).height(); 
  });

  if($(window).width()>=960){
      element.css('height', highestBox); 
  }else{
     element.css('height', '');    
  }
}; 
function t604_init(recid) {  
  t604_imageHeight(recid);
  t604_arrowWidth(recid);
  t604_show(recid);
  t604_hide(recid);
  $(window).bind('resize', t_throttle(function(){
    t604_arrowWidth(recid);
  }, 200));
}

function t604_show(recid) {  
  var el=$("#rec"+recid),
      play = el.find('.t604__play');
  play.click(function(){
    if($(this).attr('data-slider-video-type')=='youtube'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    if($(this).attr('data-slider-video-type')=='vimeo'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t604__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    $(this).next().css('z-index', '3');
  });
}

function t604_hide(recid) {  
  var el=$("#rec"+recid),
      body = el.find('.t604__frame');
  el.on('updateSlider', function(){
    body.html('').css('z-index', '');
  });
}

function t604_imageHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t604__separator");
  image.each(function() {
    var width = $(this).attr("data-slider-image-width");
    var height = $(this).attr("data-slider-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom",padding+"%");    
  });
}

function t604_arrowWidth(recid) {  
  var el=$("#rec"+recid),
      arrow = el.find('.t-slds__arrow_wrapper'),
      slideWidth = el.find('.t-slds__wrapper').width(),
      windowWidth = $(window).width(),
      arrowWidth = windowWidth-slideWidth;
  if(windowWidth>960){
    arrow.css('width', arrowWidth/2);
  } else {
    arrow.css('width', '');
  }
} 
function t608_setHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t608__bgimg");
  image.each(function() {
    var width = $(this).attr("data-image-width");
    var height = $(this).attr("data-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom", padding+"%");    
  });
} 
function t635_init(recid){
	t635_startType(recid);
}




function t635_startType(recid){
	var t635_el = $('#rec'+recid),
			t635_data = t635_el.find(".t635__textholder"),
			t635_animRecId = t635_data.attr("data-recid"),
			t635_animText = t635_findAnimElem(t635_animRecId),
			t635_phrasesList = [],
			t635_phrase1 = t635_data.attr("data-text1"),
			t635_phrase2 = t635_data.attr("data-text2"),
			t635_phrase3 = t635_data.attr("data-text3"),
			t635_phrase4 = t635_data.attr("data-text4"),
			t635_phrase5 = t635_data.attr("data-text5"),
			t635_speed = t635_data.attr("data-speed"),
		  t635_loop = t635_data.attr("data-loop"),
      t635_backspaceDelay = t635_data.attr("data-backspacing-delay");
    if (typeof t635_animText=="undefined"){return;}  
	if (typeof t635_phrase1!="undefined") {t635_phrasesList.push(t635_phrase1.slice(0,80));}
	if (typeof t635_phrase2!="undefined") {t635_phrasesList.push(t635_phrase2.slice(0,80));}
	if (typeof t635_phrase3!="undefined") {t635_phrasesList.push(t635_phrase3.slice(0,80));}
	if (typeof t635_phrase4!="undefined") {t635_phrasesList.push(t635_phrase4.slice(0,80));}
	if (typeof t635_phrase5!="undefined") {t635_phrasesList.push(t635_phrase5.slice(0,80));}


  if(t635_animText.length != 0 && t635_phrasesList.length != 0) {
    var t635_animTextHtml = t635_animText.html(),
        t635_animTextSplitted = t635_animTextHtml.split("|"),
		t635_curWin = $(window);
    t635_animText.html(t635_animTextSplitted[0] + "<span class=\"t635__typing-text\"></span>" + t635_animTextSplitted[1]);

    t635_updateAnimTextLimits(t635_animRecId);
    t635_curWin.bind('resize', t_throttle(function(){t635_updateAnimTextLimits(t635_animRecId);}, 200));
    setInterval(function(){t635_updateAnimTextLimits(t635_animRecId);},5000);

    var t635_animatedText = $("#rec"+t635_animRecId+" .t635__typing-text"),
        t635_animTextTop = t635_animatedText.attr("data-top-limit"),
        t635_animTextBottom = t635_animatedText.attr("data-bottom-limit"),
        t635_winTop = t635_curWin.scrollTop(),
        t635_winBottom = t635_winTop + t635_curWin.height();
        t635_animateText(t635_animRecId,t635_phrasesList,t635_speed,t635_loop,t635_backspaceDelay);
    if (t635_animTextBottom<t635_winTop || t635_animTextTop>t635_winBottom){
      $("#rec"+t635_animRecId+" .t635__typing-text").data('typed').pauseTyping();
      $("#rec"+t635_animRecId+" .t635__typing-text").html("");
    }

    t635_curWin.bind('scroll', t_throttle( function(){
      t635_animTextTop = t635_animatedText.attr("data-top-limit");
      t635_animTextBottom = t635_animatedText.attr("data-bottom-limit");
      t635_winTop = t635_curWin.scrollTop();
      t635_winBottom = t635_winTop + t635_curWin.height();
      if (t635_animTextBottom<t635_winTop || t635_animTextTop>t635_winBottom){
        $("#rec"+t635_animRecId+" .t635__typing-text").data('typed').pauseTyping();
        $("#rec"+t635_animRecId+" .t635__typing-text").html("");
      } else {
	    $("#rec"+t635_animRecId+" .t635__typing-text").data('typed').continueTyping();
      }
    }, 200));
  }
}




function t635_findAnimElem(animRecId) {
  var animRec = $("#rec"+animRecId);
  var animH1 = animRec.find("h1:contains(\'|\')").last();
  var animH2 = animRec.find("h2:contains(\'|\')").last();
  var animH3 = animRec.find("h3:contains(\'|\')").last();
  var animDiv = animRec.find("div:contains(\'|\')").last();
  if (typeof animH1!="undefined" && animH1.length>0) {
    return animH1;
  }
  if (typeof animH2!="undefined" && animH2.length>0) {
    return animH2;
  }
  if (typeof animH3!="undefined" && animH3.length>0) {
    return animH3;
  }
  if (typeof animDiv!="undefined" && animDiv.length>0) {
    return animDiv;
  }
}




function t635_updateAnimTextLimits(t635_animRecId){
	var t635_animatedBlock = $("#rec"+t635_animRecId),
		t635_animatedText = t635_animatedBlock.find(".t635__typing-text");
	t635_animatedText.attr("data-top-limit",t635_animatedText.offset().top);
	t635_animatedText.attr("data-bottom-limit",(t635_animatedBlock.offset().top+t635_animatedBlock.height()));
}




function t635_animateText(t635_animRecId,t635_phrasesList,t635_speed,t635_loop,t635_backspaceDelay) {
	if (typeof t635_speed=="undefined"){t635_speed = 40;}
  if (typeof t635_backspaceDelay=="undefined"){t635_backspaceDelay = 800;}
  if (typeof t635_loop=="undefined"){t635_loop = true;}else{t635_loop = false;}
	$("#rec"+t635_animRecId+" .t635__typing-text").typed({
		strings: t635_phrasesList,
		typeSpeed: t635_speed*1,
		startDelay: 600,
		backSpeed: 10,
		backDelay: t635_backspaceDelay*1,
		loop: t635_loop,
		contentType: 'text'
	});
}
 
function t668_init(recid){
  var el= $('#rec'+recid),
      toggler = el.find(".t668__header");
  
  toggler.click(function(){
    $(this).toggleClass("t668__opened");
    $(this).next().slideToggle();
    if(window.lazy=='y'){t_lazyload_update();}
  });
}
 
function t670_init(recid) {  
  t670_imageHeight(recid);
  t670_show(recid);
  t670_hide(recid);
}

function t670_show(recid) {
  var el=$("#rec"+recid),
      play = el.find('.t670__play');
  play.click(function(){
    if($(this).attr('data-slider-video-type')=='youtube'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    if($(this).attr('data-slider-video-type')=='vimeo'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>");
    }
    $(this).next().css('z-index', '3');
  });
}

function t670_hide(recid) {  
  var el=$("#rec"+recid),
      body = el.find('.t670__frame');
  el.on('updateSlider', function(){
    body.html('').css('z-index', '');
  });
}

function t670_imageHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t670__separator");
  image.each(function() {
    var width = $(this).attr("data-slider-image-width");
    var height = $(this).attr("data-slider-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom",padding+"%");    
  });
} 
function t674_init(recid){
  $("#rec"+recid+" .t674__img-holder").on('load', function() {
    $("body").addClass("t674__body_with-bg");
  }).each(function() {
    if(this.complete) $(this).load();
  });
}
 
function t678_onSuccess(t678_form){
	var t678_inputsWrapper = t678_form.find('.t-form__inputsbox');
    var t678_inputsHeight = t678_inputsWrapper.height();
    var t678_inputsOffset = t678_inputsWrapper.offset().top;
    var t678_inputsBottom = t678_inputsHeight + t678_inputsOffset;
	var t678_targetOffset = t678_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t678_target = t678_targetOffset - 200;
    }	else {
        var t678_target = t678_targetOffset - 100;
    }

    if (t678_targetOffset > $(window).scrollTop() || ($(document).height() - t678_inputsBottom) < ($(window).height() - 100)) {
        t678_inputsWrapper.addClass('t678__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t678_target}, 400);
        setTimeout(function(){t678_inputsWrapper.addClass('t678__inputsbox_hidden');}, 400);
    }

	var successurl = t678_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}

 
function t686_init(recid){
	setTimeout(function(){
      t686_setHeight(recid);
    }, 500);
    
	var t686__doResize;
	$(window).resize(function(){
		clearTimeout(t686__doResize);
		t686__doResize = setTimeout(function() {
			t686_setHeight(recid);
		}, 200);
	});
}

function t686_setHeight(recid){
	var t686_el = $('#rec'+recid+' .t686'),
        t686_ratio = t686_el.attr('data-tile-ratio'),
        t686_ratioHeight = t686_el.find('.t686__col').width()*t686_ratio;

	t686_el.find('.t686__row').each(function() {
		var t686_largestHeight = 0,
				t686_currow = $(this);

		$('.t686__table', this).each(function(){
			var t686_curCol = $(this),
          		t686_curColHeight = t686_curCol.find(".t686__textwrapper").outerHeight();
      		if ($(this).find(".t686__cell").hasClass("t686__button-bottom")){ t686_curColHeight+= t686_curCol.find(".t686__button-container").outerHeight(); }
			if(t686_curColHeight > t686_largestHeight){ t686_largestHeight = t686_curColHeight; }
		});

		if($(window).width()>=960){
			if (t686_largestHeight>t686_ratioHeight){ $('.t686__table',this).css('height', t686_largestHeight); }
			else { $('.t686__table',this).css('height', t686_ratioHeight); }
			$('.t686__table',this).css('min-height', 'auto');
		} else {
			$('.t686__table',this).css('min-height', t686_ratioHeight);
			$('.t686__table',this).css('height','');
		}
		
		if (t686_GetIEVersion() > 0){
            var curRowHeight = $('.t686__table',this).css('height');
            $('.t686__bg',this).css('height', curRowHeight);
            $('.t686__overlay',this).css('height', curRowHeight);
        }
	});
}

function t686_GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    if (Idx > 0) {
      return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
    } else {
      if (!!navigator.userAgent.match(/Trident\/7\./)){
        return 11;
      } else {
        return 0;
      }
    }
}
 
function t698_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 }

function t698_onSuccess(t698_form){
	var t698_inputsWrapper = t698_form.find('.t-form__inputsbox');
    var t698_inputsHeight = t698_inputsWrapper.height();
    var t698_inputsOffset = t698_inputsWrapper.offset().top;
    var t698_inputsBottom = t698_inputsHeight + t698_inputsOffset;
	var t698_targetOffset = t698_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t698_target = t698_targetOffset - 200;
    }	else {
        var t698_target = t698_targetOffset - 100;
    }

    if (t698_targetOffset > $(window).scrollTop() || ($(document).height() - t698_inputsBottom) < ($(window).height() - 100)) {
        t698_inputsWrapper.addClass('t698__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t698_target}, 400);
        setTimeout(function(){t698_inputsWrapper.addClass('t698__inputsbox_hidden');}, 400);
    }

	var successurl = t698_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

} 
function t704_onSuccess(t704_form){
	var t704_inputsWrapper = t704_form.find('.t-form__inputsbox');
    var t704_inputsHeight = t704_inputsWrapper.height();
    var t704_inputsOffset = t704_inputsWrapper.offset().top;
    var t704_inputsBottom = t704_inputsHeight + t704_inputsOffset;
	var t704_targetOffset = t704_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t704_target = t704_targetOffset - 200;
    }	else {
        var t704_target = t704_targetOffset - 100;
    }

    if (t704_targetOffset > $(window).scrollTop() || ($(document).height() - t704_inputsBottom) < ($(window).height() - 100)) {
        t704_inputsWrapper.addClass('t704__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t704_target}, 400);
        setTimeout(function(){t704_inputsWrapper.addClass('t704__inputsbox_hidden');}, 400);
    }

	var successurl = t704_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}
 
function t706_onSuccessCallback(t706_form){
 /*if (typeof localStorage === 'object') {
	try {
	  localStorage.removeItem("tcart");
	} catch (e) {
	  console.log('Your web browser does not support localStorage.');
	}
 }		
 delete window.tcart;
 tcart__loadLocalObj();*/
 $( ".t706__cartwin-products" ).slideUp( 10, function() {	
 });
 $( ".t706__cartwin-bottom" ).slideUp( 10, function() {	
 });
 $( ".t706 .t-form__inputsbox" ).slideUp( 700, function() {	
 });
 /*window.tcart_success='yes';*/
 try {
	/*fix IOS11 cursor bug + general IOS background scroll*/
	tcart__unlockScroll();
 } catch (e) {}
} 
function t712_onSuccess(t712_form){
	var t712_inputsWrapper = t712_form.find('.t-form__inputsbox');
    var t712_inputsHeight = t712_inputsWrapper.height();
    var t712_inputsOffset = t712_inputsWrapper.offset().top;
    var t712_inputsBottom = t712_inputsHeight + t712_inputsOffset;
	var t712_targetOffset = t712_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t712_target = t712_targetOffset - 200;
    }	else {
        var t712_target = t712_targetOffset - 100;
    }

    if (t712_targetOffset > $(window).scrollTop() || ($(document).height() - t712_inputsBottom) < ($(window).height() - 100)) {
        t712_inputsWrapper.addClass('t712__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t712_target}, 400);
        setTimeout(function(){t712_inputsWrapper.addClass('t712__inputsbox_hidden');}, 400);
    }

	var successurl = t712_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t712_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 } 
function t716_onSuccess(t716_form){
	var t716_inputsWrapper = t716_form.find('.t-form__inputsbox');
    var t716_inputsHeight = t716_inputsWrapper.height();
    var t716_inputsOffset = t716_inputsWrapper.offset().top;
    var t716_inputsBottom = t716_inputsHeight + t716_inputsOffset;
	var t716_targetOffset = t716_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t716_target = t716_targetOffset - 200;
    }	else {
        var t716_target = t716_targetOffset - 100;
    }

    if (t716_targetOffset > $(window).scrollTop() || ($(document).height() - t716_inputsBottom) < ($(window).height() - 100)) {
        t716_inputsWrapper.addClass('t716__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t716_target}, 400);
        setTimeout(function(){t716_inputsWrapper.addClass('t716__inputsbox_hidden');}, 400);
    }

	var successurl = t716_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t716_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 }
 
function t722_onSuccess(t722_form){
	var t722_inputsWrapper = t722_form.find('.t-form__inputsbox');
    var t722_inputsHeight = t722_inputsWrapper.height();
    var t722_inputsOffset = t722_inputsWrapper.offset().top;
    var t722_inputsBottom = t722_inputsHeight + t722_inputsOffset;
	var t722_targetOffset = t722_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t722_target = t722_targetOffset - 200;
    }	else {
        var t722_target = t722_targetOffset - 100;
    }

    if (t722_targetOffset > $(window).scrollTop() || ($(document).height() - t722_inputsBottom) < ($(window).height() - 100)) {
        t722_inputsWrapper.addClass('t722__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t722_target}, 400);
        setTimeout(function(){t722_inputsWrapper.addClass('t722__inputsbox_hidden');}, 400);
    }

	var successurl = t722_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t722_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 }
 
function t744_init(recid){
  t_sldsInit(recid);

  setTimeout(function(){
    t_prod__init(recid);
    t744__hoverZoom_init(recid);
  }, 500);

  $('#rec'+recid).find('.t744').bind('displayChanged',function(){
      t744_updateSlider(recid);
  });
}

function t744__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t744_updateSlider(recid){
  var el=$('#rec'+recid);
  t_slds_SliderWidth(recid);
  sliderWrapper = el.find('.t-slds__items-wrapper');
  sliderWidth = el.find('.t-slds__container').width();
  pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
  sliderWrapper.css({
      transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
  });
  t_slds_UpdateSliderHeight(recid);
  t_slds_UpdateSliderArrowsHeight(recid);
} 
function t746_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  t746_imageHeight(recid);
  t746_arrowWidth(recid);
  t746_show(recid);
  t746_hide(recid);
  $(window).bind('resize', t_throttle(function(){
    t746_arrowWidth(recid);
  }, 200));
  $( window ).on( "orientationchange", function( event ) {
     setTimeout(function() { t_slds_updateSlider(recid); }, 500);
    });
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t746_showPopup(recid);
      t_sldsInit(recid);
      t_slds_updateSlider(recid);
      t746_arrowWidth(recid);
      t746_resizePopup(recid);
      e.preventDefault();
      if(window.lazy=='y'){t_lazyload_update();}
      if (analitics > '') {
        var virtTitle = hook;
        if (virtTitle.substring(0,7) == '#popup:') {
            virtTitle = virtTitle.substring(7);
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
      }
    });
  }
}

function t746_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup')
      iframeBody = el.find('.t746__frame');;

  popup.css('display', 'block');
  if(window.lazy=='y'){t_lazyload_update();}
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) {
      iframeBody.html('').css('z-index', '');
      t746_closePopup();
    }
  });

  el.find('.t-popup__close').click(function(e){
    iframeBody.html('').css('z-index', '');
    t746_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t746_closePopup();
      iframeBody.html('').css('z-index', '');
    }
  });
}

function t746_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t746_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height(),
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}
/* deprecated */
function t746_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
}

function t746_show(recid) {  
  var el=$("#rec"+recid),
      play = el.find('.t746__play');
  play.click(function(){
    if($(this).attr('data-slider-video-type')=='youtube'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    if($(this).attr('data-slider-video-type')=='vimeo'){
      var url = $(this).attr('data-slider-video-url');
      $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/"+url+"?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    }
    $(this).next().css('z-index', '3');
  });
}

function t746_hide(recid) {  
  var el=$("#rec"+recid),
      body = el.find('.t746__frame');
  el.on('updateSlider', function(){
    body.html('').css('z-index', '');
  });
}

function t746_imageHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t746__separator");
  image.each(function() {
    var width = $(this).attr("data-slider-image-width");
    var height = $(this).attr("data-slider-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom",padding+"%");    
  });
}

function t746_arrowWidth(recid) {  
  var el=$("#rec"+recid),
      arrow = el.find('.t-slds__arrow_wrapper'),
      slideWidth = el.find('.t-slds__wrapper').width(),
      windowWidth = $(window).width(),
      arrowWidth = windowWidth-slideWidth;
  if(windowWidth>960){
    arrow.css('width', arrowWidth/2);
  } else {
    arrow.css('width', '');
  }
} 
function t754__init(recid){
  setTimeout(function(){
    t_prod__init(recid);
    t754__hoverZoom_init(recid);
    t754_initPopup(recid);
    t754__updateLazyLoad(recid);
    t754__alignButtons_init(recid);
  }, 500);
  
  
}

function t754__alignButtons_init(recid) {
    var rec = $('#rec' + recid);
    if (rec.find('[data-buttons-v-align]')[0]) {
        try {
            t754__alignButtons(recid);
            $(window).bind(
                'resize',
                t_throttle(function() {
                    if (
                        typeof window.noAdaptive !== 'undefined' &&
                        window.noAdaptive === true &&
                        $isMobile
                    ) {
                        return;
                    }
                    t754__alignButtons(recid);
                }, 200)
            );

            $('.754').bind('displayChanged', function() {
                t754__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t754__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t754__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t754__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;

    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow =
        $(window).width() <= 960 && rec.find('.t754__container_mobile-flex')[0]
            ? true
            : false;
    var mobileTwoItemsInRow =
        $(window).width() <= 480 && rec.find('.t754 .mobile-two-columns')[0]
            ? true
            : false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }

    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var wrappersInRow = [];

    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto';
        } else {
            
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight;
            }

            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px';
            });

            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = [];
            }

            i++;
        }
    });
}


function t754__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t754__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t754__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t754_initPopup(recid){
  var rec=$('#rec'+recid); 
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t754__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){	
      e.preventDefault();
      t754_showPopup(recid);	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');
    
    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

	  var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0 && curUrl.indexOf('#%21%2Ftproduct%2F') < 0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }	
      t754_updateSlider(recid+' #t754__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t754_checkUrl(recid); }
  t754_copyTypography(recid);
}

function t754_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ 
      tprodIndex = curUrl.indexOf('%23!/tproduct/'); 
      if(tprodIndex<0){tprodIndex = curUrl.indexOf('#%21%2Ftproduct%2F')};
  }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t754_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t754_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t754_closePopup();
    }
  });

  el.find('.t-popup__close, .t754__close-text').click(function(e){
    t754_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t754_closePopup();
    }
  });
}

function t754_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ 
  indexToRemove=curUrl.indexOf('%23!/tproduct/'); 
  if(indexToRemove<0){indexToRemove = curUrl.indexOf('#%21%2Ftproduct%2F')};
  }
  curUrl=curUrl.substring(0,indexToRemove);
  setTimeout(function() {
    $(".t-popup").scrollTop(0);  
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }                                                                        	
  }, 300);
}

function t754_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}			
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t754_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t754__title').attr('style');
	var descrStyle=rec.find('.t754__descr').attr('style');
	rec.find('.t-popup .t754__title').attr("style",t754_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t754__descr, .t-popup .t754__text').attr("style",t754_removeSizeStyles(descrStyle));
} 
function t762_init(recid){
  t_sldsInit(recid);

  setTimeout(function(){
    t_prod__init(recid);
    t762__hoverZoom_init(recid);
  }, 500);
  
  $('#rec'+recid).find('.t762').bind('displayChanged',function(){
      t_slds_updateSlider(recid);
  });  
}

function t762__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
} 
function t764_updateSlider(recid){
  var el=$('#rec'+recid);
  t_slds_SliderWidth(recid);
  sliderWrapper = el.find('.t-slds__items-wrapper');
  sliderWidth = el.find('.t-slds__container').width();
  pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
  sliderWrapper.css({
      transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
  });
  t_slds_UpdateSliderHeight(recid);
  t_slds_UpdateSliderArrowsHeight(recid);
} 
function t774_init(recid){
  t774_unifyHeights(recid);

  $(window).bind('resize', t_throttle(function(){t774_unifyHeights(recid)}, 200));

  $(".t774").bind("displayChanged",function(){
    t774_unifyHeights(recid);
  });
  
    $(window).load(function() {
        t774_unifyHeights(recid);
    });  
    
    setTimeout(function(){
      t774__updateLazyLoad(recid);
    }, 500);    
}


function t774__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t774__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview" && window.lazy === "y") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}


function t774_unifyHeights(recid){
    var t774_el = $('#rec'+recid),
        t774_blocksPerRow = t774_el.find(".t774__container").attr("data-blocks-per-row"),
        t774_cols = t774_el.find(".t774__content"),
		t774_mobScroll = t774_el.find(".t774__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t774_mobScroll==0){
		t774_cols.css("height","auto");
		return;
	}

   	var t774_perRow = +t774_blocksPerRow;	
	if ($(window).width()<=960 && t774_mobScroll>0) {var t774_perRow = t774_cols.length;}
	else { if ($(window).width()<=960) {var t774_perRow = 2;} }

	for( var i = 0; i < t774_cols.length; i +=t774_perRow ){
		var t774_maxHeight = 0,
			t774_row = t774_cols.slice(i, i + t774_perRow);		
		t774_row.each(function(){
          var t774_curText = $(this).find(".t774__textwrapper"),
              t774_curBtns = $(this).find(".t774__btn-wrapper, .t774__btntext-wrapper"),
              t774_itemHeight = t774_curText.outerHeight() + t774_curBtns.outerHeight();		  
          if ( t774_itemHeight > t774_maxHeight ) { t774_maxHeight = t774_itemHeight; }
		});
		t774_row.css( "height", t774_maxHeight );
	}
} 
function t776__init(recid){
  setTimeout(function(){
    t_prod__init(recid);
    t776_initPopup(recid);
    t776__hoverZoom_init(recid);
    t776__updateLazyLoad(recid);
    t776__alignButtons_init(recid);
  }, 500);
}

function t776__alignButtons_init(recid) {
    var rec = $('#rec' + recid);
    if (rec.find('[data-buttons-v-align]')[0]) {
        try {
            t776__alignButtons(recid);
            $(window).bind(
                'resize',
                t_throttle(function() {
                    if (
                        typeof window.noAdaptive !== 'undefined' &&
                        window.noAdaptive === true &&
                        $isMobile
                    ) {
                        return;
                    }
                    t776__alignButtons(recid);
                }, 200)
            );

            $('.776').bind('displayChanged', function() {
                t776__alignButtons(recid);
            });

            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t776__alignButtons(recid);
                });
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message);
        }
    }
}

function t776__alignButtons(recid) {
    var rec = $('#rec'+recid);
    var wrappers = rec.find('.t776__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t776__container_mobile-flex')[0] ? true: false;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t776 .mobile-two-columns')[0] ? true: false;

    if (mobileView) {
        itemsInRow = 1;
    }

    if (tableView) {
        itemsInRow = 2;
    }
    
    if (mobileTwoItemsInRow) {
        itemsInRow = 2;
    }

    if (mobileOneRow) {
        itemsInRow = 999999;
    }

    var i = 1;
    var wrappersInRow = [];
    
    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto';
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight;
            }

            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px';
            });
            
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = [];
            }

            i++;
        }
    });
}

function t776__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t776__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t776__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t776_initPopup(recid){
  var rec=$('#rec'+recid); 
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t776__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){	
      e.preventDefault();
      t776_showPopup(recid);	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');

    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

      var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }
      t776_updateSlider(recid+' #t776__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t776_checkUrl(recid); }
  t776_copyTypography(recid);
}

function t776_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t776_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t776_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t776_closePopup();
    }
  });

  el.find('.t-popup__close, .t776__close-text').click(function(e){
    t776_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t776_closePopup();
    }
  });
}

function t776_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);
  setTimeout(function() {
    $(".t-popup").scrollTop(0);  
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }                                                                        	
  }, 300);
}

function t776_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}			
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t776_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t776__title').attr('style');
	var descrStyle=rec.find('.t776__descr').attr('style');
	rec.find('.t-popup .t776__title').attr("style",t776_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t776__descr, .t-popup .t776__text').attr("style",t776_removeSizeStyles(descrStyle));
} 
function t778__init(recid){
  t778_unifyHeights(recid);
  $(window).load(function(){
    t778_unifyHeights(recid);
  });  

  $(window).bind('resize', t_throttle(function(){t778_unifyHeights(recid)}, 200));

  $(".t778").bind("displayChanged",function(){
      t778_unifyHeights(recid);
  });

  setTimeout(function(){
    t_prod__init(recid);
    t778_initPopup(recid);
    t778__hoverZoom_init(recid);
    t778__updateLazyLoad(recid);
  }, 500);
}

function t778__hoverZoom_init(recid) {
    if(isMobile) {
        return;
    }
    var rec = $('#rec'+recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: true,
                        url: url
                    };
                    return jQuery.ajax(options);
                };
            }
            $.cachedZoomScript(
                'https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js'
            ).done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container");
                    }, 500);
                } else {
                    console.log('Upload script error: ' + textStatus);
                }
            });
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message);
    } 
}

function t778__updateLazyLoad(recid) {
  var scrollContainer = $("#rec"+recid+" .t778__container_mobile-flex");
  var curMode = $(".t-records").attr("data-tilda-mode");
  if (scrollContainer.length && curMode!="edit" && curMode!="preview") {
    scrollContainer.bind('scroll', t_throttle(function() {
        t_lazyload_update();
    }, 500));
  }
}

function t778_unifyHeights(recid){
    var t778_el = $('#rec'+recid),
        t778_blocksPerRow = t778_el.find(".t778__container").attr("data-blocks-per-row"),
        t778_cols = t778_el.find(".t778__content"),
		t778_mobScroll = t778_el.find(".t778__scroll-icon-wrapper").length;

	if($(window).width()<=480 && t778_mobScroll==0){
		t778_cols.css("height","auto");
		return;
	}

   	var t778_perRow = +t778_blocksPerRow;	
	if ($(window).width()<=960 && t778_mobScroll>0) {var t778_perRow = t778_cols.length;}
	else { if ($(window).width()<=960) {var t778_perRow = 2;} }

	for( var i = 0; i < t778_cols.length; i +=t778_perRow ){
		var t778_maxHeight = 0,
			t778_row = t778_cols.slice(i, i + t778_perRow);		
		t778_row.each(function(){
          var t778_curText = $(this).find(".t778__textwrapper"),
              t778_curBtns = $(this).find(".t778__btn-wrapper_absolute"),
              t778_itemHeight = t778_curText.outerHeight() + t778_curBtns.outerHeight();		  
          if ( t778_itemHeight > t778_maxHeight ) { t778_maxHeight = t778_itemHeight; }
		});
		t778_row.css( "height", t778_maxHeight );
	}
}


function t778_initPopup(recid){
  var rec=$('#rec'+recid); 
  rec.find('[href^="#prodpopup"]').one( "click", function(e) {
      e.preventDefault();	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  t_sldsInit(recid+' #t778__product-' + lid_prod + '');
  });
  rec.find('[href^="#prodpopup"]').click(function(e){	
      e.preventDefault();
      t778_showPopup(recid);	  
	  var el_popup=rec.find('.t-popup');
	  var el_prod=$(this).closest('.js-product');
	  var lid_prod=el_prod.attr('data-product-lid');
	  el_popup.find('.js-product').css('display','none');
	  var el_fullprod=el_popup.find('.js-product[data-product-lid="'+lid_prod+'"]');
	  el_fullprod.css('display','block');
	  
    var analitics=el_popup.attr('data-track-popup');
    if (analitics > '') {
        var virtTitle = el_fullprod.find('.js-product-name').text();
        if (! virtTitle) {
            virtTitle = 'prod'+lid_prod;
        }
        Tilda.sendEventToStatistics(analitics, virtTitle);
    }

	  var curUrl = window.location.href;
      if (curUrl.indexOf('#!/tproduct/')<0 && curUrl.indexOf('%23!/tproduct/')<0) {
        if (typeof history.replaceState!='undefined'){
          window.history.replaceState('','',window.location.href+'#!/tproduct/'+recid+'-'+lid_prod);
        }
      }	
      t778_updateSlider(recid+' #t778__product-' + lid_prod + '');
      if(window.lazy=='y'){t_lazyload_update();}
  });
  if ($('#record'+recid).length==0){ t778_checkUrl(recid); }
  t778_copyTypography(recid);
}

function t778_checkUrl(recid){
  var curUrl = window.location.href;
  var tprodIndex = curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex<0){ tprodIndex = curUrl.indexOf('%23!/tproduct/'); }
  if (tprodIndex>=0){
    var curUrl = curUrl.substring(tprodIndex,curUrl.length);
    var curProdLid = curUrl.substring(curUrl.indexOf('-')+1,curUrl.length);
    var rec=$('#rec'+recid);
    if (curUrl.indexOf(recid)>=0 && rec.find('[data-product-lid='+curProdLid+']').length) {
  	  rec.find('[data-product-lid='+curProdLid+'] [href^="#prodpopup"]').triggerHandler('click');
    }
  }
}

function t778_updateSlider(recid) {
    var el=$('#rec'+recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid);
}

function t778_showPopup(recid){
  var el=$('#rec'+recid);
  var popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
    if(window.lazy=='y'){t_lazyload_update();}
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').mousedown(function(e){
    var windowWidth = $(window).width();
    var maxScrollBarWidth = 17;
    var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
    if(e.clientX > windowWithoutScrollBar) {
        return;
    }
    if (e.target == this) {
      t778_closePopup();
    }
  });

  el.find('.t-popup__close, .t778__close-text').click(function(e){
    t778_closePopup();
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) {
      t778_closePopup();
    }
  });
}

function t778_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  var curUrl=window.location.href;
  var indexToRemove=curUrl.indexOf('#!/tproduct/');
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove<0){ indexToRemove=curUrl.indexOf('%23!/tproduct/'); }
  curUrl=curUrl.substring(0,indexToRemove);	
  setTimeout(function() {
    $(".t-popup").scrollTop(0);  
    $('.t-popup').not('.t-popup_show').css('display', 'none');
	if (typeof history.replaceState!='undefined'){
      window.history.replaceState('','',curUrl);
    }                                                                        	
  }, 300);
}

function t778_removeSizeStyles(styleStr){
	if(typeof styleStr!="undefined" && (styleStr.indexOf('font-size')>=0 || styleStr.indexOf('padding-top')>=0 || styleStr.indexOf('padding-bottom')>=0)){
		var styleStrSplitted = styleStr.split(';');
		styleStr = "";
		for (var i=0;i<styleStrSplitted.length;i++){
			if(styleStrSplitted[i].indexOf('font-size')>=0 || styleStrSplitted[i].indexOf('padding-top')>=0 || styleStrSplitted[i].indexOf('padding-bottom')>=0){
				styleStrSplitted.splice(i,1); i--; continue;
			}			
			if(styleStrSplitted[i]==""){continue;}
			styleStr+=styleStrSplitted[i]+";";
		}
	}
	return styleStr;
}

function t778_copyTypography(recid){
  var rec=$('#rec'+recid);
  var titleStyle=rec.find('.t778__title').attr('style');
	var descrStyle=rec.find('.t778__descr').attr('style');
	rec.find('.t-popup .t778__title').attr("style",t778_removeSizeStyles(titleStyle));
	rec.find('.t-popup .t778__descr, .t-popup .t778__text').attr("style",t778_removeSizeStyles(descrStyle));
} 
function t788_init(recid){
  setTimeout(function(){
    $('#rec'+recid+' .t788').addClass('js-product');
    $('#rec'+recid+' .t-cover__carrier').addClass('js-product-img');      
    t_prod__init(recid);
  }, 500);
} 
function t794_init(recid){
  var hook = $("#rec"+recid+" .t794").attr("data-tooltip-hook");
  if(typeof hook == "undefined" || hook == ""){return;};
  var hookLinks = $("a[href='"+hook+"']");
  hookLinks.addClass("t794__tm-link");
  hookLinks.attr("data-tooltip-menu-id",recid);
  t794_addArrow(recid,hookLinks);
  t794_setUpMenu(recid,hookLinks);
  t794_highlight();
}


function t794_setUpMenu(recid,hookLinks) {
  var submenu=$("#rec"+recid+" .t794__tooltip-menu");
  if (isMobile) {
    t794_setUpMenu_mobile(recid,hookLinks,submenu);
  } else {
    t794_setUpMenu_desktop(recid,hookLinks,submenu);
  }
  $(window).bind('scroll', t_throttle(function(){
    if (submenu.hasClass("t794__tooltip-menu_show")) {
      t794_hideSubmenu(submenu);
    }
  }, 300));
  $(".t794__tooltip-menu a[href*=#]").click(function(){
    t794_hideSubmenu(submenu);
    $('.t450, .t199__mmenu, .t280, .t282, .t204__burger, .t451, .t466').trigger('clickedAnchorInTooltipMenu');
    
    $(".t794__tooltip-menu a[href*=#]").removeClass('t-active');
    $(this).addClass('t-active');
  });
}


function t794_setUpMenu_mobile(recid,hookLinks,submenu) {
  var vIndent=$("#rec"+recid+" .t794").attr('data-tooltip-margin');
  hookLinks.on("click",function(e) {
    if (submenu.hasClass("t794__tooltip-menu_show")) {
      t794_hideSubmenu(submenu);
    } else {
      var curAnchor = $(this);
      t794_showSubmenu(curAnchor,submenu,vIndent);
    }
    e.preventDefault();
  });
  $(document).click(function(e) {
    var isInsideSubmenu = ($(e.target).hasClass("t794__tooltip-menu") || $(e.target).parents(".t794__tooltip-menu").length > 0);
    var isAnchor = ($(e.target).hasClass("t794__tm-link") || $(e.target).parents(".t794__tm-link").length > 0);
    if (isAnchor) {
      var curAnchor;
      if ($(e.target).hasClass("t794__tm-link")) {
        curAnchor = $(e.target);
      } else {
        curAnchor = $(e.target).parents(".t794__tm-link");
      }
      if (curAnchor.attr("data-tooltip-menu-id")!=recid && submenu.hasClass("t794__tooltip-menu_show")) {
        t794_hideSubmenu(submenu);
      }
    }
    if(!isInsideSubmenu && !isAnchor && submenu.hasClass("t794__tooltip-menu_show")) {
      t794_hideSubmenu(submenu);
    }
  });
}


function t794_setUpMenu_desktop(recid,hookLinks,submenu) {
  var vIndent=$("#rec"+recid+" .t794").attr('data-tooltip-margin');  
  var timer;
  hookLinks.add(submenu).on("mouseover",function(){
    /*if submenu is hovered while disappearing*/
    if ($(this).hasClass("t794__tooltip-menu") && !$(this).hasClass("t794__tooltip-menu_show")){return;}
    clearTimeout(timer);
    /*if link is already hoverd and now hover is on submenu element*/
    if ($(this).hasClass("t794__tooltip-menu") && submenu.hasClass("t794__tooltip-menu_show")){return;}
    var curAnchor = $(this);
    t794_showSubmenu(curAnchor,submenu,vIndent);
  });
  hookLinks.add(submenu).on("mouseout",function(){
    timer = setTimeout(function(){
      t794_hideSubmenu(submenu);
    }, 300);
  });
  hookLinks.on("click",function(e){
    e.preventDefault();
  });
}


function t794_showSubmenu(curAnchor,submenu,vIndent) {
  var submenuHeight = submenu.outerHeight();
  var submenuWidth = submenu.outerWidth();
  var anchorHeight = curAnchor.height();
  var anchorWidth = curAnchor.width();
  if (curAnchor.hasClass('t-btn')) {
    anchorWidth = curAnchor.outerWidth();
  }  
  var winHeight = $(window).height();
  var winWidth = $(window).width();
  var scrollTop = $(window).scrollTop();
  var anchorLeft = curAnchor.offset().left;
  if (typeof vIndent != "undefined" && vIndent != "") {
    vIndent = vIndent.replace("px","")*1;
    /*add arrow*/
    vIndent = vIndent + 10;
  }
  var posy = curAnchor.offset().top + anchorHeight + vIndent;
  var posx = anchorLeft;
  /*detect posy, show on the top or bottom?*/
  if (posy + submenuHeight > scrollTop + winHeight) {
    posy = Math.max(posy - submenuHeight - anchorHeight - vIndent*2, scrollTop);
    submenu.removeClass("t794__tooltip-menu_bottom").addClass("t794__tooltip-menu_top");
  } else {
    submenu.removeClass("t794__tooltip-menu_top").addClass("t794__tooltip-menu_bottom");
  }
  if (posx + submenuWidth/2 < winWidth) {
    /*show in the center of anchor*/
    posx = posx + (anchorWidth - submenuWidth) / 2;
    /*show near left window border*/
    if (posx < 0) {
      posx = 10;
    }
  } else {
    /*show near right window border*/
    posx = winWidth - submenuWidth - 10;
  }
  submenu.css({"display":"block","left":posx,"top":posy});
  submenu[0].offsetHeight;
  submenu.addClass("t794__tooltip-menu_show");
  curAnchor.addClass("t794__tm-link_active");
}


function t794_hideSubmenu(submenu) {
  submenu.css({"display":"","left":"","top":""});
  submenu.removeClass("t794__tooltip-menu_show");
  $(".t794__tm-link_active").removeClass("t794__tm-link_active");
}


function t794_addArrow(recid,hookLinks){
  var arrow=$("#rec"+recid+" .t794").attr('data-add-arrow');
  if (typeof arrow == "undefined" || arrow == ""){return;};
  hookLinks.each(function(){
    var arrowHeight = $(this).height();
    $(this).append("<div class=\"t794__arrow\" style=\"height: "+arrowHeight+"px;\"></div>");
  });
}


function t794_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  var hash = window.location.hash;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t794__list_item a[href='"+url+"']").addClass("t-active");
  $(".t794__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t794__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t794__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t794__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t794__list_item a[href='/"+pathname+"/']").addClass("t-active");
  if (hash) {
    $(".t794__list_item a[href='"+hash+"']").addClass("t-active");   
  }
}
 
function t802_insta_init(recid,instauser){
    var projectid=$('#allrecords').attr('data-tilda-project-id');
    t802_insta_loadflow(recid,projectid,instauser);
}

function t802_insta_loadflow(recid,projectid,instauser){
    if (instauser == '') {
        var url = "https://insta.tildacdn.com/fish/0.json";
    } else {
        var url = "https://insta.tildacdn.com/json/project"+projectid+"_"+instauser+".json";
    }

    $.ajax({
      type: "GET",
      url: url,
      dataType : "json",
      success: function(data){
            if(typeof data=='object'){
                t802_insta_draw(recid,data);
            }else{
                console.log('error. insta flow json not object');
                console.log(data);
            }
      },
      error: function(){
          console.log('error load instgram flow');
      },
      timeout: 1000*90
    });       
}

function t802_insta_draw(recid,obj){
	if(typeof obj.photos=='undefined'){return;}
	$.each(obj.photos, function(index, item) {
	    t802_insta_drawItem(recid,obj.username,item);
	});		
}

function t802_insta_drawItem(recid,username,item){
    var emptyEl = $("#rec"+recid).find(".t802__imgwrapper_empty").first();
    if (emptyEl.length > 0) {
        emptyEl.removeClass("t802__imgwrapper_empty");
        emptyEl.append('<div class="t802__bgimg" style="background-image:url('+item.url+')"></div>');
        emptyEl.wrap('<a href="'+item.link+'" target="_blank"></a>');
        
        /*add text and filter for hover*/
        var hoverEl = emptyEl.find(".t802__hover-wrapper");
        if (hoverEl.length > 0 && isMobile == false) {
            var text = t802_insta_cropText(recid,'@'+username+': '+item.text);
            hoverEl.append('<div class="t802__hover-filter"></div>');
            hoverEl.append('<div class="t802__text t-text t-descr_xxs">'+text+'</div>');
        }
    }
}

function t802_insta_cropText(recid,text){
    var colsInLine = $("#rec"+recid).find("[data-cols-in-line]").attr("data-cols-in-line");
    if (colsInLine == 6) {
        var maxLength = 90;
    } else {
        var maxLength = 130;    
    }
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        text = text.substring(0, Math.min(maxLength,text.lastIndexOf(" ")));
        text += ' ...';
    }
    return text;
} 
function t807__init(recid) {
  tvote__init(recid);
  var testWrap = $('#rec' + recid);

  $('#rec'+recid).find('.t-vote').bind('tildavote:numberschanged',function(){
    $(".js-vote-item").each(function() {
        var percentage = $(this).find(".t-vote__btn-res__percent");
        if (typeof percentage != "undefined") {
            var bar = $(this).find(".t807__answer-progressbar");
            bar.css("width",percentage.html());
        }
    })
  });

  $('#rec'+recid).find('.t-vote').bind('tildavote:resultsended',function(){
    if (!$(this).hasClass('t-vote_sended') || $(this).hasClass('t807__hidden')) {
      return;
    }
    
    $(this).addClass('t807__hidden');

    if (!$(this).attr('data-vote-visibility') && $(this).hasClass('t807__test')) {
      t807__onSuccess(recid);
    }

  });

  t807__replyClickBtn(recid);
}

function t807__replyClickBtn(test) {
    var testBlock = $('#rec' + test);
    var replyBtn = testBlock.find('.t807__btn_reply');

    replyBtn.on('click', function (e) {
        e.preventDefault();
    });
}


function t807__onSuccess(test) {
  var testBlock = $('#rec' + test).find('.t807__test');
  var t807_targetOffset = testBlock.offset().top;

  if ($(window).width()>960) {
    var t807_target = t807_targetOffset - 200;
  } else {
    var t807_target = t807_targetOffset - 100;
  }

  $('html, body').animate({ scrollTop: t807_target}, 400);
}
 
function t843_init(recid) {
  var rec = $('#rec' + recid);
  var container = rec.find('.t843');

  t843_setHeight(rec);

  $(window).bind('resize', t_throttle(function() {
    if (typeof window.noAdaptive!="undefined" && window.noAdaptive==true && $isMobile){return;}
    t843_setHeight(rec);
  }, 200));

  $('.t843').bind('displayChanged',function(){
    t843_setHeight(rec);
  });

  if (container.hasClass('t843__previewmode')) {
    setInterval(function() {
      t843_setHeight(rec);
    }, 5000);
  }
}

function t843_setHeight(rec) {
  var image = rec.find('.t843__blockimg');
  image.each(function() {
    var width = $(this).attr('data-image-width');
    var height = $(this).attr('data-image-height');
    var ratio = height / width;
    var padding = ratio * 100;
    $(this).css('padding-bottom', padding + '%');
  });

  if ($(window).width() > 960){
    var textwr = rec.find('.t843__textwrapper');
    var deskimg = rec.find('.t843__desktopimg');
    textwr.each(function(i) {
      $(this).css('height', $(deskimg[i]).innerHeight());
    });
  }
}
 
function t849_init(recid) {
  var rec = $('#rec' + recid);
  var toggler = rec.find('.t849__header');

  toggler.click(function() {
    $(this).toggleClass('t849__opened');
    $(this).next().slideToggle();
    if(window.lazy == 'y') {t_lazyload_update();}
  });
}
 
function t858_init(recid) {
  var rec = $('#rec' + recid);
  var container = rec.find('.t858');
  var doResize;

  t858_unifyHeights(rec);

  $(window).resize(function() {
    clearTimeout(doResize);
    doResize = setTimeout(function() {
      t858_unifyHeights(rec);
    }, 200);
  });

  $(window).load(function() {
    t858_unifyHeights(rec);
  });

  $('.t858').bind('displayChanged', function() {
    t858_unifyHeights(rec);
  });

  if (container.hasClass('t858__previewmode')) {
    setInterval(function() {
      t858_unifyHeights(rec);
    }, 5000);
  }
}


function t858_unifyHeights(rec) {
  if ($(window).width() >= 960) {
    rec.find('.t858 .t-container .t858__row').each(function() {
      var highestBox = 0;
      var currow = $(this);
      $('.t858__inner-col', this).each(function() {
        var curCol = $(this);
        var curWrap = curCol.find('.t858__wrap');
        var curColHeight = curWrap.outerHeight();
        if (curColHeight > highestBox) {highestBox = curColHeight;}
      });
      $('.t858__inner-col', this).css('height', highestBox);
    });
  } else {
    $('.t858__inner-col').css('height', 'auto');
  }
}
 
function t875_init(recid) {
    if (document.layers) {document.captureEvents(Event.MOUSEDOWN);}
    document.onmousedown = t875_click;
    document.oncontextmenu = function(event) {
            var event = event || window.event;
            var sender = event.target || event.srcElement;
            if (sender.tagName.match(/INPUT|TEXTAREA/i)) {
                return;
            } else {
                return false;
            }
    };
    t875_preventSelection(document);
    t875_preventUserSelect();
}


function t875_preventUserSelect() {
    $('body').css({'-ms-user-select': 'none', '-moz-user-select': 'none', '-webkit-user-select': 'none', 'user-select': 'none', '-webkit-touch-callout': 'none'});
}

function t875_click(event) {
    t875_returnPrevent(event);

    if (document.all) {
        if (event.button == 2) {
            return false;
        }
    }
    if (document.layers) {
        if (event.which == 3) {
            return false;
        }
    }
}


function t875_preventSelection(element) {
    var preventSelection = false;

    t875_addHandler(element, 'mousemove', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
    });

    t875_addHandler(element, 'mousedown', function(event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });

    t875_addHandler(element, 'mouseup', function() {
        if (preventSelection) {
            t875_removeSelection();
        }
        preventSelection = false;
    });

    t875_addHandler(element, 'keydown', t875_killCtrlA);
    t875_addHandler(element, 'keyup', t875_killCtrlA);
    t875_addHandler(element, 'keydown', t875_killCtrlU);
    t875_addHandler(element, 'keyup', t875_killCtrlU);
    t875_addHandler(element, 'keydown', t875_killAltCmdI);
    t875_addHandler(element, 'keyup', t875_killAltCmdI);
    t875_addHandler(element, 'keydown', t875_killCtrlShiftI);
    t875_addHandler(element, 'keyup', t875_killCtrlShiftI);
}


function t875_addHandler(element, event, handler) {
    if (element.attachEvent) {
        element.attachEvent('on' + event, handler);
    } else {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        }
    }
}


function t875_removeSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection && document.selection.clear) {
        document.selection.clear();
    }
}


function t875_killCtrlU(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'U'.charCodeAt(0)) || (event.altKey && event.metaKey && (key == 'U'.charCodeAt(0) || key == 'u'.charCodeAt(0)))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killAltCmdI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.altKey && event.metaKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlShiftI(event) {
    t875_returnPrevent(event);

    var key = event.keyCode || event.which;
    if (event.shiftKey && event.ctrlKey && (key == 'I'.charCodeAt(0) || key == 'i'.charCodeAt(0))) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_killCtrlA(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA|BUTTON/i)) {return;}

    var key = event.keyCode || event.which;
    if ((event.ctrlKey && key == 'A'.charCodeAt(0)) || (event.metaKey && key == 'A'.charCodeAt(0))) {
        t875_removeSelection();
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
}


function t875_returnPrevent(event) {
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    if (sender.tagName.match(/INPUT|TEXTAREA/i)) {return;}
}