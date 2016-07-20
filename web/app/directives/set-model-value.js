(function () {
    angular.module('candidatePortal.application').directive('setModelValue', [
		'candidatePortal.services.apiMethods',
		function(apiMethods) {
			return {
				restrict : 'A',
				scope : {
					ngModel : '=',
					setModelValue : '=',
					listModel : '=',
					apiUrl : '=',
					dtoType : '@'
				},
				link: function(scope, element, attrs, ngModel) {
					//console.log(scope.ngModel);
					var assignValue = function (arr, modelVal) {
						if(arr != null && modelVal != null) {
							var index = -1;
							arr.forEach(function (item, i, array) {
								if(angular.equals(item, modelVal)){
									index = i;
								}
							});
							if(index != -1)
								scope.ngModel = scope.setModelValue[index];

							//console.log(scope.ngModel);
						}
					};

					scope.$watch("setModelValue", function (newVal, oldVal) {
						if(newVal != null)
							assignValue(newVal, scope.ngModel);
					});
					scope.$watch("ngModel", function (newVal, oldVal) {
						if(newVal != null)
							assignValue(scope.setModelValue, newVal);
					});

					var getSuggestionsList = function () {
						var url = scope.apiUrl;
						apiMethods.apiGETReq(url, null, false).then(function (response) {
							//if(scope.dtoType == "user") {
							//	scope.listModel = masterModels.digestUserMastersApiObj(response.data.response);
							//	scope.setModelValue = scope.listModel;
							//	assignValue(scope.listModel, scope.ngModel);
							//}
							//else
								scope.listModel = response.data.response;
						}, function (response) {
							console.log("Unable to fetch list");
						});
					};

					if((!scope.listModel) && scope.apiUrl != null){
						getSuggestionsList();
					}
				}
			}
		}
	]);
})();