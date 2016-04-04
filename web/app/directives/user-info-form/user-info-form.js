(function () {
    angular.module('candidatePortal.application').directive('userInfoForm',[
        'candidatePortal.models.applicantModel',
        function (applicantModel) {
            return {
                restrict: 'AE',
                scope: {
                    isFormValid : '=',
                    userDetailObj : '=?',
                    onSubmitCallback : '=?',
                    locationsList : '=?',
                    skillsList : '=?',
                    branchList : '=?',
                    degreeList : '=?'
                },
                templateUrl : "app/directives/user-info-form/user-form.tpl.html",
                link: function(scope, element, attrs) {
                    console.log(scope.userDetailObj);
                    console.log(scope.locationsList);
                    if(!scope.userDetailObj){
                        scope.userDetailObj = applicantModel.digestApplicantApiObj({});
                    }
                    scope.yearsList = [];
                    var currentYear = new Date().getFullYear();
                    console.log(currentYear);
                    for(var i= 1960; i <= currentYear; i++){
                        scope.yearsList.push(i.toString());
                    }

                    scope.isFormValid = function () {
                        var isValid = true;
                        if(scope.applicantForm.$invalid){
                            console.log(scope.applicantForm.$error);
                            if(scope.applicantForm.$error.required != null){
                                scope.applicantForm.$error.required.forEach(function(element){
                                    element.$setDirty();
                                });
                            }
                            if(scope.applicantForm.$error.dateGreaterThan != null){
                                scope.applicantForm.$error.dateGreaterThan.forEach(function(element){
                                    element.$setDirty();
                                });
                            }
                            isValid = false;
                        }
                        return isValid;
                    };

                    scope.addEducation = function () {
                        scope.userDetailObj.educationDetails.push({});
                    };

                    scope.removeEducation = function (item) {
                        var index = scope.userDetailObj.educationDetails.indexOf(item);
                        if(index != -1){
                            scope.userDetailObj.educationDetails.splice(index, 1);
                        }
                    };

                    scope.addCompany = function () {
                        scope.userDetailObj.employmentHistoryDetails.push({});
                    };

                    scope.removeCompany = function (item) {
                        console.log(item);
                        console.log(scope.userDetailObj.employmentHistoryDetails);
                        var index = scope.userDetailObj.employmentHistoryDetails.indexOf(item);
                        if(index != -1){
                            scope.userDetailObj.employmentHistoryDetails.splice(index, 1);
                        }
                    };
                    jQuery(document).ready(function($) {
                        $('.datepicker').datepicker();
                        $('.icon-calendar').click(function () {
                            console.log("hehe");
                            $(this).prev().datepicker("show");
                            $('.datepicker-inline').remove();
                        });
                    });
                }
            }
        }
    ]);
})();