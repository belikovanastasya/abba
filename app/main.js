/*IMPORTS*/
import $ from 'jquery';
import viewportChecker from 'jquery-viewport-checker';
import Barba from 'barba.js';
import {TimelineMax} from 'gsap';
import './js/libs/slick.min.js';
import './sass/main.sass';
/*IMPORTS*/


let tl = new TimelineMax();
let lastClicked;

//BARBA STANDART TRANSITION
Barba.Dispatcher.on('linkClicked', function(el) {lastClicked = el;});
let ExpandTransition = Barba.BaseTransition.extend({
	start: function() {
		Promise.all([this.newContainerLoading, this.zoom()]).then(this.showNewPage.bind(this));
	},
	zoom: function() {
		let deferred = Barba.Utils.deferred();
		let tm = new TimelineMax({onComplete: function(){deferred.resolve();}
		});   
		tl.to($(this.oldContainer),1,{opacity: 0,onComplete: function(){$('body,html').animate({scrollTop: 0}, 0)}});   
		return deferred.promise;
	},
	showNewPage: function() {
		let $el = $(this.newContainer);
		$(this.oldContainer).hide(0);
		$el.css({visibility : 'visible',});
		this.done();
	}
});
Barba.Pjax.getTransition = function() {
	let transitionObj = ExpandTransition;
	return transitionObj;
};
//BARBA STANDART TRANSITION

Barba.Prefetch.init();
Barba.Pjax.start();

//BARBA PAGE INIT
let Homepage = Barba.BaseView.extend({
	namespace: 'main',
	onEnter: function() {},
	onEnterCompleted: function() {},
	onLeave: function() {},
	onLeaveCompleted: function() {}
});
Homepage.init();
//BARBA PAGE INIT








