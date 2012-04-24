OnTime.registerModule((function() {

	function ModuleBackgroundColor() {
		OnTime.Module.call( this );
		this.name = "ModuleBackgroundColor";
	}

	ModuleBackgroundColor.prototype             = new OnTime.Module();
	ModuleBackgroundColor.prototype.constructor = ModuleBackgroundColor;

	ModuleBackgroundColor.prototype.properties = {
		"color": [ 255, 0, 255 ]
	};

	ModuleBackgroundColor.prototype.propertyTypes = {
		"color": OnTime.COLOR
	};

	ModuleBackgroundColor.prototype.start = function() {
		document.bgColor = "#" + ((( this.properties.color[ 0 ] << 16 ) || ( this.properties.color[ 1 ] << 8 ) || this.properties.color[ 2 ] ).toString( 16 ));
	};

	ModuleBackgroundColor.prototype.update = function( properties, deltaTime, localTime, globalTime ) {
		document.bgColor = "#" + ( "" + ( properties.color[ 0 ] << 16 ) || ( properties.color[ 1 ] << 8 ) || properties.color[ 0 ] ).toString( 16 );
	};

	return ModuleBackgroundColor;

})());