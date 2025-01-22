jQuery(document).ready(function($) {

	if( $(window).width() > 767 ) $('#video-bg').YTPlayer();


	$('.h-logo').click(function(){
		$('body,html').animate({'scrollTop': 0},500);
	});


	$('#menu a').click(function(e){
		e.preventDefault();

		var href = $(this).attr('href');
		var section_pos = $(href).offset().top;
		var header_height = $('header').outerHeight();

		$('html,body').animate({'scrollTop': section_pos - header_height + 2},500);
	});


	// РђРІС‚РѕРІС‹РґРµР»РµРЅРёРµ РїСѓРЅРєС‚РѕРІ РјРµРЅСЋ РїСЂРё СЃРєСЂРѕР»Р»Рµ;
	var menu = $('#menu li'),
	menuItems = menu.find('a'),
	lastHref;

	var scrollItems = menuItems.map(function(){
		var item = $(this).attr('href');
		if (item.length && item != '/') return item;
	});

	function autoSelectMenu() {
		var cur = scrollItems.map(function(){

			var id = this.toString();
			var window_top = $(window).scrollTop() + $(window).innerHeight();
			if ($(id).length && $(id).offset().top < window_top) return this;
		});


		cur = cur[cur.length - 1];
		var href = cur && cur.length ? cur : '';

		if (lastHref !== href) {
			lastHref = href;
			$('#menu a').removeClass('active');
			$('#menu a[href="' + href + '"]').addClass('active');
		}
	}
	autoSelectMenu();

	
	$('#s2 .companies').owlCarousel({
		loop: true,
		nav: false,
		autoplay: true,
		navText: '',
		responsive : {
	    1170 : {
	    	items: 5,
				margin: 70,
	    },
	    959 : {
	    	items: 5,
	    	margin: 50,
	    },
	    768 : {
				items: 5,
				margin: 35,
	    },
	    320 : {
				items: 2,
				margin: 25,
	    },
	  }
	});


	$('#s3 .s3-tabs li').click(function(){
		if(! $(this).hasClass('is-active') ) {
			var number = $(this).index();
			$(this).addClass('is-active').siblings('li').removeClass('is-active');
			$('#s3 .content__item').eq(number).fadeIn(400).siblings('.content__item').hide();
		}
	});

	$('#s3 .mobile-header').click(function(){
		var that = $(this);

		that.next('.content__item').slideToggle(400).siblings('.content__item').slideUp(400);

		setTimeout(function(){
			if( that.next('.content__item').is(':visible') ) {
				$('body,html').animate({'scrollTop': that.offset().top}, 400);
			}
		},420);
	});


	$('#s3 .content__item h3').click(function(){
		var that = $(this);
		that.next('.inner-block').slideToggle(300);
		that.parent('li').siblings('li').find('.inner-block').slideUp(300);

		setTimeout(function(){
			if( that.next('.inner-block').is(':visible') ) {
				$('body,html').animate({'scrollTop': that.offset().top - 130}, 200);
			}
		},350);
	});


	$(window).resize(function() {
		$('#s3 .content__item').hide();
		$('#s3 .content__item.first-opened').show();
		$('#s3 .s3-tabs li').eq(0).addClass('is-active').siblings('li').removeClass('is-active');
	});


	var s6_parallax = function(){
		var scroll = $(this).scrollTop();
		var w_height = $(this).height();
		var s6_top = $('#s6').offset().top;
		var s6_bottom = s6_top + $('#s6').outerHeight();
		var scrollImg = (scroll + w_height) - (s6_bottom) + ($(window).width());

		if( ((scroll+w_height) > s6_top) && (scroll < s6_bottom) ) {
			$('#s6').css('background-position', 'center ' + (-scrollImg / 8) + 'px' );
		}
	};


	$('#s7-2 .switcher .tab').click(function(){

		$(this).addClass('is-active').siblings('.tab').removeClass('is-active');
		if( $(this).hasClass('tab2') ) {
			$('#s7-2 .switcher .car').addClass('to-right');
			$('#s7-2 .steps-list .step').addClass('is-active');
		} else {
			$('#s7-2 .switcher .car').removeClass('to-right');
			$('#s7-2 .steps-list .step').removeClass('is-active');
		}
	});


	setTimeout(function(){
		if( $('.s8-reviews .owl-dot').length < 2 ) {
				$('.s8-reviews .owl-dot').hide();
				$('.s8-reviews .owl-next').hide();
				$('.s8-reviews .owl-prev').hide();
		}
	},200);


	$('.s8-reviews').owlCarousel({
		// loop: true,
		nav: true,
		autoplay: false,
		navText: '',
		margin: 0,
		responsive : {
	    1170 : {
	    	items: 3,
	    	slideBy: 3,
	    },
	    960 : {
	    	items: 3,
	    	slideBy: 3,
	    },
	    768 : {
				items: 2,
				slideBy: 2,
	    },
	    320 : {
				items: 1,
				slideBy: 1,
	    },
	  }
	});


	var initMap = function(){
		var centerPos = [55.802341, 37.525151];
		
		if( $(window).width() < 960 ) {
			centerPos = [55.801341, 37.529151];
		}

		ymaps.ready(function () {

			var myMap = new ymaps.Map('map', {
				center: centerPos,
				zoom: 17,
				controls: ["zoomControl"]
			}, {
				searchControlProvider: 'yandex#search'
			}),
			myPlacemark = new ymaps.Placemark([55.802341, 37.529651], {
				hintContent: 'РњРђР”Р',
				balloonContent: 'Рі. РњРѕСЃРєРІР°, Р›РµРЅРёРЅРіСЂР°РґСЃРєРёР№ РїСЂРѕСЃРїРµРєС‚, 64'
			}, {
				iconLayout: 'default#image',
				iconImageHref: '/img/s9-marker.png',
				iconImageSize: [95, 86],
				iconImageOffset: [-95, -86]
			});

			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable('scrollZoom');
		});
	};


	var modal_close = function(){
		$('.modal').removeClass('is-open').fadeOut();
		$('#callback #modal-description').hide().find('textarea').val('');
	};

	var modal_open = function(modal, to_top){
		to_top = to_top || false;
		$(modal).fadeIn().addClass('is-open');
		if(to_top) {
			$('body,html').animate({'scrollTop': 0}, 200);
		}
	};


	$('.btn-callback').click(function(e){
		e.preventDefault();
		var title = $(this).attr('data-title');
		var subhead = $(this).attr('data-subhead');
		var description = $(this).attr('data-description');
		modal_open('#callback');
		if(title) $('#callback h2').text(title);
		if(subhead) $('#callback .subhead').text(subhead);
		if(description) {
			$('#callback #modal-description').show();
		}
	});


	$('.btn-pdf1').click(function(){
		modal_open('#pdf1', true);
	});

	$('.btn-pdf2').click(function(){
		modal_open('#pdf2', true);
	});


	$('.s4-open-video').click(function(){
		modal_open('#video');
		$('#video iframe').attr('src', $(this).attr('data-src'));
	});

	$('#video .close').click(function(){
		$('#video iframe').attr('src', '');
	});


	$('.modal .close').click(function(){
		modal_close();
	});

	$('#pdf1 .close, #pdf2 .close').click(function(){
		var scroll_to = $('#s3').offset().top;
		$('body,html').animate({'scrollTop': scroll_to},200);
	});


	$('.modal input').focus(function(){
		$(this).removeClass('error').parent('.field').addClass('is-focus');
	});


	$('.modal input[type="text"]').focusout(function () {
		if($(this).val() == '') {
			$(this).parent('.field').removeClass('is-focus');
		}
	});


	$('.modal-form input[type="text"]').val('');


	$('.modal-form').submit(function(e){
		e.preventDefault();

		var form = $(this).find('form');
		var error = false;
		form.find('input[type="text"]').removeClass('error');

		form.find('input[type="text"]').each(function(i, el){
			if( $(el).val() == '' ) {
				error = true;
				$(el).addClass('error');
			}
		});

		if(!error) {
			var email_to = $('header .email').text();
			var head = form.parents('.modal-form').find('h2').text();
			var data = form.serialize() + '&email_to=' + email_to + '&head=' + head;

			$.post('mail.php', data, function(data) {
				if(data == 'ok') {
					modal_close();
					modal_open('#response');
				}
			});
		}
	});


	$(window).scroll(function(){

		s6_parallax();
		autoSelectMenu();

	});


	initMap();


});