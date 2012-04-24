OnTime.Module = (function() {

	var modules = [];

	// Constructor
	// Each Module on the timeline is created before
	// the time starts running. 

	function OnTimeModule() {
		this.name = "OnTime.Module";
	};

	// init 
	// This function is called at the very beginning of the 
	// playback and is the place for allocation and whatnot. If you
	// extend this module, please remember to call this function at
	// the very top of your own init

	OnTimeModule.prototype.init = function( startTime, endTime ) {
		this.startTime = startTime ||  0.0;
		this.endTime   = endTime   || 10.0;
		this.keyframes = [];

		this.guessPropertyTypes();

		modules.push( this );
	}

	// properties and propertyTypes
	// the properties (and their types) to be sent to .start .update .stop

	OnTimeModule.prototype.properties = {
		"someFloat": 1.0
	};

	OnTimeModule.prototype.propertyTypes = {
		"someFloat": OnTime.FLOAT
	};

	OnTimeModule.prototype.tweenProperties = function( deltaTime, localTime, globalTime ) {
	};

	// addKeyframe
	// adds a keyframe

	OnTimeModule.prototype.addKeyframe = function( localTime, properties ) {
		var keyframe;
		if( this.validateProperties( properties )) {
			keyframe = new OnTime.Keyframe( localTime, properties );
			keyframe.setOnChangeCallback( this.keyframeUpdated, this );

			this.keyframes.push( keyframe );
			this.keyframes.sort( this.sortKeyframesOnTime );
		}
	};

	OnTimeModule.prototype.keyframeUpdated = function( keyframe ) {
		this.keyframes.sort( this.sortKeyframesOnTime );
	};


	// start
	// This function is called before first update and could
	// be used to reset your data

	OnTimeModule.prototype.start = function( deltaTime, localTime, globalTime ) {
	};

	// update
	// This function is called every frame for as long as
	// the module is active

	OnTimeModule.prototype.update = function( deltaTime, localTime, globalTime ) {
	};

	// stop
	// This function is called after the last update 
	// has been called and could be used to clear up things you've
	// changed in the update

	OnTimeModule.prototype.stop = function( deltaTime, localTime, globalTime ) {
	};

	// guessPropertyTypes
	// guesses property types for missing types. Note that an 
	// array with length 3 is taken for a color and not a vector3
	// Floats and bools are not 

	OnTimeModule.prototype.guessPropertyTypes = function() {
		var type, property, p;
		for( p in this.properties ) {
			if( this.propertyTypes[ p ] === undefined ) {
				property = this.properties[ p ];
				type     = typeof( property );

				if( type === "number" ) {
					this.propertyTypes[ p ] = OnTime.FLOAT;
				} else if( type === "object" && Object.prototype.toString.call( property ) === "[object Array]" ) {
					if( property.length === 2 ) {
						this.propertyTypes[ p ] = OnTime.VECTOR2;
					} else if( property.length === 3 ) {
						this.propertyTypes[ p ] = OnTime.COLOR;
					} else if( property.length === 4 ) {
						this.propertyTypes[ p ] = OnTime.VECTOR4;
					}
				} else if( type === "boolean" ) {
					this.propertyTypes[ p ] = OnTime.BOOL;
				} else if( type === "string" ) {
					this.propertyTypes[ p ] = OnTime.STRING;
				}
			}
		}
	};

	// validateProperties

	OnTimeModule.prototype.validateProperties = function( properties ) {
		var p;
		for( p in properties ) {
			if( this.properties[ p ] === undefined ) {
				OnTime.error( "OnTime.Module.validateProperties: " + p + " is not a property of module " + this.name );
				return false;
			}
		}
		return true;
	};

	// sortKeyframesOnTime 

	OnTimeModule.prototype.sortKeyframesOnTime = function( a, b ) {
		     if( a.localTime > b.localTime ) return 1;
		else if( a.localTime < b.localTime ) return -1;
		else {
			OnTime.warn( "OnTime.Module.sortKeyframesOnTime: keyframes are on same time in module " + this.name );
			return 0;
		}
	};

	return OnTimeModule;
})();