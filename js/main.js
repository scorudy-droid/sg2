// Iniciador de funciones JavaScript
fcisite = {
	init : function() {
		fcisite.config = {
			"lang" : $('html').attr('lang'),
			"$site-principal-nav" : $('#site-principal-nav'),
			"$site-secondary-nav" : $('#site-secondary-nav'),
			"$site-chat" : null,
			"$site-banner": $("#site-banner"),
			"$close-banner" : $("#close-banner"),
			"sTituloPagina" : $('#titulo-pagina').text()
		};
		if (!Modernizr.websockets || !Modernizr.svg || !Modernizr.csstransitions) {
			$("<div />", {
				"class": 'ui-state-highlight browsehappy',
				"html" : fcisite.config.lang == 'es'?'<p><span class="ui-icon ui-icon-info"></span>Está usando un navegador <em>Desactualizado!</em>. Por favor <a href="http://browsehappy.com/" title="Actualice su navegador a la última versión o Instale uno nuevo totalmente Gratis!">Actualice su Navegador!</a> para mejorar su experiencia.</p>'	:'<p><span class="ui-icon ui-icon-info"></span>You are using an <em>Outdated</em> browser. Please <a href="http://browsehappy.com/" title="Actualice su Navegador a la última versión o Instale uno nuevo totalmente Gratis!">Upgrade your Browser!</a> to improve your experience.</p>'	
			}).prependTo("body");
		}
		
		//$(".noticia").find("figcaption").hide();
		if (window.innerWidth >= 1024) {
			$(".noticia").on("mouseenter", ".foto", function(){$(this).stop(true);$(this).find("figcaption").fadeIn("fast");})
					  .on("mouseleave", ".foto", function(){$(this).stop(true);$(this).find("figcaption").fadeOut("fast");});
		    //$('#lognoticias').portamento({wrapper: $('#retrieved')});
		}
		fcisite.config["$site-chat"] = $("#chat").chatAntaKu({bAutomatic: true});
		if (Modernizr.localstorage) {
			if (!localStorage.getItem('banner')) {
				localStorage.setItem('banner', 'open');
			}
		}
		fcisite.setup();
	},
	setup : function() {
		// para el estado del banner
		if (Modernizr.localstorage) {
			if (localStorage.getItem('banner') == 'closed') {
				fcisite.config["$site-banner"].removeClass('abierto').addClass('cerrado').slideUp('fast');
				fcisite.config["$close-banner"].find('span').removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-s');
	
			} 
		}
		$('#slides').slidesjs({
			width: 633,
			height: 291,
			play: {
				active: true,
				auto: true,
				interval: 4000,
				swap: true
			}
		});
		$('#menu-mobile').on('click', fcisite.mostrarOcultarMenu);
		$('#muestra-chat').on('click', fcisite.mostrarChat);
		$('.readmore').find('a').button();
		/*$("#razones").accordion();*/
		fcisite.config["$close-banner"].on('click', fcisite.cerrarBanner);
		$('#site-secondary-nav').find('a').on('click', fcisite.cargarSeccion);
//		fcisite.cargarMenuSecundario();
	},
	mostrarOcultarMenu : function(event) {
		var $this = $(this);
		var $menu = fcisite.config["$site-principal-nav"];
		if ($this.hasClass('open')) {
			$this.removeClass('open');
			$menu.hide();
		} else {
			$this.addClass('open');
			$menu.show();
		}
	},
	mostrarChat : function(event) {
		$chat = fcisite.config["$site-chat"];
		$chat.chatAntaKu('mostrarChat');
	},
	cerrarBanner : function(event) {
		var $this = $(this);
		var $icon = $this.find('span');
		var $banner = fcisite.config["$site-banner"];
		
		if ($banner.hasClass('abierto')) {
			if (Modernizr.localstorage) {
				localStorage.setItem('banner', 'closed');
			}
			$banner.removeClass('abierto').addClass('cerrado').slideUp('fast');
		} else {
			if (Modernizr.localstorage) {
				localStorage.setItem('banner', 'open');
			}
			$banner.removeClass('cerrado').addClass('abierto').slideDown('fast');
		}
		
		if ($icon.hasClass('ui-icon-triangle-1-s')) {
			$icon.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-n');
		} else {
			$icon.removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-s');
		}
	},
	cargarSeccion: function(event) {
		var $this = $(this);
		var $item = $this.parent();
		var $sib = $item.siblings();
		if(!$item.hasClass('selected')){
			$item.addClass('selected');
			$sib.removeClass('selected');
			var sHref = $this.attr('href');
			var sHref = sHref.split('#')[0];
			var aQS = sHref.split('=');
			sFile = aQS[1] + ".php";
			var sUrl = "includes/" + sFile;
			$('#retrieved').empty();
			$('#loader').removeClass('hidden').hide().fadeIn('fast');
			$.get(sUrl, {}, function(sHtml) {
				$('#loader').addClass('hidden');
				$('#retrieved').html(sHtml);
			});
			
		}
		return false;
	},
	setChat: function() {
		fcisite.config['$site-chat'].chatAntaKu('option', 'MSG_TYPE', 1);
	}
//	cargarMenuSecundario: function() {
//		var idBuscado = fcisite.config["sTituloPagina"];
//		var $menuSecundario = fcisite.config["$site-secondary-nav"];
//		var $items = $("#"+idBuscado).clone().appendTo($menuSecundario);
//	}
}

$(fcisite.init);
