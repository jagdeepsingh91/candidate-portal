(function () {
    'use strict';
    angular.module('candidatePortal.application').directive('datetimepicker', function () {
        return {
            //require: '?ngModel',
            restrict: 'EA',
            //scope: {
            //    sdate: '=?', // '0' for today
            //    edate: '=?' // '0' for today
            //},
            link: function (scope, element, attrs, ngModel) {
                var options = {
                    format: 'dd-mm-yyyy',
                    autoclose: true
                };

                //if (scope.sdate === 0) {
                //    var nowDate = new Date();
                //    var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
                //    options.startDate = today;
                //}
                //
                //if (scope.edate === 0) {
                //    var nowDate = new Date();
                //    var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
                //    options.endDate = today;
                //}

                element.datepicker(options);
                element.datepicker('place');
            }
        };
    });
})();