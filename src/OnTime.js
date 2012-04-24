var OnTime = (function() {

	"use strict";

	var deltaTime = 0;
	var oldTime = 0;

	var onTime = {}

	// types

	onTime.FLOAT   = 0;
	onTime.BOOL    = 1;
	onTime.INT     = 2;
	onTime.STRING  = 3;
	onTime.COLOR   = 4;
	onTime.VECTOR2 = 5;
	onTime.VECTOR3 = 6;

	// logging

	onTime.LOG      = 1;
	onTime.WARN     = 2;
	onTime.WARNING  = 2;
	onTime.WARNINGS = 2;
	onTime.ERROR    = 4;
	onTime.ERRORS   = 4;

	var logLevel = onTime.LOG | onTime.WARN | onTime.ERROR;

	onTime.setLogLevel = function( to ) {
		logLevel = to;
		return this;
	}

	onTime.log = function( theMessage ) {
		if( logLevel & onTime.LOG ) {
			console.log( theMessage );
		}
	}

	onTime.warn = function( theWarning ) {
		if( logLevel & onTime.WARN ) {
			console.warn( theWarning );
		}
	}

	onTime.error = function( theError ) {
		if( this.logLevel & onTime.ERROR ) {
			console.log( theError );
		}
	}

	// register module

	onTime.modules = {};

	onTime.registerModule = function( module ) {
		if( onTime.modules[ module.name ] === undefined ) {
			onTime.modules[ module.name ] = module;
		} else {
			onTime.error( "OnTime.registerModule: Module with name " + module.name + " already registered, please change the name or avoid registering a module twice." );
		}
	}

	onTime.createModule = function( moduleName, startTime, endTime ) {
		if( onTime.modules[ moduleName ] ) {
			var module = new onTime.modules[ moduleName ];
			if( startTime !== undefined && endTime ) {
				module.init( startTime, endTime );
			}
			return module;
		} else {
			onTime.error( "OnTime.createModule: No module of name " + module.name + " registered, please include it before trying to create it" );
		}
	}

	// JSON stuff

	onTime.loadFromJSON = function( urlOrID ) {
		// todo: load from URL or localstorage
	}

	onTime.saveAsJSON = function( urlOrID ) {
		// todo: post JSON to url or localstorage
	}

	onTime.createFromJSON = function( json ) {
		var t, tl, m, ml, k, kl;
		var timelinesConf, timelineConf, timeline;
		var modulesConf, moduleConf, module;
		var keyframesConf, keyframeConf;

		timelinesConf = json.timelines;

		for( t = 0, tl = timelinesConf.length; t < tl; t++ ) {
			timelineConf = timelinesConf[ t ];
			modulesConf  = timelineConf.modules;
			
			timeline = new OnTime.Timeline( timelineConf.priority, timelineConf.length, timelineConf.name );

			for( m = 0, ml = modulesConf.length; m < ml; m++ ) {
				moduleConf    = modulesConf[ m ];
				keyframesConf = moduleConf.keyframes;

				module = OnTime.createModule( moduleConf.name, moduleConf.startTime, moduleConf.endTime );
				timeline.addModule( module );

				for( k = 0, kl = keyframesConf.length; k < kl; k++ ) {
					keyframeConf = keyframesConf[ k ];

					module.addKeyframe( keyframeConf.time, keyframeConf.properties );
				}
			}
		}
	} 

	// update

	onTime.reset = function() {
		oldTime = 0;
		// call all module init or maybe a module.reset?
	}

	onTime.update = function( currentTime ) {
		deltaTime = currentTime - oldTime;
		oldTime   = currentTime;
		OnTime.Timeline.prototype.updateAll( deltaTime, currentTime );
	}

	onTime.setTime = function( currentTime ) {
		oldTime = currentTime;
		onTime.update( currentTime );
	}

	return onTime;
})();


















