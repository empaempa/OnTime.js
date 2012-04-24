OnTime.Timeline = (function() {

	"use strict";

	var timelines = [];

	function OnTimeTimeline( priority, length, name ) {
		this.name     = name     || "Timeline" + ( priority !== undefined ? priority : timelines.length );
		this.priority = priority || 0;
		this.length   = length   || 10;
		this.modules  = [];
		
		if( timelines[ this.priority ] === undefined ) {
			timelines[ this.priority ] = this;
		} else {
			timelines.splice( this.priority, 1, this );
		}
	}

	OnTimeTimeline.prototype.dispose = function() {
		var i = timelines.indexOf( this );
		if( i !== -1 ) {
			timelines.slice( i, 1 );
		}
	}

	OnTimeTimeline.prototype.addModule = function( module ) {
		this.modules.push( module );
	}

	OnTimeTimeline.prototype.removeModule = function( module ) {

	}


	OnTimeTimeline.prototype.updateAll = function( deltaTime, globalTime ) {
		var t = timelines.length; 
		while( t-- ) {
			timelines[ t ].update( deltaTime, globalTime );
		}
	}

	OnTimeTimeline.prototype.update = function( deltaTime, globalTime ) {
		var lastTime = globalTime - deltaTime;
		var localTime;
		var module, m = this.modules.length;
		
		while( m-- ) {
			module = this.modules[ m ];
			if( globalTime > module.startTime && module.endTime >= globalTime ) {
				localTime = globalTime - module.startTime;
				if( lastTime <= module.startTime ) {
					module.start( deltaTime, localTime, globalTime );
				}
				module.tweenProperties( deltaTime, localTime, globalTime );
				module.update( deltaTime, localTime, globalTime );
			}
		}
	}

	return OnTimeTimeline;
})();