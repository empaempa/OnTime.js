OnTime.Keyframe = (function() {

	"use strict"

	function OnTimeKeyframe( localTime, properties ) {
		this.localTime     = localTime;
		this.properties    = properties;
		this.propertyNames = [];

		for( var property in properties ) {
			this.propertyNames.push( property );
		}
	}

	OnTimeKeyframe.prototype.tween = function( previousKey, localTime ) {

	}


	OnTimeKeyframe.prototype.setLocalTime = function( localTime ) {
		this.localTime = localTime;

		if( this.onChangeCallback ) {
			this.onChangeCallback.call( this.onChangeCallbackContext || this, this );
		}

		return this;
	}


	OnTimeKeyframe.prototype.setOnChangeCallback = function( callback, context ) {
		this.onChangeCallback        = callback;
		this.onChangeCallbackContext = context;

		return this;
	}
 
 	return OnTimeKeyframe;
})();