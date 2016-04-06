(function () {
    angular.module('candidatePortal.application').filter('filterPositionFields', [
		"$filter",
		function($filter) {
			return function(input, items){
				if(!input)
					return input;
				return input.filter(function (obj) {
					if(items.indexOf(obj.fieldId) != -1)
						return false;
					else
						return true;
				});
			}
		}
	]);
})();