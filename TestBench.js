/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}


var TestBench = (function() {

	"use strict"

	var time = 0;
	var delta = 0.01;
	var testbench = {};

	testbench.init = function() {

		OnTime.createFromJSON( {
			timelines: [
				{
					priority: 0,
					length: 10.0,
					modules: [
						{
							name: "ModuleBackgroundColor",
							startTime: 0.0,
							endTime: 10.0,
							keyframes: [
								{
									time: 0.0,
									properties: {
										"color": [ 0, 0, 0 ]
									}
								},
								{
									time: 5.0,
									properties: {
										"color": [ 255, 0, 0 ]
									}
								},
								{
									time: 10.0,
									properties: {
										"color": [ 0, 255, 0 ]
									}
								}
							]
						}
					]
				}
			]
		} );

		requestAnimationFrame( testbench.render );
	}

	testbench.render = function() {
		requestAnimationFrame( testbench.render );
		time += delta;
		OnTime.update( time );
	}

	return testbench;

})();






