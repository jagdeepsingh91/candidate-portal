/*  Example - How to use
*
*   arrListObj = [
*       {name : "option1", value : "optionValue"},
*       {name : "option2", value : "optionValue"},
*       {name : "option3", value : "optionValue"},
*   ]
*   <input single-autocomplete
*         ng-model="searchCandidate"     // selected property object will be saved in this model
*         suggestions-arr="arrListObj"   // above list will be passed
*         object-property="name"         // which property to show in list
*         placeholder="Search"
*         type="search">
*
*     On selection of 2nd property, values of
*     searchCandidate = {name : "option2", value : "optionValue"}
* */


(function () {
    angular.module('candidatePortal.application').directive('singleAutocomplete', [
        'candidatePortal.services.apiMethods',
        '$filter',
        function (apiMethods, $filter) {
            return {
                restrict: 'EA',
                replace : true,
                scope : {
                    suggestionsArr : '=',
                    ngModel : '=',
                    apiUrl : '='
                },
                templateUrl: 'app/directives/autocomplete/single-autocomplete-field/single-autocomplete-tpl.html',
                link : function(scope, element, attr){
                    element.removeAttr("class");
                    scope.objectProperty = attr.objectProperty;
                    var initializeInputValue = function() {
                        if (scope.objectProperty != null && scope.objectProperty != "") {
                            if (scope.ngModel == null || scope.ngModel == "")
                                scope.ngModel = {};

                            scope.inputValue = scope.ngModel[scope.objectProperty];
                        }
                        else {
                            scope.inputValue = scope.ngModel;
                        }
                    };

                    var getSuggestionsList = function () {
                        var url = scope.apiUrl;
                        apiMethods.apiGETReq(url, null, false).then(function (response) {
                            scope.suggestionsArr = response.data.response;
                        }, function (response) {
                            console.log("Unable to fetch list");
                        });
                    };

                    if(scope.suggestionsArr == null || scope.suggestionsArr == ""){
                        if(scope.apiUrl != null && scope.apiUrl != "")
                            getSuggestionsList();
                        else{
                            console.log("Please provide suggestion array list or url");
                        }
                    }

                    initializeInputValue();
                    scope.placeholder = attr.placeholder;
                    scope.name = attr.name;
                    scope.class = attr.class;
                    scope.type = attr.type;
                    scope.required = attr.required || attr.ngRequired;
                    scope.selectedItemIndex = 0;
                    scope.isHover = false;
                    scope.isFocused = false;

                    scope.onMouseEnter = function () {
                        scope.isHover = true
                    };

                    scope.onMouseLeave = function () {
                        scope.isHover = false;
                    };

                    scope.onBlur = function () {
                        scope.isFocused=false;
                        console.log(scope.isHover);
                        console.log(scope.ngModel);
                        if(scope.ngModel != null && scope.ngModel != "" && scope.suggestionsArr != null){
                            var index = scope.suggestionsArr.indexOf(scope.ngModel);
                            if(index == -1 || scope.ngModel[scope.objectProperty] != scope.inputValue){
                                scope.ngModel = {};
                                scope.ngModel[scope.objectProperty] = scope.inputValue;
                            }
                        }
                        else{
                            scope.ngModel = {};
                            scope.ngModel[scope.objectProperty] = scope.inputValue;
                        }
                        console.log(scope.ngModel);
                    };

                    scope.onChange = function () {
                        scope.selectedItemIndex = 0;
                        scope.isFocused=true;
                        if(scope.inputValue == null || scope.inputValue == "")
                        {
                            scope.isHover = false;
                            scope.isFocused = false;
                        }
                    };

                    scope.keyUpParser = function ($event) {
                        //scope.ngModel[scope.objectProperty] = scope.inputValue;
                    };

                    scope.keyDownParser = function ($event) {
                        var keys = {
                            38: 'up',
                            40: 'down',
                            8 : 'backspace',
                            13: 'enter',
                            9 : 'tab',
                            27: 'esc'
                        };
                        var key = keys[$event.keyCode];
                        var filteredSuggestionArr;
                        if(key == 'down'){
                            filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            if(scope.selectedItemIndex < filteredSuggestionArr.length -1)
                                scope.selectedItemIndex++;
                        }
                        else if(key == 'up' && scope.selectedItemIndex > 0){
                            scope.selectedItemIndex--;
                        }
                        else if(key == 'enter'){
                            filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = filteredSuggestionArr == null || filteredSuggestionArr == "" ? [] : filteredSuggestionArr;
                            if(scope.selectedItemIndex < filteredSuggestionArr.length)
                                scope.onSuggestedItemsClick(filteredSuggestionArr[scope.selectedItemIndex]);
                        }
                    };

                    scope.onSuggestedItemsClick = function (selectedValue) {
                        scope.ngModel = selectedValue;
                        initializeInputValue();
                        scope.isHover = false;
                        scope.isFocused = false;
                        console.log(scope.ngModel);
                    };

                    scope.mouseEnterOnItem = function (index) {
                        scope.selectedItemIndex = index;
                    };
                }
            };
        }
    ]);
})();