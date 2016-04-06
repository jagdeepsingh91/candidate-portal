/**
 *  String to number conversion directive
 *  @author Jagdeep
 *
 *  How to use
 *  load this directive and write in html
 *  Example :
 *
 *      <input type="number" ng-model="modelName" string-to-number required/>
 *
 *		When field type is number and the value which we want to display is in string then then we have to convert that
 *	Value in number in order to display in field. Otherwise it won't display.
 */
(function () {
    angular.module('candidatePortal.application').directive('stringToNumber', function() {
		return {
			restrict : 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				ngModel.$parsers.push(function(value) {
					return '' + value;
				});
				ngModel.$formatters.push(function(value) {
					return parseFloat(value, 10);
				});
			}
		}
	});
})();