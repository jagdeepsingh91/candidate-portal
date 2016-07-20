(function () {

    angular.module('candidatePortal.application').directive('createDynamicFields', [
        '$parse',
        function ($parse) {
            return {
                restrict: 'EA',
                templateUrl: 'app/directives/create-dynamic-fields/dynamic-field-templates/dynamic-fields-tpl.html',
                scope : {
                    fieldsObj : '=?',
                    dynamicFieldTypes : '=?',
                    duplicateFieldsArr : '=?'
                },
                link: function(scope, element, attrs, ngModel) {
                    console.log("******************** Dynamic fields directives ******************");

                    scope.dynamicFieldTypes = {
                        text : "TEXT",
                        textarea : "TEXTAREA",
                        number : "NUMBER",
                        checkbox : "CHECKBOX",
                        radio : "RADIO",
                        multiSelect : "MULTI_SELECT",
                        dropDown : "DROPDOWN",
                        dateDropDown : "DATE_DROPDOWN",
                        group : "GROUP",
                        date : "DATE",
                        textAutosuggest : "TEXT_AUTOSUGGEST",
                        tableGroup : "TABLE_GROUP",
                        userDropDown : "USER_DROPDOWN",
                        textDropDown : "TEXT_DROPDOWN",
                        listBox : "LISTBOX",
                        userMultiSelect : "USER_MULTISELECT"
                    };

                    scope.addMoreClick = function (obj, arr, rows) {
                        console.log(rows);
                        console.log(obj);
                        var index = arr.indexOf(obj);
                        var newObj = JSON.parse(JSON.stringify(obj));
                        for(var i=0;i<newObj.length; i++){
                            newObj[i].id = null;
                            delete  newObj[i].$$hashKey;
                            newObj[i].selectedValue = null;
                            newObj[i].selectedObject = [];
                            //newObj.displayName = null;
                        }
                        delete  newObj.$$hashKey;
                        if(index != -1) {
                            arr.splice(index + 1, 0, newObj);
                        }
                    };

                    scope.removeItemClick = function(obj, arr){
                        console.log(obj);
                        var index = arr.indexOf(obj);
                        if(index != -1)
                            arr.splice(index, 1);
                    };


                    scope.callBackAfterUpload = function (item) {
                        return function (response) {
                            var newRow = JSON.parse(JSON.stringify(item.subFields[0]));
                            newRow.forEach(function (obj, i, arr) {
                                if(obj.propertyName == "documentPath"){
                                    obj.apiURL = response.documentPath
                                }
                                else{
                                    obj.selectedValue = response[obj.propertyName];
                                }
                            });
                            item.subFields.push(newRow);
                        }
                    };

                    //var functionVal = "console.log('On change event fired ...', scope.callBackAfterUpload);";
                    //console.log(eval("function (value) {console.log('On change event fired ...', value);};"));
                    //console.log($parse("functionVal"));
                    //scope.onChange = new Function('value', 'scope' , functionVal);
                }
            };
        }
    ]);
})();