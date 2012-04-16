OnTime.Layer = (function() {

	"use strict";

	var layers = [];

	function OnTimeLayer( withName ) {
		layers.push( this );
	}

	OnTimeLayer.prototype.dispose = function() {
		var i = layers.indexOf( this );
		if( i !== -1 ) {
			layers.slice( i, 1 );
		}
	}


	OnTimeLayer.prototype.addDataSet = function( dataSet ) {
		dataSets.push( dataSet );
	}

	OnTimeLayer.prototype.removeDataSet = function( dataSet ) {
		// todo
	}


	OnTimeLayer.prototype.addModule = function( module ) {
		modules.push( module );
	}

	OnTimeLayer.prototype.removeModule = function( module ) {
		// todo
	}


	OnTimeLayer.prototype.updateAll = function( delta, current ) {
		var l = layers.length; 
		while( l-- ) {
			layers[ i ].update( delta, current );
		}
	}

	OnTimeLayer.prototype.update = function( delta, current ) {
		for( )
	}


	return OnTimeLayer;

})();