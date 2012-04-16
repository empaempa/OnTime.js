OnTime.Block = (function() {

	"use strict";

	var blocks = [];

	function OnTimeBlock() {
		blocks.push( this );
	
		this.startTime  = 0.0;
		this.endTime    = 0.0;
		this.properties = {};
	}

	OnTimeBlock.prototype.dispose = function() {
		var i = blocks.indexOf( this );
		if( i !== -1 ) {
			blocks.slice( i, 1 );
		}
	}

	OnTimeBlock.prototype.update = function( delta, current ) {
		if( current < this.startTime || current > this.endTime ) {
			return this;
		}

		return this;
	}

	OnTimeBlock.prototype.addProperty = function( withName, andType, withInitialValue ) {
		if( this.properties[ name ] === undefined ) {
			this.properties[ name ] = new OnTimeProperty( withName, andType );
			this.properties[ name ].addKeyFrame( withInitialValue, 0.0 );
		} else {
			OnTime.error( "Block.addProperty: Property " + withName + " already defined. Quitting." );
		}

		return this;
	}

	OnTimeBlock.prototype.addKeyFrame = function( forProperty, withValue, atTime ) {
		if( this.properties[ forProperty ] !== undefined ) {
			this.properties[ forProperty ].addKeyFrame( withValue, atTime );
		} else {
			OnTime.error( "Block.addKeyFrame: No property called " + forProperty + ". Quitting." );
		}
		return this;
	}

	// internal objects

	function OnTimeKeyFrame( value, time ) {
		this.value = value;
		this.time  = time;
	}

	function OnTimeProperty( name, type ) {
		this.name = name;
		this.type = type; 
		this.keyFrames = [];
	}

	OnTimeProperty.prototype.addKeyFrame = function( value, time ) {
		this.keyFrames.push( new OnTimeKeyFrame( value, time ));
	}

	OnTimeProperty.prototype.removeKeyFrame = function( theKeyFrame ) {
		var i = this.keyFrames.indexOf( theKeyFrame );
		if( i !== -1 ) {
			this.keyFrames.slice( i, 1 );
		}
	}

	// static

	OnTimeBlock.NUMBER = "number";
	OnTimeBlock.STRING = "string";
	OnTimeBlock.ARRAY  = "array";
	
	OnTimeBlock.updateAll = function( delta, current ) {
		var b = blocks.length;
		while( b-- ) {
			blocks[ b ].update( delta, current );
		}
	}	

	return OnTimeBlock;
})