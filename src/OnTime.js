var OnTime = (function() {

	"use strict";

	var logLevel;

	function onTime() {
		logLevel = onTime.LOG | onTime.WARNINGS | onTime.ERRORS;
	}

	onTime.prototype.setLogLevel = function( to ) {
		logLevel = to;
		return this;
	}

	onTime.prototype.log = function( theMessage ) {
		if( logLevel & onTime.LOG ) {
			console.log( theMessage );
		}
	}

	onTime.prototype.warn = function( theWarning ) {
		if( logLevel & onTime.WARNINGS ) {
			console.warn( theWarning );
		}
	}

	onTime.prototype.error = function( theError ) {
		if( this.logLevel & onTime.ERROR ) {
			console.log( theError );
		}
	}

	// create single instance

	onTime.LOG      = 1;
	onTime.WARN     = 2;
	onTime.WARNING  = 2;
	onTime.WARNINGS = 2;
	onTime.ERROR    = 4;
	onTime.ERRORS   = 4;

	return new onTime();

})();