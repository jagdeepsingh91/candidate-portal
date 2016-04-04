/*
**  Simple file upload
**/
(function () {
    angular.module('candidatePortal.application').directive('simpleFileUpload', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.ngModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files);
                    });
                });
            }
        };
    }]);
})();