OnTime.Module = (function() {

	var modules = [];

	function OnTimeModule( name ) {
		this.name      = name;
		this.startTime = 0.0;
		this.endTime   = 0.0;

		modules.push( this );
	}

	OnTimeModule.prototype.dispose = function() {

	}

	OnTimeModule.prototype.getRequiredDataSet = function() {
		return {
			"someNumber": 1.0
		}
	}

	OnTimeModule.prototype.start = function( dataSet ) {

	}

	OnTimeModule.prototype.update = function( dataSet ) {

	}

	OnTimeModule.prototype.stop = function( dataSet ) {

	}

} );